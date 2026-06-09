"use client";

import { useEffect, useState } from "react";

import { Container } from "@/components/ui/Container";

const slogans = [
  "아이 피부에 닿는 모든 순간을 더 안심하게",
  "겉면보다 깊은 틈새까지 확인하는 세탁",
  "카시트와 유모차 구조를 이해하는 전문 케어",
];

export function RotatingSloganSection() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % slogans.length);
    }, 2800);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="bg-brand-primary py-12 text-text-inverse sm:py-16">
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-semibold text-brand-secondary">Forbebe Care Standard</p>
          <p className="cms-lines fluid-section-title mt-4 min-h-[7rem] font-semibold leading-tight sm:min-h-[6rem]">
            {slogans[index]}
          </p>
        </div>
      </Container>
    </section>
  );
}
