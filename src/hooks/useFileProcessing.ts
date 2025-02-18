import { useState } from "react";
import pdfToText from "react-pdftotext";
import { useFileHistoryStore } from "@/store/file-history-store";

export function useFileProcessing() {
  const [isTextExtracting, setIsTextExtracting] = useState(false);
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [isAlertVisible, setIsAlertVisible] = useState(false);

  const appendFileHistory = useFileHistoryStore(
    (state) => state.appendFileHistory,
  );

  const extractText = async (files: File[]) => {
    setIsAlertVisible(false);

    if (files.length == 0) {
      setFileNames([]);
    } else if (files.length > 0) {
      setIsTextExtracting(true);
      setFileNames(files.map((o) => o.name));

      try {
        await Promise.all(
          Array.from(files).map(async (file) => {
            try {
              const text = await pdfToText(file);
              appendFileHistory({
                fileName: file.name,
                text: text,
                isSuccess: true,
              });
            } catch (error) {
              console.log(error);
              setIsAlertVisible(true);
              appendFileHistory({
                fileName: file.name,
                text: null,
                isSuccess: false,
              });
            }
          }),
        );
      } finally {
        setIsTextExtracting(false);
      }
    }
  };

  const reset = () => {
    setFileNames([]);
    setIsAlertVisible(false);
  };

  return {
    fileNames,
    isTextExtracting,
    isAlertVisible,
    extractText,
    reset,
  };
}
