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
  });
  it("adds a movie to favorites when clicked for the first time", () => {
    cy.get("[data-test-query-search='movie-card-search']").first().click();
    cy.get("[data-test-add-fav-btn='fav-btn']").should(
      "contain.text",
      "Add to favorites"
    );
    cy.get("[data-test-add-fav-btn='fav-btn']").click();
    cy.get("[data-test-movie-detail-title='detailTitle']")
      .invoke("text")
      .then((text) => {
        cy.window().its("localStorage.userFavorites").should("contain", text);
      });
    cy.get(".success-add-toast-test").should("be.visible");
    cy.get(".success-add-toast-test").contains(
      "Successfully added to favorites"
    );
  });

  it("removes a movie from favorites when clicked for the second time", () => {
    cy.get("[data-test-query-search='movie-card-search']").first().click();
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
          .should("not.contain", text);
      });
    cy.get(".removeFav-toast-test").should("be.visible");
    cy.get(".removeFav-toast-test").contains("Removed from favorites");
  });
});

describe("Handle favorites function on movie card", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });
  it("adds a movie to favorites when clicked for the first time", () => {
    cy.get("[data-test-star-fav=0]").first().click();
    cy.get("[data-test-star-card-title=0]")
      .invoke("text")
      .then((text) => {
        cy.window().its("localStorage.userFavorites").should("contain", text);
      });
    cy.get(".success-add-toast-test").should("be.visible");
    cy.get(".success-add-toast-test").contains(
      "Successfully added to favorites"
    );
  });

  it("removes a movie from favorites when clicked for the second time", () => {
    cy.get("[data-test-star-fav=0]").first().click();
    cy.get("[data-test-star-fav=0]").first().should("be.visible").click();
    cy.get("[data-test-star-card-title=0]")
      .invoke("text")
      .then((text) => {
        cy.window()
          .its("localStorage.userFavorites")
          .should("not.contain", text);
      });
    cy.get(".removeFav-toast-test").should("be.visible");
    cy.get(".removeFav-toast-test").contains("Removed from favorites");
  });

  it("should render the same content as stored in localStorage", () => {
    cy.get("[data-test-star-fav=0]").first().click();
    cy.get("[data-test-star-fav=1]").first().click();
    cy.get("[data-test-star-card-title=0]")
      .invoke("text")
      .then((text) => {
        cy.window().its("localStorage.userFavorites").should("contain", text);
      });
    cy.get("[data-test-star-card-title=1]")
      .invoke("text")
      .then((text) => {
        cy.window().its("localStorage.userFavorites").should("contain", text);
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
        .then((favorites) => {
          expect(JSON.parse(favorites).length).to.equal(movieCards.length);
          // Verification both arrays Localstorage and Children rendered have some content with Movie titles
          const favMoviesLocal = JSON.parse(favorites).map(
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
