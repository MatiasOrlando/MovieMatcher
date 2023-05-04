const apiKey = Cypress.env("API_KEY");

describe("Search movies", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });
  it("Displays search results for valid input value", () => {
    const inputText = "Avengers";
    cy.intercept(
      "GET",
      `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${inputText}`
    ).as("getQueryMovies");
    cy.get("input")
      .should("be.visible")
      .type(inputText)
      .should("have.value", inputText);
    cy.get("form").submit();
    cy.wait("@getQueryMovies").its("response.statusCode").should("eq", 200);
    cy.get("[data-test-all-cards='all-movie-cards']")
      .should("have.length.above", 0)
      .each(($card) => {
        cy.wrap($card).should("contain.text", inputText);
      });
  });

  it("Displays no results message for invalid input and check actual cards do not match search criteria", () => {
    const inputText = "aktpzjtlm";
    cy.intercept(
      "GET",
      `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${inputText}`
    ).as("getQueryMovies");
    cy.get("input").type(inputText).should("have.value", inputText);
    cy.get("form").submit();
    cy.wait("@getQueryMovies").then((data) => {
      expect(data.response.statusCode).to.eq(200);
      expect(data.response.body).to.have.property("total_results", 0);
    });
    cy.get("[data-test-all-cards='all-movie-cards']")
      .should("have.length.above", 0)
      .each(($card) => {
        cy.wrap($card).should("not.contain.text", inputText);
      });
    cy.get(".error-toast-test").should("be.visible");
    cy.get(".error-toast-test").contains("No matches found, please try again");
  });
});
