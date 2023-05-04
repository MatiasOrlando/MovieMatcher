import {
  checkAccesibilityMovieDetailInViewPort,
  checkAccesibilityPageFavoritesInViewPort,
  checkAccesibilityPageHomeInViewPort,
  checkAccesibilityPageWatchLaterInViewPort,
} from "./helpers-responsive";

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
