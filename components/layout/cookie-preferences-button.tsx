"use client";

export function CookiePreferencesButton() {
  return (
    <button
      type="button"
      className="hover:text-foreground"
      onClick={() => {
        try {
          localStorage.removeItem("nextsite-cookie-consent-v1");
          window.location.reload();
        } catch {
          /* noop */
        }
      }}
    >
      Cookie preferences
    </button>
  );
}
