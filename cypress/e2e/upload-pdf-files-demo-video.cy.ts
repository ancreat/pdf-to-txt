import { jsPDF } from "jspdf";

describe("Upload a pdf file for demo video", () => {
  before(function () {
    cy.fixture("sample-pdf-data.json").then((pdfDataArray) => {
      const pdfData = pdfDataArray[0];
      const doc = new jsPDF();
      const file: Cypress.FileReference = {
        contents: Cypress.Buffer.from(
          doc.text(pdfData.sampleText, 10, 10).output(),
        ),
        fileName: pdfData.fileName,
        lastModified: new Date(0).getTime(),
      };

      this.file = file;
    });

    const updateTheme = (theme: "light" | "dark") => {
      cy.get('[data-testid="theme-switch"]')
        .should("exist")
        .then((switchElement) => {
          const isLightThemeSelected =
            switchElement.attr("data-selected") === "true";
          const isLightTheme = theme === "light";
          if (isLightThemeSelected !== isLightTheme) {
            cy.get('[data-testid="theme-switch"]').click();
          }
        });
    };

    const theme: "light" | "dark" = "light";
    cy.visit("/");
    updateTheme(theme);
  });

  it.skip("should take demo video", function () {
    cy.get('[data-testid="drag-zone"]').focus();
    cy.get('[data-testid="drag-zone"]').selectFile(this.file, {
      action: "drag-drop",
    });

    cy.wait(1000);
    cy.get('[data-testid="progress-indicator-completed"]').should("exist");

    cy.get('[data-testid="result-button"]').click();
    cy.wait(1000);

    cy.get('[data-testid="open-text-modal-button-0"]').click();
    cy.wait(1000);

    cy.get('[data-testid="copy-snippet"] button:first').click();
    cy.wait(1000);

    cy.get("body").click(0, 0);
    cy.wait(1000);

    if (Cypress.env("mode") == "desktop") {
      cy.get('[data-testid="navigation-home-tab"]').click();
      cy.wait(2000);
    }
  });
});
