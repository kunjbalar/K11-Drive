"use client";

import type { ComponentProps } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/loading-spinner";

type PendingSubmitButtonProps = Omit<ComponentProps<typeof Button>, "children"> & {
  idleText: string;
  pendingText: string;
};

export function PendingSubmitButton({
  idleText,
  pendingText,
  ...props
}: PendingSubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button {...props} disabled={pending || props.disabled}>
      {pending ? <LoadingSpinner className="size-4" /> : null}
      {pending ? pendingText : idleText}
    </Button>
  );
}
