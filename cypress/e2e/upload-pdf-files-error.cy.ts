describe("Upload a pdf file with error", () => {
  it("should show the error message", () => {
    cy.visit("/");
    cy.get('input[type="file"]').selectFile({
      contents: Cypress.Buffer.from("error"),
      fileName: "error.pdf",
      lastModified: Date.now(),
    });
    cy.get('[data-testid="file-input-error-message"]').then((errorMessage) => {
      expect(errorMessage).to.be.visible;
    });
  });
});
