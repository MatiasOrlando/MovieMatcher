describe("Access to watch later section", () => {
  it("Visits the watch later section and validates the URL", () => {
    cy.visit("http://localhost:5173/watchlater");
    cy.url().should("include", "watchlater");
    cy.url().should("not.include", "favorites");
    cy.title().should("contain", "Movie Matcher");
  });
});
