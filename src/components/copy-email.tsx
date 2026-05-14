"use client";

import { toast } from "sonner";

interface Props {
  email: string;
}

export function CopyEmail({ email }: Props) {
  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText(email);
      toast("Email copied", {
        description: "looking forward to hearing from you!",
      });
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="text-foreground underline decoration-foreground/30 underline-offset-4 hover:decoration-foreground/60 transition-colors cursor-pointer bg-transparent p-0 border-0"
    >
      {email}
    </button>
  );
}
