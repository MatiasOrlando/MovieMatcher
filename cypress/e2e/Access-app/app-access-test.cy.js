import { accessMovieDetail } from "./helpers-access";

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
  });
  it("Should visit the app, click on 'Learn more' button and display movie detail", () => {
    accessMovieDetail(
      "[data-test='learn-btn-8']",
      "[data-test-movie-card='movie-card-8']",
      "[data-test-movie-detail-title='detailTitle']"
    );
  });
  it("Should visit the app, click on a card and display movie detail", () => {
    accessMovieDetail(
      "[data-test-movie-card='movie-card-10']",
      "[data-test-movie-card='movie-card-10']",
      "[data-test-movie-detail-title='detailTitle']"
    );
  });
  it("In movie detail, button 'Go back to search' should go backwards", () => {
    cy.get("[data-test-movie-card='movie-card-10']").first().click();
    cy.get("[data-test-btn-goback='goback-btn']").click();
    cy.window().its("history").invoke("back");
    cy.url().should("eq", "http://localhost:5173/");
  });
});
