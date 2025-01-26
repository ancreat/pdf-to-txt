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

interface ButtonForFullTextModalProps {
  text: string;
  textFileName: string;
  isTextAvailable: boolean;
}

export default function ButtonForFullTextModal({
  text,
  textFileName,
  isTextAvailable,
}: ButtonForFullTextModalProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
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
    </>
  );
}
