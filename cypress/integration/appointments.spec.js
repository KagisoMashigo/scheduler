describe("Appointment", () => {

  beforeEach(() => {
    cy.request("GET", "/api/debug/reset");
  
    cy.visit("/");
  
    cy.contains("Monday");
   });

  it("should book an interview", () => {

    cy.get("[alt=Add]")
    .first()
    .click()

    cy.get("[data-testid=student-name-input]")
    .type('Master Kakes')

    cy.get(".interviewers__item-image")
    .first()
    .click()
    
    cy.contains("Save")
    .click()

    cy.contains(".appointment__card--show", "Master Kakes");
    cy.contains(".appointment__card--show", "Sylvia Palmer");

  });

  it("should edit an interview", () => {

    cy.get("[alt=Edit]")
    .first()
    .click({ force: true });

    cy.get("[data-testid=student-name-input]").clear().type("Master Kakes");
    cy.get("[alt='Tori Malcolm']").click();

    cy.contains("Save").click();

    cy.contains(".appointment__card--show", "Master Kakes");
    cy.contains(".appointment__card--show", "Tori Malcolm");

  });
  
  it("should cancel an interview", () => {

    cy.get("[alt=Delete]")
    .click({ force: true });

    cy.contains("Confirm").click();

    cy.contains("Deleting").should("exist");
    cy.contains("Deleting").should("not.exist");

    cy.contains(".appointment__card--show", "Archie Cohen")
      .should("not.exist");

  });
});