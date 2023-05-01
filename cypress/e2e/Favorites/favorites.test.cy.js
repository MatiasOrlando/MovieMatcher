describe("Access to favorites section", () => {
  it("Visits the favorites section and validates the URL", () => {
    cy.visit("http://localhost:5173/favorites");
    cy.url().should("include", "favorites");
    cy.url().should("not.include", "watchlater");
    cy.title().should("contain", "Movie Matcher");
  });
});
