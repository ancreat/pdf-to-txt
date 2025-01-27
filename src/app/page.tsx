"use client";
import { Button, Snippet } from "@heroui/react";
import FileInput from "@/components/file-input";
import ProgressIndicator from "@/components/progress-indicator";
import ButtonForFullTextModal from "@/components/button-for-full-text-modal";
import { useFileProcessing } from "@/hooks/useFileProcessing";

export default function Home() {
  const {
    text,
    textFileName,
    isTextExtracting,
    isAlertVisible,
    fileInputRef,
    extractText,
    downloadText,
    reset,
  } = useFileProcessing();

  const isTextAvailable = text != null;

  return (
    <div className="grid items-center justify-items-center m-5">
      <main className="flex flex-col gap-5 row-start-2 items-center max-w-lg">
        <FileInput
          onChange={extractText}
          inputRef={fileInputRef}
          isAlertVisible={isAlertVisible}
        />

        <ProgressIndicator
          isTextExtracting={isTextExtracting}
          isTextAvailable={isTextAvailable}
        />

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <Snippet
            hideSymbol
            codeString={text ?? ""}
            disableCopy={!isTextAvailable}
            variant="bordered"
            size="md"
          >
            Copy the text
          </Snippet>
          <Button
            onPress={downloadText}
            isDisabled={!isTextAvailable}
            variant="bordered"
            size="lg"
          >
            Download the text
          </Button>
        </div>

        <ButtonForFullTextModal
          text={text ?? ""}
          textFileName={textFileName ?? ""}
          isTextAvailable={isTextAvailable}
        />

        <Button
          onPress={reset}
          variant="bordered"
          size="sm"
          isDisabled={isTextExtracting || fileInputRef.current?.value === ""}
        >
          Choose the next pdf
        </Button>
      </main>
    </div>
  );
}
