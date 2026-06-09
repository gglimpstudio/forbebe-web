import { revalidatePath, revalidateTag } from "next/cache";

import { sanityCacheTag } from "@/lib/sanity/client";

const paths = [
  "/",
  "/services",
  "/process",
  "/pricing",
  "/branches",
  "/cases",
  "/faq",
  "/franchise",
  "/partnership",
  "/why-forbebe",
];

function getSecret(request: Request) {
  const url = new URL(request.url);
  return url.searchParams.get("secret") || request.headers.get("x-revalidate-secret");
}

export async function POST(request: Request) {
  if (getSecret(request) !== process.env.SANITY_REVALIDATE_SECRET) {
    return Response.json({ message: "Invalid revalidation secret." }, { status: 401 });
  }

  revalidateTag(sanityCacheTag, { expire: 0 });
  paths.forEach((path) => revalidatePath(path));

  return Response.json({ revalidated: true, paths });
}
