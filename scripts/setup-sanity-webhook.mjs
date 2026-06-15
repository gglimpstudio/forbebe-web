import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");

loadEnvFile(path.join(rootDir, ".env.local"));
loadEnvFile(path.join(rootDir, ".env"));

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-05-18";
const token = process.env.SANITY_API_WRITE_TOKEN;
const siteUrl = normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL || process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL);
const revalidateSecret = process.env.SANITY_REVALIDATE_SECRET;

if (!projectId || !token || !siteUrl || !revalidateSecret) {
  console.error("Missing required environment variables.");
  console.error("Required: NEXT_PUBLIC_SANITY_PROJECT_ID, SANITY_API_WRITE_TOKEN, NEXT_PUBLIC_SITE_URL, SANITY_REVALIDATE_SECRET.");
  process.exit(1);
}

const webhookName = "Forbebe Next.js revalidate";
const webhookUrl = `${siteUrl}/api/revalidate`;
const apiBaseUrl = `https://${projectId}.api.sanity.io/${apiVersion}`;
const managedDocumentTypes = [
  "siteSettings",
  "homePage",
  "servicesPage",
  "processPage",
  "pricingPage",
  "casesPage",
  "faqPage",
  "whyForbebePage",
  "franchisePage",
  "partnershipPage",
  "service",
  "processStep",
  "pricingItem",
  "branch",
  "beforeAfterCase",
  "cleaningCase",
  "testimonial",
  "faq",
  "navigation",
  "legalPage",
];

const webhookPayload = {
  type: "document",
  name: webhookName,
  url: webhookUrl,
  dataset,
  description: "Revalidates the Forbebe Next.js site when Sanity content is published.",
  rule: {
    on: ["create", "update", "delete"],
    filter: `_type in [${managedDocumentTypes.map((type) => JSON.stringify(type)).join(", ")}]`,
    projection: "{_id, _type}",
  },
  apiVersion,
  httpMethod: "POST",
  includeDrafts: false,
  includeAllVersions: false,
  headers: {
    "x-revalidate-secret": revalidateSecret,
  },
  isDisabledByUser: false,
};

await setupWebhook();

async function setupWebhook() {
  const hooksResponse = await sanityRequest(`/hooks/projects/${projectId}`);
  const hooks = Array.isArray(hooksResponse) ? hooksResponse : hooksResponse.items || [];
  const existingHook = hooks.find((hook) => hook.name === webhookName);

  if (existingHook) {
    await sanityRequest(`/hooks/projects/${projectId}/${existingHook.id}`, {
      method: "DELETE",
    });
    console.log(`Deleted existing webhook: ${existingHook.id}`);
  }

  const createdHook = await sanityRequest(`/hooks/projects/${projectId}`, {
    method: "POST",
    body: JSON.stringify(webhookPayload),
  });

  console.log(`Created webhook: ${createdHook.id}`);
  console.log(`URL: ${webhookUrl}`);
  console.log(`Dataset: ${dataset}`);
}

async function sanityRequest(pathname, init = {}) {
  const response = await fetch(`${apiBaseUrl}${pathname}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...(init.headers || {}),
    },
  });

  const text = await response.text();
  const body = text ? JSON.parse(text) : null;

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}: ${text}`);
  }

  return body;
}

function normalizeSiteUrl(value) {
  if (!value) return "";
  const url = value.startsWith("http") ? value : `https://${value}`;
  return url.replace(/\/$/, "");
}

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return;

  const lines = fs.readFileSync(filePath, "utf8").split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const index = trimmed.indexOf("=");
    if (index === -1) continue;

    const key = trimmed.slice(0, index).trim();
    const value = trimmed.slice(index + 1).trim().replace(/^["']|["']$/g, "");
    if (!process.env[key]) process.env[key] = value;
  }
}
