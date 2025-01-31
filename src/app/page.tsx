"use client";

import { Button } from "@heroui/react";
import FileInput from "@/components/file-input";
import ProgressIndicator from "@/components/progress-indicator";
import { useFileProcessing } from "@/hooks/useFileProcessing";
import { useRouter } from "next/navigation";
import { MdFileDownload } from "react-icons/md";

export default function Home() {
  const router = useRouter();

  const {
    text,
    isTextExtracting,
    isAlertVisible,
    fileInputRef,
    extractText,
    reset,
  } = useFileProcessing();

  const isTextAvailable = text != null;

  return (
    <main className="flex flex-col gap-5 items-center p-3">
      <div className="flex w-full max-w-xl">
        <FileInput
          onChange={extractText}
          inputRef={fileInputRef}
          isAlertVisible={isAlertVisible}
        />
      </div>

      <div className="flex w-full max-w-xl">
        <ProgressIndicator
          isTextExtracting={isTextExtracting}
          isTextAvailable={isTextAvailable}
        />
      </div>

      <div className="flex w-full max-w-sm">
        <Button
          data-testid="result-button"
          onPress={() => router.push("/result/")}
          isDisabled={
            isTextExtracting ||
            fileInputRef.current?.value == null ||
            fileInputRef.current?.value == ""
          }
          color="primary"
          fullWidth
        >
          <MdFileDownload /> Result
        </Button>
      </div>

      <div className="flex w-full max-w-sm">
        <Button
          onPress={reset}
          color="default"
          isDisabled={
            isTextExtracting ||
            fileInputRef.current?.value == null ||
            fileInputRef.current?.value == ""
          }
          fullWidth
        >
          Reset the PDF files selection
        </Button>
      </div>
    </main>
  );
}
