"use client";
import { useFileHistoryStore } from "@/store/file-history-store";
import { Button } from "@heroui/react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/react";
import ButtonForFullTextModal from "@/components/button-for-full-text-modal";

export default function Result() {
  const fileHistory = useFileHistoryStore((state) => state.fileHistory);
  const resetFileHistory = useFileHistoryStore(
    (state) => state.resetFileHistory,
  );

  return (
    <main className="flex flex-col items-center gap-5 m-5 max-w-5xl mx-auto">
      <Table aria-label="Result Table">
        <TableHeader>
          <TableColumn>File Name</TableColumn>
          <TableColumn>Timestamp</TableColumn>
          <TableColumn>Status</TableColumn>
          <TableColumn>Text</TableColumn>
        </TableHeader>
        <TableBody>
          {fileHistory.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="font-bold">{item.textFileName}</TableCell>
              <TableCell className="text-sm text-gray-500">
                {item.timestamp}
              </TableCell>
              <TableCell>{item.isSuccess ? "Succeeded" : "Failed"}</TableCell>
              <TableCell>
                {item.text !== null && (
                  <ButtonForFullTextModal
                    text={item.text ?? ""}
                    textFileName={item.textFileName ?? ""}
                    isTextAvailable={item.text !== null}
                  />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {fileHistory.length === 0 && "No result is found."}

      {fileHistory.length !== 0 && (
        <Button onPress={resetFileHistory}>Reset</Button>
      )}
    </main>
  );
}
