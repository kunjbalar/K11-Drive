"use client";

import { useState, useTransition } from "react";
import { Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/loading-spinner";
import { deleteFile } from "@/server/action";

export function DeleteFileButton(props: { fileId: number }) {
  const navigation = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [, startTransition] = useTransition();

  async function handleDelete() {
    setIsDeleting(true);

    try {
      const result = await deleteFile(props.fileId);

      if (result?.success) {
        startTransition(() => {
          navigation.refresh();
        });
      }
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <Button
      variant="ghost"
      onClick={() => void handleDelete()}
      disabled={isDeleting}
      aria-label={isDeleting ? "Deleting file" : "Delete file"}
      className="min-w-[7rem] justify-center text-gray-300 hover:text-white"
    >
      {isDeleting ? <LoadingSpinner className="size-4" /> : <Trash2Icon size={18} />}
      <span>{isDeleting ? "Deleting..." : "Delete"}</span>
    </Button>
  );
}
