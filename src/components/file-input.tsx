"use client";

import { Alert, Input } from "@heroui/react";
import { RefObject } from "react";

interface FileInputProps {
  onChange: (event: React.FormEvent<HTMLInputElement>) => void;
  inputRef: RefObject<HTMLInputElement | null>;
  isAlertVisible: boolean;
}

const FileInput = ({ onChange, inputRef, isAlertVisible }: FileInputProps) => {
  return (
    <div className="w-full p-3 rounded-3xl bg-gradient-to-tr from-neutral-300 to-neutral-500 dark:bg-gradient-to-bl">
      <Input
        ref={inputRef}
        type="file"
        accept="application/pdf"
        onChange={onChange}
        multiple={true}
        fullWidth={true}
        label={"Choose PDF files"}
        isInvalid={isAlertVisible}
        errorMessage={
          <Alert
            className="mt-1"
            title="Failed to extract text from pdf"
            color="danger"
            data-testid="file-input-error-message"
          />
        }
        classNames={{
          label: "font-bold text-2xl cursor-pointer",
          input: "cursor-pointer",
          inputWrapper: "h-20",
        }}
      />
    </div>
  );
};

export default FileInput;
