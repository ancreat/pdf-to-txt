"use client";

import { Alert } from "@heroui/react";
import { JSX } from "react";
import { useDropzone } from "react-dropzone";

interface FileInputProps {
  extractText: (files: File[]) => void;
  isAlertVisible: boolean;
  progressIndicator: JSX.Element;
  selectedFileLabel: JSX.Element;
}

function FileInput({
  extractText,
  isAlertVisible,
  progressIndicator,
  selectedFileLabel,
}: FileInputProps) {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: extractText,
    accept: {
      "application/pdf": [".pdf"],
    },
  });

  return (
    <section className="flex flex-col p-4 gap-3 w-full">
      <div
        {...getRootProps()}
        className="border-3 border-dashed border-gray-300 rounded-lg text-center cursor-pointer hover:border-gray-500 py-10"
        data-testid="drag-zone"
      >
        <input {...getInputProps()} />
        <p>Click to select PDF files or drag and drop here</p>
      </div>

      {selectedFileLabel}

      {progressIndicator}

      {isAlertVisible && (
        <Alert
          className="mt-1"
          title="Failed to extract text from some PDF files"
          color="danger"
          data-testid="file-input-error-message"
        />
      )}
    </section>
  );
}

export default FileInput;
