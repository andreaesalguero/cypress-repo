context('QA initiative', () =>{
const user='#nickname'
const verifyUser='#main-btn'
const result='#result > p:nth-child(1)'
const logo='#result > p:nth-child(5) > img'
const homepage='#result > p:nth-child(8) > a > img'
const country='MLA'
const nickname='fravega'

it("should verify the UI", () =>{
    cy.visit('https://chcibelli.github.io/meli-age/')
    cy.get('select').select('MLA').should('have.value', 'MLA')
    cy.get(user).type('fravega')
    cy.get(verifyUser).click()
    cy.get(result).should('contain', 'Te registraste el 31/07/2013')
    cy.get(logo).should('be.visible')
    cy.get(homepage).should('be.visible')
})

it("should verify the API", () =>{
    cy.request({
        method: 'GET',
        url:`api.mercadolibre.com/sites/MLA/search?nickname=fravega`
    }).then((response) => {
        expect(response).to.have.property('status',200)
    })
})

it("should verify the API with parameters", () =>{
    cy.request({
        method: 'GET',
        url:`api.mercadolibre.com/sites/${country}/search?nickname=${nickname}`
    }).then((response) => {
        expect(response).to.have.property('status',200)
    })
})
})