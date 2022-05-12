//Documentação de um projeto
  //Uma breve descrição do que trata o projeto
  //Pré-requisitos ('nodejs. npm, git, vscode, etc.')
  //Passos para intalação das dependências
  //Passos para rodar os testes
  //Qualquer outra informação que for pertinente
  
    describe('Central de Atendimento ao Cliente TAT',function(){
        beforeEach(function(){
            cy.visit('./src/index.html')
        })
    it('verificar o titulo da aplicação', function(){
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })
    //Preenchendo os campos do formulário
    it('preenche os campos obrigatórios e envia o formulário',function(){
        cy.get('#firstName').type('Victor')
        cy.get('#lastName').type('Daniel')
        cy.get('#email').type('victordaniel_147@hotmail.com')
        cy.get('#open-text-area').type('Teste')
        cy.get('button[type="submit"]').click()
        cy.get('.success').should('be.visible') //passando o "success" como um parametro para retornar erro
    })
    //Preenchendo os campos com o delay caso queira
    it('preenchendo os campos com o delay',function(){
        //Declarando a variavel longText
        const longText = 'Valor Valor' //Passando ela
        cy.get('#open-text-area').type(longText,{delay: 0})
    })
    //Preenchendo os campos com a formatação errada
    it('exibe mensagem de erro ao submeter o formulário com o email com formatação errada',function(){
        cy.get('#firstName').type('Victor')
        cy.get('#lastName').type('Daniel')
        cy.get('#email').type('victordaniel_147@hotmail,com')
        cy.get('#open-text-area').type('Teste')
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible') //passando o "error" como um parametro para retornar erro
    })
    //Preenche o campo numérico com letra
    it('campo telefone continua vazio quando preenchido com valor não-numérico',function(){
        cy.get('#phone')
        .type('abc').should('have.value', '')
    })
    //Não preenche o campo numérico obrigatório
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas n é preenchido', function(){
        cy.get('#firstName').type('Victor')
        cy.get('#lastName').type('Daniel')
        cy.get('#email').type('victordaniel_147@hotmail.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('Teste')
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })
    //Preenche os campos e apaga
    it('preenche e limpa os campos', function(){
        cy.get('#firstName').type('Victor')
        .should('have.value', 'Victor')
        .clear()
        .should('have.value', '')

        cy.get('#lastName').type('Daniel')
        .should('have.value', 'Daniel')
        .clear()
        .should('have.value', '')

        cy.get('#email').type('victordaniel_147@hotmail.com')
        .should('have.value', 'victordaniel_147@hotmail.com')
        .clear()
        .should('have.value', '')

        cy.get('#phone').type('123456')
        .should('have.value', '123456')
        .clear()
        .should('have.value', '')
    })
    //Exibe a mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios
    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })
    //Preenche os campos com o comando customizado (para criar um comando customizado é só ir até a pasta /support/commands.js)
    it('envia o formulário com sucesso usando um comando customizado', function(){
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
    })
    it('seleciona um produto por seu texto (youtube)',function(){
        cy.get('#product')
        .select('YouTube')
        .should('have.value', 'youtube')
    })
    it('seleciona um produto por seu valor (mentoria)',function(){
        cy.get('#product')
        .select('mentoria')
        .should('have.value', 'mentoria')
    })
    it('seleciona um produto por seu indice (blog)',function(){
        cy.get('#product')
        .select(1)
        .should('have.value', 'blog')
    })
    it('marca o tipo de atendimento "Feedback"', function(){
        cy.get('input[type="radio"][value="feedback"]')
        .check()
        .should('have.value', 'feedback')
    })


    it('marca cada tipo de atendimento',function(){
        cy.get('input[type="radio"]')
        .should('have.length', 3)
        .each(function($radio){
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
        })
    })
    it('marca ambos checkboxes, depois demarca o ultimo', function(){
        cy.get('input[type="checkbox"]')
        .check()
        .should('be.checked')
        .last() 
        .uncheck()
        .should('not.be.checked')
    })
    it('seleciona um arquivo de pasta fixtures', function(){
        cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json')
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })
    it('seleciona um arquivo simulando um drag-and-drop', function(){
        cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop'})
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })
    it('seleciona um arquivo utilizando uma fixture para qual foi dada', function(){
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
        .selectFile('@sampleFile')
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })
    //Abrindo em uma nova Aba
    it('verifica que a politica de privacidade abre em outra aba sem a necessidade de um click', function(){
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })
    //Invoke para remover o target blank e abrir o link na mesma aba
    it('acessa a pagina da politica de privacidade removendo o target', function(){
        cy.get('#privacy a')
        .invoke('removeAttr', 'target')
        .click()
        
        //Valida um Texto
        cy.contains('Talking About Testing').should('be.visible')
    })

})
