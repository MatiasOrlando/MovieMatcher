export function accessMovieDetail(button, selector, detailTitleSelector) {
  cy.get(selector).invoke("text").as("MovieTitle");
  cy.get(button).first().click();
  cy.get(detailTitleSelector)
    .should("exist")
    .invoke("text")
    .then((text) => {
      cy.get("@MovieTitle").then((movieTitle) => {
        expect(text).to.contain(movieTitle);
      });
    });
  cy.get("[data-test-watch-btn='watch-btn']")
    .should("exist")
    .should("be.visible");
  cy.get("[data-test-add-fav-btn='fav-btn']")
    .should("exist")
    .should("be.visible");
  cy.get("[data-test-movie-detail-img='movie-image']")
    .should("exist")
    .should("be.visible");
}
