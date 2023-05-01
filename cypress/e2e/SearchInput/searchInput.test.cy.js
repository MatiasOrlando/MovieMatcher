describe("Search movies", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  const apiKey = "3651041388931cf01228edbff2087680";

  it("Displays search results for valid input", () => {
    const inputText = "Avengers";
    cy.intercept(
      "GET",
      `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${inputText}`
    ).as("getMovies");

    cy.get("input")
      .should("be.visible")
      .type(inputText)
      .should("have.value", inputText);

    cy.get("form").submit();
    cy.wait("@getMovies").its("response.statusCode").should("eq", 200);

    cy.get("[data-test-query-search='movie-card']")
      .should("have.length.above", 0)
      .each(($card) => {
        cy.wrap($card).should("contain.text", inputText);
      });
  });

  it("Displays no results message for invalid input", () => {
    const inputText = "abcdefghijk";
    cy.intercept(
      "GET",
      `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${inputText}`
    ).as("getMovies");

    cy.get("input").type(inputText).should("have.value", inputText);
    cy.get("form").submit();
    cy.wait("@getMovies").then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
      expect(interception.response.body).to.have.property("total_results", 0);
    });
    cy.get(".error-toast-test").should("be.visible");
    cy.get(".error-toast-test").contains("No matches found, please try again");
  });
});
