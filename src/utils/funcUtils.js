import toSlug from "./customData";
import { APP_NAME } from "../configs/constants";

const downloadPdf = async (url, fileName) => {
  const fileDownloadName = `${APP_NAME}_CV-${toSlug(fileName || "mytitle")}`;
  const response = await fetch(url);
  const blob = await response.blob();
  const urlBlob = window.URL.createObjectURL(new Blob([blob]));
  const link = document.createElement('a');
  link.href = urlBlob;
  link.setAttribute('download', `${fileDownloadName}.pdf`);
  document.body.appendChild(link);
  link.click();
  link.parentNode.removeChild(link);
};

export const formatRoute = (route, value, paramKey = ":slug") => {
  const regex = new RegExp(`${paramKey}`, "g");
  return route.replace(regex, value);
};

export const getSafeRedirectPath = (value, fallback = "/") => {
  const raw = typeof value === "string" ? value.trim() : "";

  if (!raw || !raw.startsWith("/") || raw.startsWith("//")) return fallback;
  if (raw.includes("\\") || /[\s<>"`]/.test(raw)) return fallback;

  return raw;
};

export const getRedirectParam = (redirectPath) => {
  const safePath = getSafeRedirectPath(redirectPath, "");

  return safePath ? `?redirect=${encodeURIComponent(safePath)}` : "";
};

export const normalizeExternalUrl = (url) => {
  const raw = typeof url === "string" ? url.trim() : "";
  if (!raw) return null;

  const withProtocol = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;

  try {
    const parsed = new URL(withProtocol);
    return /^https?:$/.test(parsed.protocol) ? parsed.href : null;
  } catch (error) {
    return null;
  }
};

export const buildJobApplicationMessage = ({
  jobTitle,
  jobUrl,
  fullName,
  email,
  phone,
  resumeTitle,
} = {}) => {
  const lines = [
    `Hello, I would like to apply for the position: ${
      jobTitle || 'this job'
    }.`,
    '',
  ];

  if (fullName) lines.push(`Full name: ${fullName}`);
  if (email) lines.push(`Email: ${email}`);
  if (phone) lines.push(`Phone: ${phone}`);
  if (resumeTitle) lines.push(`Resume: ${resumeTitle}`);
  if (jobUrl) lines.push(`Job posting: ${jobUrl}`);

  return lines.join('\n');
};

export const normalizePhoneForWhatsApp = (phone) => {
  const digits = String(phone || '').replace(/\D/g, '');
  if (!digits) return '';

  if (digits.startsWith('250')) return digits;
  // Local Rwandan numbers: 0781234567 or 781234567
  if (digits.startsWith('0') && digits.length === 10) return `250${digits.slice(1)}`;
  if (digits.length === 9) return `250${digits}`;

  return digits;
};

export const buildWhatsAppUrl = (phone, message) => {
  const recipient = normalizePhoneForWhatsApp(phone);
  if (!recipient) return '';

  const text = typeof message === 'string' ? message.trim() : '';

  return `https://wa.me/${recipient}${
    text ? `?text=${encodeURIComponent(text)}` : ''
  }`;
};

export const buildMailtoUrl = (email, subject, body) => {
  const raw = typeof email === 'string' ? email.trim() : '';
  if (!raw || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(raw)) return '';

  const params = [];
  if (subject) params.push(`subject=${encodeURIComponent(subject)}`);
  if (body) params.push(`body=${encodeURIComponent(body)}`);

  return `mailto:${raw}${params.length ? `?${params.join('&')}` : ''}`;
};

export const buildURL = (hostname) => {
  const normalizedHost = String(hostname || "")
    .trim()
    .replace(/^https?:\/\//i, "")
    .replace(/\/.*$/, "");
  const protocol = window.location.protocol; 
  const port =
    window.location.port && !normalizedHost.includes(":")
      ? `:${window.location.port}`
      : "";

  return `${protocol}//${normalizedHost}${port}`;
};

export default downloadPdf;
