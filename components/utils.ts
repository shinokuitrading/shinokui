import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: any[]) {
  const merged = twMerge(clsx(inputs));

  // #region agent log
  fetch("http://127.0.0.1:7242/ingest/1f73b381-c9d3-4390-b059-56ac8fca5f1f", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      sessionId: "debug-session",
      runId: "run1",
      hypothesisId: "H1",
      location: "components/utils.ts:cn",
      message: "cn merge result",
      data: { inputs, merged },
      timestamp: Date.now()
    })
  }).catch(() => {});
  // #endregion

  return merged;
}