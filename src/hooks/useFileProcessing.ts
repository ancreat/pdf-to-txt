import { useState, useRef } from "react";
import pdfToText from "react-pdftotext";

export function useFileProcessing() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isTextExtracting, setIsTextExtracting] = useState(false);
  const [text, setText] = useState("");
  const [textFileName, setTextFileName] = useState("");
  const [isAlertVisible, setIsAlertVisible] = useState(false);

  const extractText = (event: React.FormEvent<HTMLInputElement>) => {
    const files = event.currentTarget.files ?? [];
    setIsAlertVisible(false);

    if (files.length == 0) {
      setTextFileName("");
      setText("");
    } else if (files.length == 1) {
      const file = files[0];
      setIsTextExtracting(true);
      setTextFileName(file.name);

      pdfToText(file)
        .then((text) => {
          setIsTextExtracting(false);
          setText(text);
        })
        .catch((error) => {
          setIsTextExtracting(false);
          setText("");
          setIsAlertVisible(true);
          console.log(error);
        });
    }
  };

  const downloadText = () => {
    if (!text || !textFileName) {
      return;
    }

    const element = document.createElement("a");
    const file = new Blob([text], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = textFileName + ".txt";
    document.body.appendChild(element);
    element.click();
  };

  const reset = () => {
    setText("");
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
