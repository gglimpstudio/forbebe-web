import type { Metadata } from "next";
import { PortableText, type PortableTextComponents } from "next-sanity";

import { Container } from "@/components/ui/Container";
import { getLegalPage } from "@/lib/sanity/queries";

export const metadata: Metadata = {
  title: "개인정보처리방침",
  alternates: { canonical: "/privacy" },
};

export const revalidate = 300;

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => <h2 className="mt-10 text-xl font-semibold text-green-dark">{children}</h2>,
    h3: ({ children }) => <h3 className="mt-6 text-lg font-semibold text-green-dark">{children}</h3>,
    normal: ({ children }) => <p className="mt-3 leading-7">{children}</p>,
  },
  list: {
    bullet: ({ children }) => <ul className="mt-3 list-disc space-y-1 pl-5 leading-7">{children}</ul>,
    number: ({ children }) => <ol className="mt-3 list-decimal space-y-1 pl-5 leading-7">{children}</ol>,
  },
};

export default async function PrivacyPage() {
  const page = await getLegalPage("privacy");

  return (
    <section className="bg-background-light py-12 sm:py-16 lg:py-20">
      <Container className="max-w-3xl">
        <h1 className="text-3xl font-semibold text-green-dark sm:text-4xl">{page?.title || "개인정보처리방침"}</h1>
        <div className="mt-8 text-[15px] text-text-main [word-break:keep-all]">
          {page?.content?.length ? (
            <PortableText value={page.content} components={components} />
          ) : (
            <p className="leading-7 text-text-sub">
              개인정보처리방침을 준비하고 있습니다. 개인정보 관련 문의는 contact@forbebe.co.kr로 연락해 주세요.
            </p>
          )}
        </div>
      </Container>
    </section>
  );
}
