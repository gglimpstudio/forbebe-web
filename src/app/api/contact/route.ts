type ContactType = "franchise" | "partnership";

type ContactPayload = {
  type?: ContactType;
  name?: string;
  company?: string;
  phone?: string;
  email?: string;
  region?: string;
  partnershipType?: string;
  message?: string;
  privacyAgreed?: boolean | string;
  website?: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function text(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function validate(payload: ContactPayload) {
  if (text(payload.website)) return null;
  if (payload.type !== "franchise" && payload.type !== "partnership") return "문의 유형이 올바르지 않습니다.";
  if (!text(payload.name)) return payload.type === "franchise" ? "이름을 입력해주세요." : "담당자명을 입력해주세요.";
  if (payload.type === "partnership" && !text(payload.company)) return "회사명 / 기관명을 입력해주세요.";
  if (!text(payload.phone)) return "연락처를 입력해주세요.";
  if (!emailPattern.test(text(payload.email))) return "이메일 형식이 올바르지 않습니다.";
  if (payload.type === "franchise" && !text(payload.region)) return "희망 지역을 입력해주세요.";
  if (payload.type === "partnership" && !text(payload.partnershipType)) return "제휴 유형을 선택해주세요.";
  if (!text(payload.message)) return "문의 내용을 입력해주세요.";
  if (payload.privacyAgreed !== true && payload.privacyAgreed !== "true") return "개인정보 수집 및 이용에 동의해주세요.";
  return null;
}

function buildEmail(payload: ContactPayload) {
  const subjectPrefix = payload.type === "franchise" ? "창업문의" : "제휴문의";
  const lines = [
    `문의 유형: ${subjectPrefix}`,
    `이름/담당자명: ${text(payload.name)}`,
    payload.company ? `회사명/기관명: ${text(payload.company)}` : "",
    `연락처: ${text(payload.phone)}`,
    `이메일: ${text(payload.email)}`,
    payload.region ? `희망 지역: ${text(payload.region)}` : "",
    payload.partnershipType ? `제휴 유형: ${text(payload.partnershipType)}` : "",
    "",
    "문의 내용:",
    text(payload.message),
  ].filter(Boolean);

  return {
    subject: `[포베베] ${subjectPrefix}가 접수되었습니다`,
    text: lines.join("\n"),
  };
}

async function sendEmail(payload: ContactPayload) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL || "Forbebe <onboarding@resend.dev>";

  if (!apiKey || !to) {
    throw new Error("CONTACT_TO_EMAIL 또는 RESEND_API_KEY 환경변수가 설정되지 않았습니다.");
  }

  const email = buildEmail(payload);
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to,
      subject: email.subject,
      text: email.text,
      reply_to: text(payload.email),
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`메일 발송에 실패했습니다. ${detail}`);
  }
}

export async function POST(request: Request) {
  let payload: ContactPayload;

  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return Response.json({ message: "요청 형식이 올바르지 않습니다." }, { status: 400 });
  }

  const error = validate(payload);
  if (error) {
    return Response.json({ message: error }, { status: 400 });
  }

  if (text(payload.website)) {
    return Response.json({ message: "문의가 접수되었습니다." });
  }

  try {
    await sendEmail(payload);
    return Response.json({ message: "문의가 접수되었습니다. 확인 후 연락드리겠습니다." });
  } catch (sendError) {
    const message = sendError instanceof Error ? sendError.message : "문의 접수 중 오류가 발생했습니다.";
    return Response.json({ message }, { status: 500 });
  }
}
