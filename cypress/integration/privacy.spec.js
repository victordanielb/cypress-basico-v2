
it('entra no privacy direto e valida o texto',function(){
    cy.visit('./src/privacy.html')
    cy.contains('Talking About Testing').should('be.visible')
})
