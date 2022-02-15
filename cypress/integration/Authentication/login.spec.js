describe('Login', () => {

    beforeEach(() => {
        // runs before each test in the block
        cy.visit('/login')
    })

    it('will redirect to login page when visitors accessing home', () => {
        cy.visit('/dashboard')

        cy.url().should('contains', '/login')
    })

    it('should not let you login without filling all required fields', () => {

        cy.get("button[type='submit']").contains("Log in").click();
        cy.get("#email").should('be.focused');
        cy.get("#email").type("test@mail.com");

        cy.get("button[type='submit']").contains("Log in").click();
        cy.get("#password").should('be.focused');
        cy.get("#password").type("password");
    })

    it('should not let you login without valid credentials', () => {
        cy.get("#email").type("test@mail.com");
        cy.get("#password").type("password1");

        cy.get("button[type='submit']").contains("Log in").click();

        cy.contains("These credentials do not match our records.");
    })

    it('should let you login', () => {
        cy.get("#email").type("test@mail.com");
        cy.get("#password").type("password");

        cy.get("button[type='submit']").contains("Log in").click();

        cy.contains("You're logged in!");

        //assert you were redirected
        cy.url().should('include', '/dashboard');
    })

})
