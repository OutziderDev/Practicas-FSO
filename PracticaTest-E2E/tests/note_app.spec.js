const { test, expect,describe,beforeEach } = require('@playwright/test')

describe('Note app', () => { 

  beforeEach(async ({page}) => {
    await page.goto('http://localhost:5173/')
  })

  test('front page can be opened', async ({ page }) => {
    const locator = await page.getByText('Registro de Notas:')
    await expect(locator).toBeVisible()

    const note = page.getByText('HTML is easy')
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
    })
  })

})  