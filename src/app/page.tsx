"use client";

import { Button } from "@heroui/react";
import FileInput from "@/components/file-input";
import ProgressIndicator from "@/components/progress-indicator";
import { useFileProcessing } from "@/hooks/useFileProcessing";
import { useRouter } from "next/navigation";
import { MdFileDownload } from "react-icons/md";

export default function Home() {
  const router = useRouter();

  const { fileNames, isTextExtracting, isAlertVisible, extractText, reset } =
    useFileProcessing();

  return (
    <main className="flex flex-col gap-5 p-3 items-center w-full max-w-xl mx-auto">
      <FileInput
        extractText={extractText}
        isAlertVisible={isAlertVisible}
        progressIndicator={
          <ProgressIndicator
            isTextExtracting={isTextExtracting}
            isAnyFileProcessed={fileNames.length != 0}
          />
        }
        selectedFileLabel=<>
          {fileNames.length == 0
            ? "Please select PDF files"
            : "Selected " + fileNames.join(", ")}
        </>
      />

      <div className="flex w-full max-w-sm">
        <Button
          data-testid="result-button"
          onPress={() => router.push("/result/")}
          isDisabled={isTextExtracting || fileNames.length == 0}
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
          isDisabled={isTextExtracting || fileNames.length == 0}
          fullWidth
        >
          Reset
        </Button>
      </div>
    </main>
  );
}
