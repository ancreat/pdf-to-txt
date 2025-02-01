import { jsPDF } from "jspdf";

describe.skip("Upload a pdf file for demo", () => {
  it("should take screenshots for light and dark themes", () => {
    cy.viewport(500, 500);

    cy.fixture("sample-pdf-data.json").then((dataArray) => {
      const data = dataArray[0];
      const doc = new jsPDF();
      const file: Cypress.FileReference = {
        contents: Cypress.Buffer.from(
          doc.text(data.sampleText, 10, 10).output(),
        ),
        fileName: data.fileName,
        lastModified: new Date(0).getTime(),
      };

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

      const themes: ("light" | "dark")[] = ["light", "dark"];
      themes.forEach((theme) => {
        let counter = 1;

        const takeScreenshot = () => {
          cy.screenshot(`demo_${theme}_theme_${counter}`, {
            capture: "viewport",
            overwrite: true,
          });
          counter++;
        };

        cy.visit("/");
        updateTheme(theme);

        cy.get('input[type="file"]').selectFile(file);

        cy.get('[data-testid="progress-indicator-completed"]').should("exist");
        cy.get('[data-testid="result-button"]').then((button) => {
          expect(button).to.not.be.disabled;
        });
        takeScreenshot();

        cy.get('[data-testid="result-button"]').click().wait(3000);
        takeScreenshot();

        cy.get('[data-testid="open-text-modal-button-0"]').click().wait(3000);
        takeScreenshot();

        cy.get('[data-testid="open-text-modal-button-modal-body"]').then(
          (modalBody) => {
            expect(modalBody).to.have.text(data.sampleText);
          },
        );
      });
    });
  });
});
