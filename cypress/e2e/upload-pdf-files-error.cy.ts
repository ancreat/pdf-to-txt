describe("Upload a pdf file with error", () => {
  it("should show the error message", () => {
    cy.visit("/");
    const errorFile = {
      contents: Cypress.Buffer.from("error"),
      fileName: "error.pdf",
      lastModified: Date.now(),
    };
    cy.get('[data-testid="drag-zone"]').selectFile(errorFile, {
      action: "drag-drop",
    });
    cy.get('[data-testid="file-input-error-message"]').then((errorMessage) => {
      expect(errorMessage).to.be.visible;
    });
  });
});
