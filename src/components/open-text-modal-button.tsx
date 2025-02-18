import { downloadTextAsFile } from "@/utils/file-utils";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Snippet,
  useDisclosure,
} from "@heroui/react";

interface OpenTextModalButtonProps {
  text: string;
  textFileName: string;
  isTextAvailable: boolean;
  "data-testid"?: string;
}

export default function OpenTextModalButton({
  text,
  textFileName,
  isTextAvailable,
  "data-testid": dataTestId,
}: OpenTextModalButtonProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        size="lg"
        onPress={onOpen}
        isDisabled={!isTextAvailable}
        variant="bordered"
        data-testid={dataTestId}
      >
        Show
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
              <ModalBody data-testid="open-text-modal-button-modal-body">
                {text}
              </ModalBody>
              <ModalFooter className="gap-5">
                <Snippet
                  hideSymbol
                  codeString={text}
                  disableCopy={!isTextAvailable}
                  variant="bordered"
                  size="md"
                  data-testid="copy-snippet"
                >
                  Copy
                </Snippet>
                <Button
                  onPress={() => downloadTextAsFile(text, textFileName)}
                  isDisabled={text == null}
                  variant="bordered"
                  size="lg"
                >
                  Download
                </Button>
                <Button color="primary" onPress={onClose} size="lg">
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
