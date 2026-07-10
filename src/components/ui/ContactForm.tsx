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
    { name: "managerName", label: "담당자명", required: true },
    { name: "company", label: "회사명 / 기관명", required: true },
    { name: "phone", label: "연락처", type: "tel", required: true },
    { name: "email", label: "이메일", type: "email", required: true },
    { name: "partnershipType", label: "제휴 유형", type: "select", required: true, options: ["마케팅 제휴", "서비스 제휴", "입점 / 판매 제휴", "기업 / 기관 제휴", "기타"] },
    { name: "message", label: "문의 내용", type: "textarea", required: true },
  ],
};

const scriptUrl = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;

function getFormValue(formData: FormData, name: string) {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim() : "";
}

export function ContactForm({ type }: { type: "franchise" | "partnership" }) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    if (getFormValue(formData, "company_url")) {
      setStatus("success");
      setMessage("문의가 정상적으로 접수되었습니다.");
      form.reset();
      return;
    }

    if (getFormValue(formData, "privacy") !== "true") {
      setStatus("error");
      setMessage("개인정보 수집 및 이용에 동의해주세요.");
      return;
    }

    if (!scriptUrl) {
      setStatus("error");
      setMessage("문의 접수 URL이 설정되지 않았습니다.");
      return;
    }

    const params = new URLSearchParams();
    params.set("type", type);
    params.set("privacy", "true");

    for (const field of formFields[type]) {
      params.set(field.name, getFormValue(formData, field.name));
    }

    try {
      const response = await fetch(scriptUrl, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
        body: params,
      });

      if (!response.ok) {
        const detail = await response.text();
        throw new Error(detail || "문의 접수에 실패했습니다.");
      }

      setStatus("success");
      setMessage("문의가 정상적으로 접수되었습니다.");
      form.reset();
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "문의 접수에 실패했습니다.");
    }
  }

  return (
    <form className="grid gap-4" onSubmit={handleSubmit}>
      <input type="text" name="company_url" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
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
        <input name="privacy" value="true" type="checkbox" required className="mt-1 h-4 w-4 accent-brand-primary" />
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
