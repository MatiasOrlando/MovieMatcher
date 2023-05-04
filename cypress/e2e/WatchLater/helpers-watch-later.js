export function addWatchLaterInMovieCard(button, selector) {
  cy.visit("http://localhost:5173/");
  cy.get(button).click();
  cy.get(selector)
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
          cy.wait(200);
          expect(movieExists).to.exist;
          expect(arrayWatchLater.length).to.be.greaterThan(0);
        });
    });
}

export function handleErrorAddWatchList(button) {
  const initialLength = 1;
  cy.get(button).click();
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
}
