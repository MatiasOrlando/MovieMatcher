const apiKey = Cypress.env("API_KEY");

describe("Access to app", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });
  it("Visits the app and verifies the page initial content", () => {
    cy.title().should("contain", "Movie Matcher");
    cy.get("input").should("exist");
    cy.get('[data-title-test="app-title"]').should("contain", "MOVIE-MATCHER");
    cy.get("#moviesContainer").find(".MuiCard-root").should("have.length", 20);
  });

  it("Validates data retrieved from API", () => {
    cy.intercept(
      "GET",
      `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&page=1`
    ).as("getMovies");
    cy.wait("@getMovies").then((interception) => {
      expect(interception.response.statusCode).to.equal(200);
      const movies = interception.response.body.results;
      expect(movies).to.be.an("array");
      expect(movies.length).to.be.greaterThan(0);
      movies.forEach((movie) => {
        expect(movie).to.have.property("title");
        expect(movie).to.have.property("release_date");
      });
      cy.get("[data-test-card-title=1]")
        .invoke("text")
        .should("eq", movies[1].title);
      cy.get("[data-test-card-release-date=1]")
        .invoke("text")
        .should("eq", movies[1].release_date);
      cy.get("[data-test-card-title=2]")
        .invoke("text")
        .should("eq", movies[2].title);
      cy.get("[data-test-card-release-date=2]")
        .invoke("text")
        .should("eq", movies[2].release_date);
    });
  });
});

describe("Access movie detail", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
    cy.get("[data-test-movie-card='movie-card-10']").first().click();
  });
  it("Should visit the app, click on a card and display movie detail", () => {
    cy.get("[data-test-movie-detail-title='detailTitle']").should("exist");
    cy.get("[data-test-watch-btn='watch-btn']").should("exist");
    cy.get("[data-test-add-fav-btn='fav-btn']").should("exist");
    cy.get("[data-test-movie-detail-img='movie-image']").should("exist");
  });
  it("In movie detail, button 'Go back to search' should go backwards", () => {
    cy.get("[data-test-btn-goback='goback-btn-1048300']").click();
    cy.window().its("history").invoke("back");
    cy.url().should("eq", "http://localhost:5173/");
  });
});
