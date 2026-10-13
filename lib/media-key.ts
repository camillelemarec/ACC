/** Nom de fichier normalisé, utilisé comme clé du mapping signé. */
export function mediaLookupKey(path: string): string {
  const withoutQuery = path.split("?")[0]?.split("#")[0] ?? path;
  const base = withoutQuery.split("/").filter(Boolean).pop() ?? withoutQuery;
  try {
    return decodeURIComponent(base).normalize("NFC");
  } catch {
    return base.normalize("NFC");
  }
}

export function mediaFromMap(urls: Record<string, string>, path: string): string {
  const url = urls[mediaLookupKey(path)];
  if (!url) {
    throw new Error(`Média Backblaze introuvable pour ${path}`);
  }
  return url;
}
