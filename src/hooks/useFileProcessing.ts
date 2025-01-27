import { useRef, useState } from "react";
import pdfToText from "react-pdftotext";
import { useFileHistoryStore } from "@/store/file-history-store";

export function useFileProcessing() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isTextExtracting, setIsTextExtracting] = useState(false);
  const [text, setText] = useState<string | null>(null);
  const [, setTextFileName] = useState("");
  const [isAlertVisible, setIsAlertVisible] = useState(false);

  const appendFileHistory = useFileHistoryStore(
    (state) => state.appendFileHistory,
  );

  const extractText = async (event: React.FormEvent<HTMLInputElement>) => {
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
    } else if (files.length > 1) {
      setIsTextExtracting(true);

      try {
        await Promise.all(
          Array.from(files).map(async (file) => {
            setTextFileName(file.name);
            try {
              const text = await pdfToText(file);
              setText(text);
              appendFileHistory({
                textFileName: file.name,
                text: text,
                isSuccess: true,
              });
            } catch (error) {
              console.log(error);
              appendFileHistory({
                textFileName: file.name,
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
    setText(null);
    setTextFileName("");
    setIsAlertVisible(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return {
    text,
    isTextExtracting,
    isAlertVisible,
    fileInputRef,
    extractText,
    reset,
  };
}
