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
    <div className="flex items-center justify-center m-5">
      <main className="flex flex-col gap-5 items-center max-w-lg">
        <FileInput
          onChange={extractText}
          inputRef={fileInputRef}
          isAlertVisible={isAlertVisible}
        />

        <ProgressIndicator
          isTextExtracting={isTextExtracting}
          isTextAvailable={isTextAvailable}
        />

        <Button
          onPress={() => router.push("/result/")}
          isDisabled={
            isTextExtracting ||
            fileInputRef.current?.value == null ||
            fileInputRef.current?.value == ""
          }
          color="primary"
        >
          <MdFileDownload /> Result
        </Button>

        <Button
          onPress={reset}
          color="default"
          size="sm"
          isDisabled={
            isTextExtracting ||
            fileInputRef.current?.value == null ||
            fileInputRef.current?.value == ""
          }
        >
          Reset the PDF files selection
        </Button>
      </main>
    </div>
  );
}
