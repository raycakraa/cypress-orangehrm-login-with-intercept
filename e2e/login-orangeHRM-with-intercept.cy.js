    describe('Login Page OrangeHRM', () => {
        beforeEach(() => {
            cy.visit('https://opensource-demo.orangehrmlive.com/')
            cy.wait(1000) 
        })

        it('should show username input field', () => {
            cy.get('input[name="username"]', { timeout: 5000 }).should('be.visible')
        })

        it('should show password input field', () => {
            cy.get('input[name="password"]', { timeout: 5000 }).should('be.visible')
        })

        it('should show login button', () => {
            cy.get('button[type="submit"]').should('be.visible')
        })

        it('should display the OrangeHRM logo', () => {
            cy.get('.orangehrm-login-branding > img').should('be.visible')
        })

        it('should show Forgot Password link', () => {
        cy.get('.orangehrm-login-forgot-header')
            .should('be.visible')
            .and('contain.text', 'Forgot your password?')
        })

        it('should show footer copyright', () => {
        cy.get('.orangehrm-copyright')
            .should('be.visible')
            .and('contain.text', 'OrangeHRM, Inc.')
        })

        it('should login successfully with intercept on dashboard data', () => {
        cy.intercept('GET', '/web/index.php/api/v2/dashboard/employees/time-at-work*').as('dashboardRequest');

        cy.get('input[name="username"]').type('Admin');
        cy.get('input[name="password"]').type('admin123');
        cy.get('button[type="submit"]').click();

        cy.wait('@dashboardRequest').its('response.statusCode').should('eq', 200);

        cy.url({ timeout: 10000 }).should('include', '/dashboard');
        });

    })
