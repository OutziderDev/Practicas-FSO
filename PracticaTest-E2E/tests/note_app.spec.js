const { test, expect,describe,beforeEach, request } = require('@playwright/test')

describe('Note app', () => { 

  beforeEach(async ({page, request}) => {
    await request.post ('http://localhost:4000/api/testing/reset')
    await request.post ('http://localhost:4000/api/users',{
      data: {
        name: 'administrador',
        username: 'admin',
        password: '123'
      }
    })
    await page.goto('http://localhost:5173/')
  })

  test('front page can be opened', async ({ page }) => {
    const locator = await page.getByText('Registro de Notas:')
    await expect(locator).toBeVisible()

    const note = page.getByRole('heading', { name: 'Notas:', exact: true })
    await expect(note).toBeVisible()
  })

  test('login form can be oppened', async ({page}) => { 
    await page.getByRole('button', { name: 'log in' }).click()
    await page.getByRole('button', { name: 'log in' }).click()
    await page.getByTestId('username').fill('admin')
    await page.getByTestId('password').fill('123')
    await page.getByRole('button', {name: 'login'}).click()

    const title = page.getByText('Add Nota:')
    await expect(title).toBeVisible()
  })

  describe('when logged in', () => { 

    beforeEach( async ({page}) => {
      await page.getByRole('button', { name: 'log in' }).click()
      await page.getByRole('button', { name: 'log in' }).click()
      await page.getByTestId('username').fill('admin')
      await page.getByTestId('password').fill('123')
      await page.getByRole('button', {name: 'login'}).click()
    })

    test('a new note can be created', async ({page}) => { 
      await page.getByTestId('note').fill('note with playwright')
      await page.getByTestId('guardar').click()
      expect(page.getByText('note with playwright')).toBeVisible

      await page.getByRole('button', { name: 'make no important' }).click()
      await expect(page.getByText('make important')).toBeVisible()
    })
  })

  describe('login fail', () => { 

    test('login fails', async ({page}) => { 

      
      await page.getByRole('button', { name: 'log in' }).click()
      await page.getByRole('button', { name: 'log in' }).click()
      await page.getByTestId('username').fill('admin')
      await page.getByTestId('password').fill('1231')
      await page.getByRole('button', {name: 'login'}).click()

      const errorDiv = await page.locator('.notification')
      await expect(errorDiv).toContainText('Wrong credentials')
      await expect(errorDiv).toHaveCSS('color','rgb(255, 0, 0)')
      //await expect(page.locator('.notification')).toContainText('Wrong credentials');
      const title = page.getByText('Add Nota:')
      await expect(title).not.toBeVisible()
     })
  })
  
  

    
  

})  