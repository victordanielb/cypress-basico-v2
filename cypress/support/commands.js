Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
        
        cy.get('#firstName').type('Victor')
        cy.get('#lastName').type('Daniel')
        cy.get('#email').type('victordaniel_147@hotmail.com')
        cy.get('#open-text-area').type('Teste')
        cy.get('button[type="submit"]').click()
        cy.get('.success').should('be.visible')
        
})