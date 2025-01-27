import { useRef, useState } from "react";
import pdfToText from "react-pdftotext";
import { useFileHistoryStore } from "@/store/file-history-store";
import { downloadTextAsFile } from "@/utils/file-utils";

export function useFileProcessing() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isTextExtracting, setIsTextExtracting] = useState(false);
  const [text, setText] = useState<string | null>(null);
  const [textFileName, setTextFileName] = useState("");
  const [isAlertVisible, setIsAlertVisible] = useState(false);

  const appendFileHistory = useFileHistoryStore(
    (state) => state.appendFileHistory,
  );

  const extractText = (event: React.FormEvent<HTMLInputElement>) => {
    const files = event.currentTarget.files ?? [];
    setIsAlertVisible(false);

    if (files.length == 0) {
      setTextFileName("");
      setText(null);
    } else if (files.length == 1) {
      const file = files[0];
      setIsTextExtracting(true);
      setTextFileName(file.name);

      pdfToText(file)
        .then((text) => {
          setIsTextExtracting(false);
          setText(text);
          appendFileHistory({
            textFileName: file.name,
            text: text,
            isSuccess: true,
          });
        })
        .catch((error) => {
          setIsTextExtracting(false);
          setText(null);
          setIsAlertVisible(true);
          console.log(error);
          appendFileHistory({
            textFileName: file.name,
            text: null,
            isSuccess: false,
          });
        });
    }
  };

  const downloadText = () => {
    if (!text || !textFileName) {
      return;
    }
    downloadTextAsFile(text, textFileName);
  };

  const reset = () => {
    setText(null);
    setTextFileName("");
    setIsAlertVisible(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return {
    text,
    textFileName,
    isTextExtracting,
    isAlertVisible,
    fileInputRef,
    extractText,
    downloadText,
    reset,
  };
}
