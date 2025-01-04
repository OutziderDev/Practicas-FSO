const { test, expect,describe } = require('@playwright/test')

describe('Note app', () => { 

  test('front page can be opened', async ({ page }) => {
    await page.goto('http://localhost:5173/')

    const locator = await page.getByText('Registro de Notas:')
    await expect(locator).toBeVisible()
    await expect(page.getByText('HTML is easy')).toBeVisible()
  })

})  