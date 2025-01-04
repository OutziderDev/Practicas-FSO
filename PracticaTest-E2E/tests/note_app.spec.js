const { test, expect,describe } = require('@playwright/test')

describe('Note app', () => { 

  test('front page can be opened', async ({ page }) => {
    await page.goto('http://localhost:5173/')

    const locator = await page.getByText('Registro de Notas:')
    await expect(locator).toBeVisible()

    const note = page.getByText('HTML is easy')
    await expect(note).toBeVisible()
  })

  test('login form can be oppened', async ({page}) => { 
    await page.goto('http://localhost:5173/')

    await page.getByRole('button', { name: 'log in' }).click()
    await page.getByRole('button', { name: 'log in' }).click()
    await page.getByRole('textbox').first().fill('admin')
    await page.getByRole('textbox').last().fill('123')
    await page.getByRole('button', {name: 'login'}).click()

    const title = page.getByText('Add Nota:')
    await expect(title).toBeVisible()
  })
})  