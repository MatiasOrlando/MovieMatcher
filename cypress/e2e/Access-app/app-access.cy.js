describe("Access to application", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });
  it("Visits the app and verifies the page title", () => {
    cy.title().should("contain", "Movie Matcher");
    cy.get('[data-title-test="app-title"]').should("contain", "MOVIE-MATCHER");
  });

  it("Validates data retrieved from API", () => {
    const apiKey = "3651041388931cf01228edbff2087680";
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
    });
  });
});
