import { jsPDF } from "jspdf";

describe("Upload a pdf file", () => {
  it("should upload a pdf file and show the result", () => {
    cy.fixture("sample-pdf-data.json").then((dataArray) => {
      const data = dataArray[0];
      const doc = new jsPDF();
      const file = {
        contents: Cypress.Buffer.from(
          doc.text(data.sampleText, 10, 10).output(),
        ),
        fileName: data.fileName,
        lastModified: Date.now(),
      };

      cy.visit("/");
      cy.get('[data-testid="drag-zone"]').selectFile(file, {
        action: "drag-drop",
      });
      cy.get('[data-testid="progress-indicator-completed"]').should("exist");
      cy.get('[data-testid="result-button"]').then((button) => {
        expect(button).to.not.be.disabled;
      });
      cy.get('[data-testid="result-button"]').click();
      cy.get('[data-testid="open-text-modal-button-0"]').click();
      cy.get('[data-testid="open-text-modal-button-modal-body"]').then(
        (modalBody) => {
          expect(modalBody).to.have.text(data.sampleText);
        },
      );
    });
  });
});
