"use client";

import { createContext, useContext } from "react";
import { mediaFromMap } from "../lib/media-key";

const MediaContext = createContext<Record<string, string>>({});

export default function MediaProvider({
  urls,
  children,
}: {
  urls: Record<string, string>;
  children: React.ReactNode;
}) {
  return <MediaContext.Provider value={urls}>{children}</MediaContext.Provider>;
}

/** Résout un chemin `/images/...` vers l'URL signée déjà calculée côté serveur. */
export function useMediaSrc() {
  const urls = useContext(MediaContext);
  return (path: string) => mediaFromMap(urls, path);
}
