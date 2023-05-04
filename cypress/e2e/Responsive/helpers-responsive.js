export function checkAccesibilityPageHomeInViewPort(width, height) {
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

export function checkAccesibilityMovieDetailInViewPort(width, height) {
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

export function checkAccesibilityPageFavoritesInViewPort(width, height) {
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

export function checkAccesibilityPageWatchLaterInViewPort(width, height) {
  cy.viewport(width, height);
  cy.get("[data-test-watch-later=0]").first().click();
  cy.visit("http://localhost:5173/watchlater");
  cy.contains("My watch list");
  cy.get("[data-test-movie-card-title='moviecardtitle']")
    .should("exist")
    .should("be.visible");
  cy.get("[data-test='card-img']").should("exist").should("be.visible");
  cy.get("[data-testid='DeleteForeverOutlinedIcon']")
    .should("exist")
    .should("be.visible");
}
