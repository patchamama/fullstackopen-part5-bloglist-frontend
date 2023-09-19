describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen',
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3002')
  })

  it('Login form is shown', function () {
    // cy.visit('http://localhost:3002')
    cy.contains('Log in to application')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      // cy.visit('http://localhost:3002')
      // cy.contains('log in').click()
      // cy.get('input:first').type('test')
      // cy.get('input:last').type('test')
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('Matti Luukkainen logged-in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.contains('Wrong credentials')

      cy.get('.error')
        .should('contain', 'Wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'Matti Luukkainen logged-in')
    })
  })

  describe.only('When logged in', function () {
    beforeEach(function () {
      cy.get('input:first').type('mluukkai')
      cy.get('input:last').type('salainen')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function () {
      cy.contains('new blog').click()
      cy.get('#title').type('title created by cypress')
      cy.get('#author').type('author created by cypress')
      cy.get('#url').type('url created by cypress')
      cy.get('#create').click()
      cy.contains('title created by cypress')

      cy.contains('view').click()

      cy.get('.like').click()
      cy.contains('likes 1')
    })
  })
})
