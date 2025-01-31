import { jsPDF } from "jspdf";

describe("Upload multiple pdf files", () => {
  it("should upload multiple pdf files and show the result", () => {
    cy.fixture("sample-pdf-data.json").then((dataArray) => {
      const files = dataArray.map(
        (data: { sampleText: string; fileName: string }) => {
          const doc = new jsPDF();
          const samplePdf = doc.text(data.sampleText, 10, 10).output();

          const file = {
            contents: Cypress.Buffer.from(samplePdf),
            fileName: data.fileName,
            lastModified: Date.now(),
          };
          return file;
        },
      );

      cy.visit("/");
      cy.get('input[type="file"]').selectFile(files);
      cy.get('[data-testid="result-button"]').click();

      for (let i = 0; i < dataArray.length; i++) {
        cy.get(`[data-testid="open-text-modal-button-${i}"]`).should("exist");
      }
    });
  });
});
