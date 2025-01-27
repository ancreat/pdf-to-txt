export function downloadTextAsFile(text: string, fileName: string) {
  const element = document.createElement("a");
  const file = new Blob([text], { type: "text/plain" });
  element.href = URL.createObjectURL(file);
  element.download = fileName + ".txt";
  document.body.appendChild(element);
  element.click();

  document.body.removeChild(element);
  URL.revokeObjectURL(element.href);
}
