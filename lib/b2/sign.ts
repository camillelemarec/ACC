import "server-only";
import { cache } from "react";
import keys from "../../data/b2-keys.json";
import { mediaLookupKey } from "../media-key";
import { USED_MEDIA_PATHS } from "./paths";

type StorageApi = {
  apiUrl: string;
  downloadUrl: string;
  bucketId: string | null;
};

type AuthState = {
  downloadUrl: string;
  bucketName: string;
  downloadAuthToken: string;
  downloadAuthExpiresAt: number;
};

const keyByNfc = new Map<string, string>(
  (keys as string[]).map((key) => [key.normalize("NFC"), key])
);

let state: AuthState | null = null;
let pending: Promise<AuthState> | null = null;

function requiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Variable d'environnement manquante : ${name}`);
  }
  return value;
}

function objectKeyForPath(localPath: string): string {
  const filename = mediaLookupKey(localPath);
  const exact = keyByNfc.get(filename) ?? filename;
  const prefix = (process.env.B2_KEY_PREFIX ?? "").replace(/^\/+|\/+$/g, "");
  if (!prefix || exact.startsWith(`${prefix}/`)) return exact;
  return `${prefix}/${exact}`;
}

function encodeObjectKey(key: string): string {
  return key.split("/").map((part) => encodeURIComponent(part)).join("/");
}

async function createAuth(): Promise<AuthState> {
  const keyId = requiredEnv("B2_KEY_ID");
  const applicationKey = requiredEnv("B2_APPLICATION_KEY");
  const bucketName = requiredEnv("B2_BUCKET");
  const ttl = Number(process.env.B2_SIGNED_URL_TTL_SECONDS || 3600);
  const basic = Buffer.from(`${keyId}:${applicationKey}`).toString("base64");

  const authResponse = await fetch("https://api.backblazeb2.com/b2api/v3/b2_authorize_account", {
    cache: "no-store",
    headers: { Authorization: `Basic ${basic}` },
  });
  if (!authResponse.ok) {
    throw new Error("Autorisation Backblaze refusée");
  }

  const auth = (await authResponse.json()) as {
    accountId: string;
    authorizationToken: string;
    apiInfo: { storageApi: StorageApi };
  };
  const storage = auth.apiInfo.storageApi;
  let bucketId = storage.bucketId;

  if (!bucketId) {
    const listResponse = await fetch(`${storage.apiUrl}/b2api/v3/b2_list_buckets`, {
      method: "POST",
      cache: "no-store",
      headers: {
        Authorization: auth.authorizationToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ accountId: auth.accountId, bucketName }),
    });
    if (!listResponse.ok) {
      throw new Error("Bucket Backblaze introuvable");
    }
    const list = (await listResponse.json()) as {
      buckets?: { bucketName: string; bucketId: string }[];
    };
    bucketId = list.buckets?.find((bucket) => bucket.bucketName === bucketName)?.bucketId ?? null;
  }

  if (!bucketId) {
    throw new Error("Bucket Backblaze introuvable");
  }

  const prefix = (process.env.B2_KEY_PREFIX ?? "").replace(/^\/+|\/+$/g, "");
  const downloadResponse = await fetch(`${storage.apiUrl}/b2api/v3/b2_get_download_authorization`, {
    method: "POST",
    cache: "no-store",
    headers: {
      Authorization: auth.authorizationToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      bucketId,
      fileNamePrefix: prefix,
      validDurationInSeconds: ttl,
    }),
  });
  if (!downloadResponse.ok) {
    throw new Error("Autorisation de téléchargement Backblaze refusée");
  }

  const download = (await downloadResponse.json()) as { authorizationToken: string };
  return {
    downloadUrl: storage.downloadUrl,
    bucketName,
    downloadAuthToken: download.authorizationToken,
    downloadAuthExpiresAt: Date.now() + ttl * 1000,
  };
}

function authorize(): Promise<AuthState> {
  if (state && state.downloadAuthExpiresAt > Date.now() + 60_000) {
    return Promise.resolve(state);
  }
  if (!pending) {
    pending = createAuth()
      .then((next) => {
        state = next;
        return next;
      })
      .finally(() => {
        pending = null;
      });
  }
  return pending;
}

export async function signedUrlForPath(localPath: string): Promise<string> {
  const session = await authorize();
  const key = encodeObjectKey(objectKeyForPath(localPath));
  const token = encodeURIComponent(session.downloadAuthToken);
  return `${session.downloadUrl}/file/${encodeURIComponent(session.bucketName)}/${key}?Authorization=${token}`;
}

export const getSignedMediaMap = cache(async (): Promise<Record<string, string>> => {
  const entries = await Promise.all(
    USED_MEDIA_PATHS.map(async (path) => [mediaLookupKey(path), await signedUrlForPath(path)] as const)
  );
  return Object.fromEntries(entries);
});
