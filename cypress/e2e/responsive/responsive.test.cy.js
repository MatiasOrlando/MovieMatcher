function checkAccesibilityPageHomeInViewPort(width, height) {
  cy.viewport(width, height);
  cy.get("input").should("exist").should("be.visible");
  cy.get('[data-title-test="app-title"]');
  cy.get("#moviesContainer")
    .find(".MuiCard-root")
    .should("have.length", 20)
    .should("exist")
    .should("be.visible");
  cy.get("[data-test='empty-star-3']").should("exist").should("be.visible");
  cy.get("[data-test-watch-later=6]")
    .should("exist")
    .should("be.visible")
    .should("be.enabled");
  cy.get("[data-test-card-title=9]").should("exist").should("be.visible");
  cy.get("[data-test-card-release-date=13]")
    .should("exist")
    .should("be.visible");
}

function checkAccesibilityMovieDetailInViewPort(width, height) {
  cy.viewport(width, height);
  cy.get("[data-test-movie-card='movie-card-11']").first().click();
  cy.get("[data-test-movie-detail-title='detailTitle']")
    .should("exist")
    .should("be.visible");
  cy.get("[data-test-watch-btn='watch-btn']")
    .should("exist")
    .should("be.visible")
    .should("be.enabled");
  cy.get("[data-test-add-fav-btn='fav-btn']")
    .should("exist")
    .should("be.visible")
    .should("be.enabled");
  cy.get("[data-test-movie-detail-img='movie-image']")
    .should("exist")
    .should("be.visible");
  cy.get("[data-test-btn-goback='goback-btn']")
    .should("exist")
    .should("be.visible")
    .should("be.enabled");
}

function checkAccesibilityPageFavoritesInViewPort(width, height) {
  cy.viewport(width, height);
  cy.get("[data-test='empty-star-0']").should("exist").should("be.visible");
  cy.get("[data-test-star-fav=0]").first().click();
  cy.get("[data-test='full-star-0']").should("exist").should("be.visible");
  cy.visit("http://localhost:5173/favorites");
  cy.contains("My favorites list");
  cy.get("[data-test-movie-card-title='moviecardtitle']")
    .should("exist")
    .should("be.visible");
  cy.get("[data-test='card-img']").should("exist").should("be.visible");
}

function checkAccesibilityPageWatchLaterInViewPort(width, height) {
  cy.viewport(width, height);
  cy.get("[data-test-watch-later=0]").first().click();
  cy.visit("http://localhost:5173/watchlater");
  cy.contains("My watch list");
  cy.get("[data-test-movie-card-title='moviecardtitle']")
    .should("exist")
    .should("be.visible");
  cy.get("[data-test='card-img']").should("exist").should("be.visible");
}

describe("Access to App Home in all devices", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
    cy.title().should("contain", "Movie Matcher");
  });
  it("Visits the app and verifies the initial page content is accessible in mobile devices", () => {
    checkAccesibilityPageHomeInViewPort(375, 812);
  });
  it("Visits the app and verifies the initial page content is accessible in tablets", () => {
    checkAccesibilityPageHomeInViewPort(1024, 768);
  });

  it("Visits the app and verifies the initial page content is accessible in desktop", () => {
    checkAccesibilityPageHomeInViewPort(1366, 768);
  });
});

describe("Access to Movie detail in all devices", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
    cy.title().should("contain", "Movie Matcher");
  });
  it("Visits the app and verifies the detail movie page content is accessible in mobile devices", () => {
    checkAccesibilityMovieDetailInViewPort(375, 812);
  });
  it("Visits the app and verifies the detail movie page content is accessible in tablets", () => {
    checkAccesibilityMovieDetailInViewPort(1024, 768);
  });
  it("Visits the app and verifies the initial page content is accessible in desktop", () => {
    checkAccesibilityMovieDetailInViewPort(1366, 768);
  });
});

describe("Access to Favorite section in all devices", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
    cy.title().should("contain", "Movie Matcher");
  });
  it("Visits the Favorites section and verifies the page content is accessible in mobile devices", () => {
    checkAccesibilityPageFavoritesInViewPort(375, 812);
  });
  it("Visits the Favorites section and verifies the page content is accessible in tablet devices", () => {
    checkAccesibilityPageFavoritesInViewPort(1024, 768);
  });
  it("Visits the app and verifies the initial page content is accessible in desktop", () => {
    checkAccesibilityPageFavoritesInViewPort(1366, 768);
  });
});

describe("Access to Watch later section in all devices", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
    cy.title().should("contain", "Movie Matcher");
  });
  it("Visits the Favorites section and verifies the page content is accessible in mobile devices", () => {
    checkAccesibilityPageWatchLaterInViewPort(375, 812);
  });
  it("Visits the Favorites section and verifies the page content is accessible in tablet devices", () => {
    checkAccesibilityPageWatchLaterInViewPort(1024, 768);
  });
  it("Visits the app and verifies the initial page content is accessible in desktop", () => {
    checkAccesibilityPageWatchLaterInViewPort(1366, 768);
  });
});
