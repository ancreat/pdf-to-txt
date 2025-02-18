import { Progress } from "@heroui/react";

interface ProgressIndicatorProps {
  isTextExtracting: boolean;
  isAnyFileProcessed: boolean;
}

function getProgressLabel(text: string) {
  return <div className="text-base h-5">{text}</div>;
}

export default function ProgressIndicator({
  isTextExtracting,
  isAnyFileProcessed,
}: ProgressIndicatorProps) {
  return isTextExtracting ? (
    <Progress
      isIndeterminate
      aria-label="Loading..."
      size="md"
      label={getProgressLabel("Loading")}
      data-testid="progress-indicator-loading"
    />
  ) : (
    <Progress
      aria-label="completed"
      size="md"
      value={isAnyFileProcessed ? 100 : 0}
      label={getProgressLabel(isAnyFileProcessed ? "Completed" : "")}
      data-testid={
        isAnyFileProcessed
          ? "progress-indicator-completed"
          : "progress-indicator-not-started"
      }
    />
  );
}
