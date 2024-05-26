describe('SW App', () => {
  it('Visits the initial project page', () => {
    cy.visit('/');
    cy.contains('Data is loading...')
  });

  it('should have header title', () => {
    cy.visit('/');

    cy.wait(3000);

    cy.get('.sw-header')
      .children('h1')
      .should('have.text', 'STAR WARS CARD GAME');
  });

  it('should change card type', () => {
    cy.visit('/');

    cy.wait(3000);

    cy.get('mat-select').click();

    cy.get('mat-option').contains('Starships').click();

    cy.get('mat-select')
      .should('have.attr', 'ng-reflect-value', 'Starships');
  });

  it('should show cards', () => {
    cy.visit('/');

    cy.wait(3000);

    cy.get('button').click();

    cy.get('sw-card').should('be.visible');
  });
})
