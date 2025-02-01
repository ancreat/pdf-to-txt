import { Progress } from "@heroui/react";

interface ProgressIndicatorProps {
  isTextExtracting: boolean;
  isTextAvailable: boolean;
}

export default function ProgressIndicator({
  isTextExtracting,
  isTextAvailable,
}: ProgressIndicatorProps) {
  return isTextExtracting ? (
    <Progress
      isIndeterminate
      aria-label="Loading..."
      size="md"
      label="Loading"
      data-testid="progress-indicator-loading"
    />
  ) : (
    <Progress
      aria-label="completed"
      size="md"
      value={isTextAvailable ? 100 : 0}
      label={isTextAvailable ? "Completed" : ""}
      data-testid="progress-indicator-completed"
    />
  );
}
