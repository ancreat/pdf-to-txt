"use client";
import { useState } from "react";
import pdfToText from "react-pdftotext";
import {
  Alert,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Progress,
  Snippet,
  useDisclosure,
} from "@nextui-org/react";
import {
  BsGithub,
  BsFiletypePdf,
  BsFiletypeTxt,
  BsArrowRight,
} from "react-icons/bs";

export default function Home() {
  const [isTextExtracting, setIsTextExtracting] = useState(false);
  const [fileInputKey, setFileInputKey] = useState(Date.now());

  const [text, setText] = useState("");
  const [textFileName, setTextFileName] = useState("");
  const [isAlertVisible, setIsAlertVisible] = useState(false);

  const isTextAvailable = text != "";

  const { isOpen, onOpen, onClose } = useDisclosure();

  const extractText = (event: React.FormEvent<HTMLInputElement>) => {
    const files = event.currentTarget.files ?? [];

    if (files.length == 0) {
      setTextFileName("");
      setText("");
    } else if (files.length == 1) {
      const file = files[0];
      setIsTextExtracting(true);
      setTextFileName(file.name);

      pdfToText(file)
        .then((text) => {
          setText(text);
          setIsTextExtracting(false);
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
    const element = document.createElement("a");
    const file = new Blob([text], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = textFileName + ".txt";
    document.body.appendChild(element);
    element.click();
  };

  return (
    <div className="grid items-center justify-items-center m-5">
      <main className="flex flex-col gap-5 row-start-2 items-center max-w-lg">
        <div className="flex flex-col justify-center items-center w-full m-2 p-3 border-3 rounded-full">
          <p className="text-3xl font-bold m-2">Pdf to text</p>
          <p className="flex gap-2 text-5xl">
            <BsFiletypePdf />
            <BsArrowRight />
            <BsFiletypeTxt />
          </p>
          <BsGithub className="text-5xl m-2" />
          Open source project
        </div>

        <ol className="list-inside list-decimal text-lg">
          <li>Load the pdf</li>
          <li>Copy the output to clipboard or download it</li>
        </ol>

        <Input
          type="file"
          accept="application/pdf"
          onChange={extractText}
          multiple={false}
          fullWidth={false}
          key={fileInputKey}
        />
        <Alert
          title="Failed to extract text from pdf"
          color="danger"
          isVisible={isAlertVisible}
          onClose={() => setIsAlertVisible(false)}
        />

        {isTextExtracting ? (
          <Progress
            isIndeterminate
            aria-label="Loading..."
            className="max-w-md"
            size="md"
            label="Loading"
          />
        ) : (
          <Progress
            aria-label="completed"
            className="max-w-md"
            size="md"
            value={isTextAvailable ? 100 : 0}
            label={isTextAvailable ? "Completed" : ""}
          />
        )}

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <Snippet
            hideSymbol
            codeString={text}
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

        <Button
          size="lg"
          onPress={onOpen}
          isDisabled={!isTextAvailable}
          variant="bordered"
        >
          Show the full text
        </Button>

        <Modal
          isOpen={isOpen}
          size="3xl"
          scrollBehavior="inside"
          onClose={onClose}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader>Text of {textFileName}</ModalHeader>
                <ModalBody>
                  <p>{text}</p>
                </ModalBody>
                <ModalFooter>
                  <Snippet
                    hideSymbol
                    codeString={text}
                    disableCopy={!isTextAvailable}
                    variant="bordered"
                    size="md"
                  >
                    Copy
                  </Snippet>
                  <Button color="primary" onPress={onClose} size="lg">
                    Close
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>

        <Button
          onPress={() => {
            setText("");
            setTextFileName("");
            setIsAlertVisible(false);
            setFileInputKey(Date.now());
          }}
          variant="bordered"
          color="danger"
          size="sm"
          isDisabled={isTextExtracting || !isTextAvailable}
        >
          Reset for the next pdf
        </Button>
      </main>
    </div>
  );
}
