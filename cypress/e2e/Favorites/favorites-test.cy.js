describe("Access to favorites section", () => {
  it("Visits the favorites section and validates the URL", () => {
    cy.visit("http://localhost:5173/favorites");
    cy.url().should("include", "favorites");
    cy.url().should("not.include", "watchlater");
    cy.title().should("contain", "Movie Matcher");
  });
});

describe("Handle favorites function on detail container", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
    cy.get("[data-test-movie-card='movie-card-15']").first().click();
  });
  it("Adds a movie to favorites when clicked for the first time", () => {
    cy.get("[data-test-add-fav-btn='fav-btn']").should(
      "contain.text",
      "Add to favorites"
    );
    cy.wait(100);
    cy.get("[data-test-add-fav-btn='fav-btn']").click();
    cy.get("[data-test-movie-detail-title='detailTitle']")
      .invoke("text")
      .then((text) => {
        cy.window()
          .its("localStorage.userFavorites")
          .then((storedArrayFavorites) => {
            const arrayFavorites = JSON.parse(storedArrayFavorites) || [];
            const movieExistsInLocal = arrayFavorites.find(
              (movie) => movie.title === text
            );
            cy.wait(100);
            expect(movieExistsInLocal).to.exist;
            expect(arrayFavorites.length).to.be.greaterThan(0);
            cy.get(".success-add-toast-test").should("be.visible");
            cy.get(".success-add-toast-test").contains(
              "Successfully added to favorites"
            );
          });
      });
  });

  it("Removes a movie from favorites when clicked for the second time", () => {
    cy.wait(100);
    cy.get("[data-test-add-fav-btn='fav-btn']").click();
    cy.get("[data-test-add-fav-btn='fav-btn']").should(
      "contain.text",
      "Remove from favorites"
    );
    cy.get("[data-test-add-fav-btn='fav-btn']").click();
    cy.get("[data-test-movie-detail-title='detailTitle']")
      .invoke("text")
      .then((text) => {
        cy.window()
          .its("localStorage.userFavorites")
          .then((storedArrayFavorites) => {
            const arrayFavorites = JSON.parse(storedArrayFavorites);
            const movieInLocal = arrayFavorites.find(
              (movie) => movie.title === text
            );
            expect(movieInLocal).to.be.undefined;
            expect(arrayFavorites.length).to.be.equal(0);
            cy.wrap(movieInLocal).should("not.exist");
            cy.get(".removeFav-toast-test").should("be.visible");
            cy.get(".removeFav-toast-test").contains("Removed from favorites");
          });
      });
  });
});

describe("Handle favorites function on movie card", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });
  it("Adds a movie to favorites when clicked for the first time and changes Star icon", () => {
    cy.get("[data-test='empty-star-0']");
    cy.get("[data-test-star-fav=0]").first().click();
    cy.get("[data-test='full-star-0']").should("exist");
    cy.get("[data-test='empty-star-0']").should("not.exist");
    cy.get("[data-test-card-title=0]")
      .invoke("text")
      .then((text) => {
        cy.window()
          .its("localStorage.userFavorites")
          .then((storedArrayFavorites) => {
            const arrayFavorites = JSON.parse(storedArrayFavorites) || [];
            const movieExists = arrayFavorites.find(
              (movie) => movie.title === text
            );
            cy.wait(100);
            expect(movieExists).to.exist;
            expect(arrayFavorites.length).to.be.greaterThan(0);
            cy.get(".success-add-toast-test").should("be.visible");
            cy.get(".success-add-toast-test").contains(
              "Successfully added to favorites"
            );
          });
      });
  });

  it("Removes a movie from favorites when clicked for the second time and changes Star icon", () => {
    cy.get("[data-test-star-fav=0]").first().click();
    cy.get("[data-test='full-star-0']");
    cy.get("[data-test-star-fav=0]").first().should("be.visible").click();
    cy.get("[data-test='empty-star-0']").should("exist");
    cy.get("[data-test='full-star-0']").should("not.exist");
    cy.get("[data-test-card-title=0]")
      .invoke("text")
      .then((text) => {
        cy.window()
          .its("localStorage.userFavorites")
          .then((storedArrayFavorites) => {
            const arrayFavorites = JSON.parse(storedArrayFavorites);
            const movieInLocal = arrayFavorites.find(
              (movie) => movie.title === text
            );
            expect(movieInLocal).to.be.undefined;
            expect(arrayFavorites.length).to.be.equal(0);
            cy.wrap(movieInLocal).should("not.exist");
            cy.get(".removeFav-toast-test").should("be.visible");
            cy.get(".removeFav-toast-test").contains("Removed from favorites");
          });
      });
  });
});

describe("Displays user's favorites in Favorites page", () => {
  it("Should render the same content as stored in localStorage", () => {
    cy.visit("http://localhost:5173/favorites");
    cy.get("[data-test-selection-user='user-selection']").contains(
      "No favorites added yet.."
    );
    cy.visit("http://localhost:5173/");
    cy.get("[data-test-star-fav=2]").first().click();
    cy.get("[data-test-star-fav=3]").first().click();
    cy.get("[data-test-card-title=2]")
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
    cy.get("[data-test-card-title=3]")
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
    cy.get("[data-test-selection-user='user-selection']").should("not.exist");
    // Verification both arrays Localstorage and  Movie's Container children rendered have same length
    cy.get("[data-test-user-movies='movies-user']").then(($el) => {
      const children = $el.children();
      const movieCards = Array.from(children).filter((child) =>
        child.classList.contains("MuiCard-root")
      );
      expect(movieCards.length).to.equal(2);
      cy.window()
        .its("localStorage.userFavorites")
        .then((storedArrayfavorites) => {
          expect(JSON.parse(storedArrayfavorites).length).to.equal(
            movieCards.length
          );
          // Verification both arrays Localstorage and Children rendered have same content of Movie titles
          const favMoviesLocal = JSON.parse(storedArrayfavorites).map(
            (movie) => movie.title
          );
          const favMoviesInPage = [];
          movieCards.forEach((card) => {
            cy.wrap(card)
              .find("[data-test-movie-card-title]")
              .invoke("text")
              .then((cardTitle) => {
                favMoviesInPage.push(cardTitle);
              });
          });
          cy.wrap(favMoviesInPage).should("deep.equal", favMoviesLocal);
        });
    });
  });
});
