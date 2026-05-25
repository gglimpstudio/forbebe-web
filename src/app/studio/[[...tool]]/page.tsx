import type { Metadata } from "next";

import { Studio } from "@/components/layout/Studio";

export const metadata: Metadata = {
  title: "Sanity Studio",
  robots: { index: false, follow: false },
};

export default function StudioPage() {
  return <Studio />;
}
