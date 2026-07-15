import type { UseFormRegisterReturn } from "react-hook-form";

/**
 * Honeypot spam trap. Real users never see or fill this field.
 * Bots that fill every field will populate it, and the zod schema
 * (website: z.string().max(0)) will reject the submission.
 *
 * Uses inline styles + aria-hidden + autocomplete=off + tabIndex=-1
 * so no user of any assistive tech reaches it.
 */
export function Honeypot({
  register,
}: {
  register: UseFormRegisterReturn;
}) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        left: "-9999px",
        top: "auto",
        width: "1px",
        height: "1px",
        overflow: "hidden",
      }}
    >
      <label>
        Do not fill this field
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register}
        />
      </label>
    </div>
  );
}
