describe('Register', () => {

    beforeEach(() => {
        // runs before each test in the block
        cy.visit('/register')
    })

    it('should not let you register without filling all required fields', () => {

        cy.get("button[type='submit']").contains("Register").click();
        cy.get("#name").should('be.focused');
        cy.get("#name").type("Test user");

        cy.get("button[type='submit']").contains("Register").click();
        cy.get("#email").should('be.focused');
        cy.get("#email").type("test@mail.com");

        cy.get("button[type='submit']").contains("Register").click();
        cy.get("#password").should('be.focused');
        cy.get("#password").type("password");

        cy.get("button[type='submit']").contains("Register").click();
        cy.get("#password_confirmation").should('be.focused');
        cy.get("#password_confirmation").type("password");
    })

    it('should not let you register without if the password confirmation dont match with the password', () => {
        cy.get("#name").type("Test user");
        cy.get("#email").type("test@mail.com");
        cy.get("#password").type("password");
        cy.get("#password_confirmation").type("password1");

        cy.get("button[type='submit']").contains("Register").click();

        cy.contains("The password confirmation does not match.");
    })

    it('should not be able to let you register with an email that already is being used', () => {
        cy.get("#name").type("Test user");
        cy.get("#email").type("test@mail.com");
        cy.get("#password").type("password");
        cy.get("#password_confirmation").type("password");

        cy.get("button[type='submit']").contains("Register").click();

        cy.contains("The email has already been taken.");
    })

    it('should let you register', () => {
        cy.get("#name").type("Test user 2");
        cy.get("#email").type("test2@mail.com");
        cy.get("#password").type("password");
        cy.get("#password_confirmation").type("password");

        cy.get("button[type='submit']").contains("Register").click();

        cy.contains("You're logged in!");

        //assert you were redirected
        cy.url().should('include', '/dashboard');
    })

})