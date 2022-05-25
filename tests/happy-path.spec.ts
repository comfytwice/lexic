import * as fs from "fs/promises"
import { expect, test } from "@playwright/test"

test.beforeEach(async ({ page }) => {
  const html = await fs.readFile("tests/happy-path.html", "utf8")
  const userscript = await fs.readFile("userscript.js", "utf8")
  await page.setContent(html)
  await page.evaluate(userscript)
})

test(`the test page has the expected title`, async ({ page }) => {
  const title = await page.evaluate(() => document.title)
  expect(title).toBe("lexic")
})

test(`the test page has the expected content`, async ({ page }) => {
  await page.keyboard.press("Control+Semicolon")
  console.log(await page.content())
})
