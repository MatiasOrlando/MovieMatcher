import {
  addWatchLaterInMovieCard,
  handleErrorAddWatchList,
} from "./helpers-watch-later";

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
    cy.get("[data-test-movie-card='movie-card-4']").first().click();
    cy.wait(100);
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
            cy.wait(100);
            expect(movieExists).to.exist;
            expect(arrayWatchLater.length).to.be.greaterThan(0);
          });
      });
  });
  it("Adds a movie to watch later list when clicked for the first time", () => {
    cy.get(".success-watch-toast-test").should("be.visible");
    cy.get(".success-watch-toast-test").contains(
      "Successfully added to watch list"
    );
  });

  it("Sends a toast error message when clicked for the second time if it already exists, avoiding duplicates", () => {
    handleErrorAddWatchList("[data-test-watch-btn='watch-btn']");
  });
});

describe("Handle watch later function on movie card", () => {
  beforeEach(() => {
    addWatchLaterInMovieCard(
      "[data-test-watch-later=3]",
      "[data-test-card-title=3]"
    );
  });
  it("Adds a movie to watch later list when clicked for the first time", () => {
    cy.get(".success-watch-toast-test").should("be.visible");
    cy.get(".success-watch-toast-test").contains(
      "Successfully added to watch list"
    );
  });
  it("Sends a toast error message when clicked for the second time if it already exists, avoiding duplicates", () => {
    handleErrorAddWatchList("[data-test-watch-later='3']");
  });
});

describe("Handle delete movie from watch later list", () => {
  it("Should remove movie added to Watch later list", () => {
    cy.visit("http://localhost:5173/");
    cy.get("[data-test-watch-later=3]").click();
    cy.get("[data-test-card-title=3]")
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
            cy.wait(100);
            expect(movieExists).to.exist;
            expect(arrayWatchLater.length).to.be.greaterThan(0);
          });
      });
    cy.visit("http://localhost:5173/watchlater");
    cy.get("[data-testid='DeleteForeverOutlinedIcon']").click();
    cy.window()
      .its("localStorage.userWatchLater")
      .then((storedArrayWatchLater) => {
        expect(JSON.parse(storedArrayWatchLater).length).to.equal(0);
      });
    cy.get("[data-test-selection-user='user-selection']")
      .should("exist")
      .should("be.visible");
  });
});

describe("Displays user's watch later list in Watch later page", () => {
  it("Should render the same content as stored in localStorage", () => {
    cy.visit("http://localhost:5173/watchlater");
    cy.get("[data-test-selection-user='user-selection']").contains(
      "No watch list added yet.."
    );
    cy.visit("http://localhost:5173/");
    cy.get("[data-test-watch-later='5']").first().click();
    cy.get("[data-test-watch-later='6']").first().click();
    cy.get("[data-test-card-title=5]")
      .invoke("text")
      .then((text) => {
        cy.window()
          .its("localStorage.userWatchLater")
          .then((storedArrayWatchLater) => {
            const arrayWatchLater = JSON.parse(storedArrayWatchLater) || [];
            const movieExists = arrayWatchLater.find(
              (movie) => movie.title === text
            );
            expect(movieExists).to.exist;
          });
      });
    cy.get("[data-test-card-title=6]")
      .invoke("text")
      .then((text) => {
        cy.window()
          .its("localStorage.userWatchLater")
          .then((storedArrayWatchLater) => {
            const arrayWatchLater = JSON.parse(storedArrayWatchLater) || [];
            const movieExists = arrayWatchLater.find(
              (movie) => movie.title === text
            );
            expect(movieExists).to.exist;
          });
      });
    cy.visit("http://localhost:5173/watchlater");
    cy.contains("My watch list");
    cy.get("[data-test-selection-user='user-selection']").should("not.exist");
    // Verification both arrays Localstorage and  Movie's Container children rendered have same length
    cy.get("[data-test-user-movies='movies-user']").then(($el) => {
      const children = $el.children();
      const movieCards = Array.from(children).filter((child) =>
        child.classList.contains("MuiCard-root")
      );
      expect(movieCards.length).to.equal(2);
      cy.window()
        .its("localStorage.userWatchLater")
        .then((storedArrayWatchLater) => {
          expect(JSON.parse(storedArrayWatchLater).length).to.equal(
            movieCards.length
          );
          // Verification both arrays Localstorage and Children rendered have same content of Movie titles
          const watchLaterMoviesLocal = JSON.parse(storedArrayWatchLater).map(
            (movie) => movie.title
          );
          const watchLaterMoviesInPage = [];
          movieCards.forEach((card) => {
            cy.wrap(card)
              .find("[data-test-movie-card-title]")
              .invoke("text")
              .then((cardTitle) => {
                watchLaterMoviesInPage.push(cardTitle);
              });
          });
          cy.wrap(watchLaterMoviesInPage).should(
            "deep.equal",
            watchLaterMoviesLocal
          );
        });
    });
  });
});
