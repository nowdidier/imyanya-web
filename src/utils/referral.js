// Referral + Share-to-Unlock engine (frontend-only, no money).
// Goal: turn every visitor into a promoter — share Imyanya to redeem
// locked career features. All state lives in localStorage so it works
// without backend changes and never blocks SEO.

const CODE_KEY = "imyanya_ref_code";
const COUNT_KEY = "imyanya_share_count";
const LOG_KEY = "imyanya_share_log";
const REFERRED_BY_KEY = "imyanya_referred_by";
const DISMISS_SIGNUP_KEY = "imyanya_signup_nudge_dismissed_at";

export const UNLOCK_TIERS = [
  {
    count: 1,
    id: "job-alerts",
    label: "Instant Job Alerts",
    description: "Get new Kigali & Rwanda jobs first, before deadlines pass.",
    icon: "🔔",
  },
  {
    count: 3,
    id: "salary-insights",
    label: "Salary Insights",
    description: "Unlock pay ranges & negotiation tips for Rwanda roles.",
    icon: "💰",
  },
  {
    count: 5,
    id: "cv-spotlight",
    label: "CV Spotlight + Premium Templates",
    description: "Stand out to employers with a spotlight badge & pro CVs.",
    icon: "🌟",
  },
];

const safeGet = (key, fallback = null) => {
  try {
    const raw = localStorage.getItem(key);
    return raw === null ? fallback : raw;
  } catch (e) {
    return fallback;
  }
};

const safeSet = (key, value) => {
  try {
    localStorage.setItem(key, value);
  } catch (e) {
    // storage unavailable — ignore
  }
};

const randomCode = () => {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let out = "";
  const arr = new Uint32Array(6);
  try {
    window.crypto.getRandomValues(arr);
    for (let i = 0; i < 6; i += 1) out += chars[arr[i] % chars.length];
  } catch (e) {
    for (let i = 0; i < 6; i += 1)
      out += chars[Math.floor(Math.random() * chars.length)];
  }
  return `IMY-${out}`;
};

export const getOrCreateReferralCode = () => {
  let code = safeGet(CODE_KEY, "");
  if (!code) {
    code = randomCode();
    safeSet(CODE_KEY, code);
  }
  return code;
};

export const getShareCount = () => {
  const raw = safeGet(COUNT_KEY, "0");
  const n = parseInt(raw, 10);
  return Number.isFinite(n) && n >= 0 ? n : 0;
};

export const getUnlockedTiers = (count = getShareCount()) =>
  UNLOCK_TIERS.filter((t) => count >= t.count);

export const getNextTier = (count = getShareCount()) =>
  UNLOCK_TIERS.find((t) => count < t.count) || null;

export const getProgressToNext = (count = getShareCount()) => {
  const next = getNextTier(count);
  if (!next) return { percent: 100, remaining: 0, next: null };
  const prevThreshold =
    [...UNLOCK_TIERS].reverse().find((t) => t.count <= count)?.count || 0;
  const span = next.count - prevThreshold || next.count;
  const done = count - prevThreshold;
  return {
    percent: Math.min(100, Math.round((done / span) * 100)),
    remaining: next.count - count,
    next,
  };
};

export const recordShare = (channel = "copy") => {
  const count = getShareCount() + 1;
  safeSet(COUNT_KEY, String(count));
  try {
    const raw = safeGet(LOG_KEY, "[]");
    const log = JSON.parse(raw || "[]");
    log.push({ channel, at: new Date().toISOString() });
    safeSet(LOG_KEY, JSON.stringify(log.slice(-50)));
  } catch (e) {
    // ignore
  }
  const unlocked = getUnlockedTiers(count);
  const justUnlocked = UNLOCK_TIERS.some((t) => t.count === count);
  return { count, unlocked, justUnlocked };
};

export const buildReferralUrl = (baseUrl) => {
  const code = getOrCreateReferralCode();
  try {
    const url = new URL(
      baseUrl || (typeof window !== "undefined" ? window.location.href : "https://imyanya.rw/")
    );
    // Keep canonical clean for Google: referral lives only in the shared URL,
    // canonical tags elsewhere ignore query strings.
    url.searchParams.set("ref", code);
    url.searchParams.set("utm_source", "share");
    url.searchParams.set("utm_medium", "referral");
    return url.toString();
  } catch (e) {
    const sep = (baseUrl || "").includes("?") ? "&" : "?";
    return `${baseUrl || "https://imyanya.rw/"}${sep}ref=${encodeURIComponent(code)}`;
  }
};

export const buildShareText = (pageTitle = "") => {
  const title = (pageTitle || "Jobs in Rwanda").trim();
  return `I found ${title} on Imyanya — Rwanda's #1 job portal 🇷🇼. Free CV builder, daily Kigali vacancies & NGO jobs. Join free with my link 👇`;
};

// Capture inbound ?ref= visitors once, so we can greet them and nudge signup.
// Runs on app boot; harmless if no param present.
export const captureInboundReferral = () => {
  try {
    if (typeof window === "undefined") return null;
    const params = new URLSearchParams(window.location.search);
    const ref = (params.get("ref") || "").trim().toUpperCase();
    if (!ref) return safeGet(REFERRED_BY_KEY, null);
    const mine = safeGet(CODE_KEY, "");
    // Don't credit self-shares.
    if (ref && ref !== mine) safeSet(REFERRED_BY_KEY, ref);
    return ref || null;
  } catch (e) {
    return null;
  }
};

export const getReferredBy = () => safeGet(REFERRED_BY_KEY, null);

export const shouldShowSignupNudge = () => {
  try {
    const raw = safeGet(DISMISS_SIGNUP_KEY, "");
    if (!raw) return true;
    // Re-show after 7 days so it stays persuasive, not annoying.
    return Date.now() - Number(raw) > 7 * 24 * 60 * 60 * 1000;
  } catch (e) {
    return true;
  }
};

export const dismissSignupNudge = () => safeSet(DISMISS_SIGNUP_KEY, String(Date.now()));
