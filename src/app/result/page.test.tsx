import { ReactNode } from "react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  render,
  screen,
  fireEvent,
  cleanup,
  within,
} from "@testing-library/react";
import Result from "@/app/result/page";
import { useFileHistoryStore } from "@/store/file-history-store";

const TEST_IDS = {
  resetButton: "reset-button",
  noResultsMessage: "no-results-message",
  filenameCell: "filename-cell",
  showButton: (fileName: string) => `show-button-${fileName}`,
  header: (header: string) => `header-${header}`,
};

const renderResult = () => {
  render(<Result />);
};

vi.mock("@/store/file-history-store", () => ({
  useFileHistoryStore: vi.fn(),
}));

vi.mock("@heroui/react", () => ({
  Button: ({
    children,
    onPress,
    "data-testid": testId,
  }: {
    children: ReactNode;
    onPress: () => void;
    "data-testid"?: string;
  }) => (
    <button onClick={onPress} data-testid={testId}>
      {children}
    </button>
  ),
  Table: ({ children }: { children: ReactNode }) => <table>{children}</table>,
  TableHeader: ({ children }: { children: ReactNode }) => (
    <thead>
      <tr>{children}</tr>
    </thead>
  ),
  TableColumn: ({
    children,
    "data-testid": testId,
  }: {
    children: ReactNode;
    "data-testid"?: string;
  }) => <th data-testid={testId}>{children}</th>,
  TableBody: ({ children }: { children: ReactNode }) => (
    <tbody>{children}</tbody>
  ),
  TableRow: ({ children }: { children: ReactNode }) => <tr>{children}</tr>,
  TableCell: ({
    children,
    className,
  }: {
    children: ReactNode;
    className?: string;
  }) => (
    <td
      className={className}
      data-testid={className === "font-bold" ? "filename-cell" : undefined}
    >
      {children}
    </td>
  ),
}));

vi.mock("@/components/button-for-full-text-modal", () => ({
  default: ({ textFileName }: { textFileName: string }) => (
    <button data-testid={`show-button-${textFileName}`}>Show</button>
  ),
}));

describe("Result Page", () => {
  const mockResetFileHistory = vi.fn();

  const mockFileHistory = [
    {
      textFileName: "test1.pdf",
      text: "Sample text 1",
      isSuccess: true,
      timestamp: "2000-01-01 01:00:00",
    },
    {
      textFileName: "test2.pdf",
      text: null,
      isSuccess: false,
      timestamp: "2000-01-01 01:01:00",
    },
  ];

  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
    (useFileHistoryStore as any).mockImplementation((selector: any) =>
      selector({
        fileHistory: mockFileHistory,
        resetFileHistory: mockResetFileHistory,
      }),
    );
  });

  it("renders the table with correct headers", () => {
    renderResult();

    const expectedHeaders = ["filename", "timestamp", "status", "text"];
    expectedHeaders.forEach((header) => {
      expect(screen.getByTestId(TEST_IDS.header(header))).toBeDefined();
    });
  });

  it('shows "Succeeded" status for successful conversions', () => {
    renderResult();

    const test1FileNameCell = screen
      .getAllByTestId(TEST_IDS.filenameCell)
      .find((cell) => cell.textContent === "test1.pdf");
    expect(test1FileNameCell).toBeDefined();

    const succeededRow = test1FileNameCell!.closest("tr");
    expect(succeededRow).not.toBeNull();

    const succeededStatus = within(succeededRow!).getByText("Succeeded");
    expect(succeededStatus).toBeDefined();
  });

  it('shows "Failed" status for unsuccessful conversions', () => {
    renderResult();

    const test2FileNameCell = screen
      .getAllByTestId(TEST_IDS.filenameCell)
      .find((cell) => cell.textContent === "test2.pdf");
    expect(test2FileNameCell).toBeDefined();

    const failedRow = test2FileNameCell!.closest("tr");
    expect(failedRow).not.toBeNull();

    const failedStatus = within(failedRow!).getByText("Failed");
    expect(failedStatus).toBeDefined();
  });

  it("shows reset button and handles click when file history exists", () => {
    renderResult();

    const resetButton = screen.getByTestId(TEST_IDS.resetButton);
    expect(resetButton).toBeDefined();

    fireEvent.click(resetButton);
    expect(mockResetFileHistory).toHaveBeenCalledTimes(1);
  });

  it("shows empty state message when file history is empty", () => {
    (useFileHistoryStore as any).mockImplementation((selector: any) =>
      selector({
        fileHistory: [],
        resetFileHistory: mockResetFileHistory,
      }),
    );

    renderResult();

    expect(screen.getByTestId(TEST_IDS.noResultsMessage)).toBeDefined();
    expect(screen.queryByTestId(TEST_IDS.resetButton)).toBeNull();
  });

  it("renders ButtonForFullTextModal only for successful conversions with text", () => {
    renderResult();

    const showButton = screen.getByTestId(TEST_IDS.showButton("test1.pdf"));
    expect(showButton).toBeDefined();

    expect(screen.queryByTestId(TEST_IDS.showButton("test2.pdf"))).toBeNull();
  });

  it("should have correct number of items in fileHistory", () => {
    renderResult();
    const fileNameCells = screen.getAllByTestId(TEST_IDS.filenameCell);
    expect(fileNameCells).toHaveLength(mockFileHistory.length);
  });
});
