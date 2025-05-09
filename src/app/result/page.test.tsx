import { ReactNode } from "react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  render,
  screen,
  fireEvent,
  cleanup,
  within,
  renderHook,
  act,
} from "@testing-library/react";
import Result from "@/app/result/page";
import {
  useFileHistoryStore,
  type FileHistory,
} from "@/store/file-history-store";

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

const mockFileHistory: FileHistory[] = [
  {
    fileName: "test1.pdf",
    text: "Sample text 1",
    isSuccess: true,
  },
  {
    fileName: "test2.pdf",
    text: null,
    isSuccess: false,
  },
];

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

vi.mock("@/components/open-text-modal-button", () => ({
  default: ({ textFileName }: { textFileName: string }) => (
    <button data-testid={`show-button-${textFileName}`}>Show</button>
  ),
}));

describe("Result Page", () => {
  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();

    const resetFileHistory = renderHook(() =>
      useFileHistoryStore((state) => state.resetFileHistory),
    );

    act(() => {
      resetFileHistory.result.current();
    });

    const appendFileHistory = renderHook(() =>
      useFileHistoryStore((state) => state.appendFileHistory),
    );

    act(() => {
      appendFileHistory.result.current(mockFileHistory[0]);
      appendFileHistory.result.current(mockFileHistory[1]);
    });
  });

  it("renders the table with correct headers", () => {
    renderResult();

    const expectedHeaders = ["index", "filename", "status", "text"];
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
    const { result } = renderHook(() => useFileHistoryStore());
    const spy = vi.spyOn(result.current, "resetFileHistory");
    renderResult();

    const resetButton = screen.getByTestId(TEST_IDS.resetButton);
    expect(resetButton).toBeDefined();

    fireEvent.click(resetButton);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(result.current.fileHistory).toEqual([]);
  });

  it("shows empty state message when file history is empty", () => {
    const resetFileHistory = renderHook(() =>
      useFileHistoryStore((state) => state.resetFileHistory),
    );

    act(() => {
      resetFileHistory.result.current();
    });

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
