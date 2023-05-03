describe("Access to watch later section", () => {
  it("Visits the watch later section and validates the URL", () => {
    cy.visit("http://localhost:5173/watchlater");
    cy.url().should("include", "watchlater");
    cy.url().should("not.include", "favorites");
    cy.title().should("contain", "Movie Matcher");
  });
});

describe("Handle watch later function on detail container", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
    cy.get("[data-test-query-search='movie-card-search']").first().click();
    cy.get("[data-test-watch-btn='watch-btn']").click();
    cy.get("[data-test-movie-detail-title='detailTitle']")
      .invoke("text")
      .as("titleMovie")
      .then((text) => {
        cy.window()
          .its("localStorage.userWatchLater")
          .then((storedArrayWatchLater) => {
            const arrayWatchLater = JSON.parse(storedArrayWatchLater) || [];
            const movieExists = arrayWatchLater.find(
              (movie) => movie.title === text
            );
            expect(movieExists).to.exist;
            expect(arrayWatchLater.length).to.be.greaterThan(0);
          });
      });
  });
  it("adds a movie to watch later list when clicked for the first time", () => {
    cy.get(".success-watch-toast-test").should("be.visible");
    cy.get(".success-watch-toast-test").contains(
      "Successfully added to watch list"
    );
  });

  it("sends a toast error message when clicked for the second time if it already exists avoiding duplicates", () => {
    const initialLength = 1;
    cy.get("[data-test-watch-btn='watch-btn']").click();
    cy.get("@titleMovie").then(() => {
      cy.window()
        .its("localStorage.userWatchLater")
        .then((storedArrayWatchLater) => {
          const arrayWatchLater = JSON.parse(storedArrayWatchLater);
          const duplicateMovies = arrayWatchLater.filter(
            (movie, i) => arrayWatchLater.indexOf(movie) !== i
          );
          expect(duplicateMovies.length).to.equal(0);
          expect(arrayWatchLater.length).to.equal(initialLength);
          cy.get(".remove-watch-movie-toast-test").should("be.visible");
          cy.get(".remove-watch-movie-toast-test").contains(
            "Movie is already in watch list"
          );
        });
    });
  });
});

describe("Handle watch later function on movie card", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
    cy.get("[data-test-watch-later=3]").click();
    cy.get("[data-test-star-card-title=3]")
      .invoke("text")
      .as("titleMovie")
      .then((text) => {
        cy.window()
          .its("localStorage.userWatchLater")
          .then((storedArrayWatchLater) => {
            const arrayWatchLater = JSON.parse(storedArrayWatchLater) || [];
            const movieExists = arrayWatchLater.find(
              (movie) => movie.title === text
            );
            expect(movieExists).to.exist;
            expect(arrayWatchLater.length).to.be.greaterThan(0);
          });
      });
  });
  it("adds a movie to watch later list when clicked for the first time", () => {
    cy.get(".success-watch-toast-test").should("be.visible");
    cy.get(".success-watch-toast-test").contains(
      "Successfully added to watch list"
    );
  });
  it("sends a toast error message when clicked for the second time if it already exists avoiding duplicates", () => {
    const initialLength = 1;
    cy.get("[data-test-watch-later=3]").click();
    cy.get("@titleMovie").then(() => {
      cy.window()
        .its("localStorage.userWatchLater")
        .then((storedArrayWatchLater) => {
          const arrayWatchLater = JSON.parse(storedArrayWatchLater);
          const duplicateMovies = arrayWatchLater.filter(
            (movie, i) => arrayWatchLater.indexOf(movie) !== i
          );
          expect(duplicateMovies.length).to.equal(0);
          expect(arrayWatchLater.length).to.equal(initialLength);
          cy.get(".remove-watch-movie-toast-test").should("be.visible");
          cy.get(".remove-watch-movie-toast-test").contains(
            "Movie is already in watch list"
          );
        });
    });
  });
});

describe("Displays user's watch later list in Watch laters page", () => {
  it("should render the same content as stored in localStorage", () => {
    cy.visit("http://localhost:5173/");
    cy.get("[data-test-star-fav=0]").first().click();
    cy.get("[data-test-star-fav=1]").first().click();
    cy.get("[data-test-star-card-title=0]")
      .invoke("text")
      .then((text) => {
        cy.window()
          .its("localStorage.userFavorites")
          .then((storedArrayFavorites) => {
            const arrayFavorites = JSON.parse(storedArrayFavorites) || [];
            const movieExists = arrayFavorites.find(
              (movie) => movie.title === text
            );
            expect(movieExists).to.exist;
          });
      });
    cy.get("[data-test-star-card-title=1]")
      .invoke("text")
      .then((text) => {
        cy.window()
          .its("localStorage.userFavorites")
          .then((storedArrayFavorites) => {
            const arrayFavorites = JSON.parse(storedArrayFavorites) || [];
            const movieExists = arrayFavorites.find(
              (movie) => movie.title === text
            );
            expect(movieExists).to.exist;
          });
      });
    cy.visit("http://localhost:5173/favorites");
    cy.contains("My favorites list");

    // Verification both arrays Localstorage and Children rendered have some length
    cy.get("[data-test-fav-movies='movies-fav']").then(($el) => {
      const children = $el.children();
      const movieCards = Array.from(children).filter((child) =>
        child.classList.contains("MuiCard-root")
      );
      cy.window()
        .its("localStorage.userFavorites")
        .then((storedArrayfavorites) => {
          expect(JSON.parse(storedArrayfavorites).length).to.equal(
            movieCards.length
          );
          // Verification both arrays Localstorage and Children rendered have some content of Movie titles
          const favMoviesLocal = JSON.parse(storedArrayfavorites).map(
            (movie) => movie.title
          );
          const favMoviesPage = [];
          movieCards.forEach((card) => {
            cy.wrap(card)
              .find("[data-test-movie-card-title]")
              .invoke("text")
              .then((cardTitle) => {
                favMoviesPage.push(cardTitle);
              });
          });
          cy.wrap(favMoviesPage).should("deep.equal", favMoviesLocal);
        });
    });
  });
});
