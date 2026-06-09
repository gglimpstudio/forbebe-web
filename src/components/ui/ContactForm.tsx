"use client";

import { useState } from "react";
import type { FormEvent } from "react";

import { Button } from "@/components/ui/Button";

type Field = {
  name: string;
  label: string;
  type?: "text" | "email" | "tel" | "textarea" | "select";
  required?: boolean;
  options?: string[];
};

const formFields: Record<"franchise" | "partnership", Field[]> = {
  franchise: [
    { name: "name", label: "이름", required: true },
    { name: "phone", label: "연락처", type: "tel", required: true },
    { name: "email", label: "이메일", type: "email", required: true },
    { name: "region", label: "희망 지역", required: true },
    { name: "message", label: "문의 내용", type: "textarea", required: true },
  ],
  partnership: [
    { name: "name", label: "담당자명", required: true },
    { name: "company", label: "회사명 / 기관명", required: true },
    { name: "phone", label: "연락처", type: "tel", required: true },
    { name: "email", label: "이메일", type: "email", required: true },
    { name: "partnershipType", label: "제휴 유형", type: "select", required: true, options: ["기업 복지", "산후조리원", "유아용품 매장", "브랜드 제휴", "기타"] },
    { name: "message", label: "문의 내용", type: "textarea", required: true },
  ],
};

export function ContactForm({ type }: { type: "franchise" | "partnership" }) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...payload, type }),
    });

    const result = (await response.json()) as { message?: string };
    setMessage(result.message || (response.ok ? "문의가 접수되었습니다." : "문의 접수에 실패했습니다."));
    setStatus(response.ok ? "success" : "error");

    if (response.ok) {
      form.reset();
    }
  }

  return (
    <form className="grid gap-4" onSubmit={handleSubmit}>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      {formFields[type].map((field) => (
        <label key={field.name} className="grid gap-2 text-sm font-medium text-brand-primary">
          {field.label}
          {field.type === "textarea" ? (
            <textarea
              name={field.name}
              required={field.required}
              className="min-h-36 rounded-2xl border border-border-soft p-4 text-sm font-normal outline-none focus:border-brand-primary focus:ring-4 focus:ring-brand-secondary"
              placeholder={`${field.label} 입력`}
            />
          ) : field.type === "select" ? (
            <select
              name={field.name}
              required={field.required}
              className="h-12 rounded-2xl border border-border-soft bg-background-light px-4 text-sm font-normal outline-none focus:border-brand-primary focus:ring-4 focus:ring-brand-secondary"
              defaultValue=""
            >
              <option value="" disabled>
                선택
              </option>
              {field.options?.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          ) : (
            <input
              name={field.name}
              type={field.type || "text"}
              required={field.required}
              className="h-12 rounded-2xl border border-border-soft px-4 text-sm font-normal outline-none focus:border-brand-primary focus:ring-4 focus:ring-brand-secondary"
              placeholder={`${field.label} 입력`}
            />
          )}
        </label>
      ))}
      <label className="flex items-start gap-3 rounded-2xl bg-background-main p-4 text-sm leading-6 text-text-sub">
        <input name="privacyAgreed" value="true" type="checkbox" required className="mt-1 h-4 w-4 accent-brand-primary" />
        개인정보 수집 및 이용에 동의합니다.
      </label>
      <Button type="submit" size="lg" disabled={status === "submitting"}>
        {status === "submitting" ? "전송 중" : "문의 보내기"}
      </Button>
      {message ? (
        <p className={status === "success" ? "text-sm font-semibold text-brand-primary" : "text-sm font-semibold text-red-700"} role="status">
          {message}
        </p>
      ) : null}
    </form>
  );
}
