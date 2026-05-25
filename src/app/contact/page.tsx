import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";

import { FinalCtaSection } from "@/components/sections/FinalCTASection";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getBranches, getSiteSettings } from "@/lib/sanity/queries";

export const metadata: Metadata = {
  title: "예약 문의",
  description: "포베베 예약 문의, 가까운 지점 찾기, 카카오톡 상담, 전화 상담, 예약 전 준비사항을 안내합니다.",
};

export const revalidate = 300;

export default async function ContactPage() {
  const [settings, branches] = await Promise.all([getSiteSettings(), getBranches()]);

  return (
    <>
      <section className="bg-background-main py-14 sm:py-20">
        <Container>
          <SectionHeader eyebrow="Contact" title="예약 문의하기" description="제품 사진과 모델명, 오염 부위를 함께 알려주시면 가까운 지점에서 더 정확하게 안내드립니다." />
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            {settings.kakaoUrl ? <Button href={settings.kakaoUrl} size="lg">카카오톡 상담하기</Button> : null}
            {settings.phone ? <Button href={`tel:${settings.phone}`} variant="outline" size="lg">전화 상담하기</Button> : null}
            {settings.blogUrl ? <Button href={settings.blogUrl} variant="secondary" size="lg">네이버 블로그</Button> : null}
          </div>
        </Container>
      </section>
      <section className="bg-background-light py-12 sm:py-16">
        <Container>
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <Card>
              <h2 className="text-2xl font-bold text-brand-primary">예약 전 준비사항</h2>
              <ul className="mt-5 space-y-4 text-sm leading-7 text-text-sub">
                {["제품 브랜드와 모델명", "오염 부위 사진", "희망 지점과 일정", "방문 또는 픽업 상담 필요 여부"].map((item) => (
                  <li key={item} className="flex gap-3">
                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-brand-primary" /> {item}
                  </li>
                ))}
              </ul>
            </Card>
            <Card>
              <h2 className="text-2xl font-bold text-brand-primary">문의 폼</h2>
              <p className="mt-2 text-sm text-text-sub">현재는 전송 기능 없는 UI입니다. 추후 Formspree, Google Forms, Kakao Channel로 연결할 수 있습니다.</p>
              <form className="mt-6 grid gap-4">
                {["이름", "연락처", "품목", "희망 지점"].map((label) => (
                  <label key={label} className="grid gap-2 text-sm font-bold text-brand-primary">
                    {label}
                    <input className="h-12 rounded-2xl border border-border-soft px-4 text-sm font-normal outline-none focus:border-brand-primary focus:ring-4 focus:ring-brand-secondary" placeholder={`${label} 입력`} />
                  </label>
                ))}
                <label className="grid gap-2 text-sm font-bold text-brand-primary">
                  문의 내용
                  <textarea className="min-h-32 rounded-2xl border border-border-soft p-4 text-sm font-normal outline-none focus:border-brand-primary focus:ring-4 focus:ring-brand-secondary" placeholder="제품 상태와 오염 부위를 입력해주세요." />
                </label>
                <Button disabled>전송 기능 준비 중</Button>
              </form>
            </Card>
          </div>
          <div className="mt-8 rounded-[22px] bg-background-main p-6">
            <h2 className="text-xl font-bold text-brand-primary">가까운 지점</h2>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {branches.slice(0, 4).map((branch) => (
                <div key={branch.name} className="rounded-2xl bg-background-light p-4 text-sm text-text-sub">
                  <p className="font-bold text-brand-primary">{branch.name}</p>
                  <p className="mt-1">{branch.serviceArea}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>
      <FinalCtaSection />
    </>
  );
}
