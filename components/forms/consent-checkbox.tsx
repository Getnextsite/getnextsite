import Link from "next/link";
import type { UseFormRegisterReturn } from "react-hook-form";

export function ConsentCheckbox({
  register,
  error,
  id = "consent",
}: {
  register: UseFormRegisterReturn;
  error?: string;
  id?: string;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="flex items-start gap-2 text-xs text-muted-foreground"
      >
        <input
          id={id}
          type="checkbox"
          {...register}
          className="mt-0.5 h-4 w-4 rounded border-border"
        />
        <span>
          I agree that GetNextSite Agency may process my details to respond to
          this request, per the{" "}
          <Link href="/privacy-policy" className="text-primary underline">
            Privacy Policy
          </Link>
          . I understand my data is not sold or shared with advertisers.
        </span>
      </label>
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}
