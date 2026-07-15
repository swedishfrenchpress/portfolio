"use client";

import { toast } from "sonner";

interface Props {
  email: string;
}

export function CopyEmail({ email }: Props) {
  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText(email);
      toast("Copied. Now send me something good.");
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="link border-0 bg-transparent p-0"
    >
      {email}
    </button>
  );
}
