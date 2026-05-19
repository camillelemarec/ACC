/** Préfixe pour GitHub Pages (ex. /ACC). Vide en local et sur Vercel. */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Chemin public (images, vidéos) compatible GitHub Pages. */
export function asset(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${basePath}${normalized}`;
}
