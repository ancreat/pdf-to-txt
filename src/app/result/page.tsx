"use client";
import { useFileHistoryStore } from "@/store/file-history-store";
import {
  Button,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/react";
import OpenTextModalButton from "@/components/open-text-modal-button";

export default function Result() {
  const fileHistory = useFileHistoryStore((state) => state.fileHistory);
  const appendFileHistory = useFileHistoryStore(
    (state) => state.appendFileHistory,
  );
  const resetFileHistory = useFileHistoryStore(
    (state) => state.resetFileHistory,
  );

  const addSampleFile = () => {
    appendFileHistory({
      fileName: "Sample File.pdf",
      text: "Hello, World!",
      isSuccess: true,
    });
  };

  return (
    <main className="flex flex-col gap-5 items-center p-3 w-full max-w-3xl mx-auto">
      <Table aria-label="Result Table">
        <TableHeader>
          <TableColumn data-testid="header-index">Item</TableColumn>
          <TableColumn data-testid="header-filename">File Name</TableColumn>
          <TableColumn data-testid="header-status">Status</TableColumn>
          <TableColumn data-testid="header-text">Text</TableColumn>
        </TableHeader>
        <TableBody>
          {fileHistory.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell className="font-bold">{item.fileName}</TableCell>
              <TableCell>{item.isSuccess ? "Succeeded" : "Failed"}</TableCell>
              <TableCell>
                {item.text !== null && (
                  <OpenTextModalButton
                    data-testid={`open-text-modal-button-${index}`}
                    text={item.text ?? ""}
                    textFileName={item.fileName ?? ""}
                    isTextAvailable={item.text !== null}
                  />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {fileHistory.length === 0 && (
        <div data-testid="no-results-message">No result is found.</div>
      )}

      <Button onPress={addSampleFile}>Add a Sample File</Button>

      {fileHistory.length !== 0 && (
        <Button data-testid="reset-button" onPress={resetFileHistory}>
          Reset
        </Button>
      )}
    </main>
  );
}
