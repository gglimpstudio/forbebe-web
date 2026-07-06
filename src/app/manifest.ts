import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "포베베",
    short_name: "포베베",
    description: "카시트와 유모차를 전문적으로 세탁·살균 케어하는 유아용품 세탁 브랜드",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#155C4C",
    theme_color: "#155C4C",
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
