import * as fs from "fs/promises"
import { JSDOM } from "jsdom"
import { before, it } from "mocha"
import { expect } from "expect"
import { fileURLToPath } from "url"
import { getRoles, fireEvent } from "@testing-library/dom"
import { head } from "ramda"

/** @type {JSDOM} */
let dom

before(async () => {
  const userscript = await fs.readFile(
    fileURLToPath(await import.meta.resolve("../lexic.js"))
  )
  dom = new JSDOM(`
    <body>
      <script>
        ${userscript}
        document.addEventListener("keydown", ({ code }) => {
          document.body.appendChild(document.createElement("hr"))
        })
      </script>
      <article>
        <h1>Blep</h1>
        <p>Some text!</p>
      </article>
    </body>`,
    { runScripts: "dangerously" }
  )
})

it("updates the element", async () => {
  const { window } = dom
  const { document } = window

  let article = head(getRoles(document.body).article)
  article.innerHTML //?

  await fireEvent(
    document,
    new window.KeyboardEvent("keydown", {
      bubbles: true,
      ctrlKey: true,
      code: "Semicolon",
    })
  )

  article = head(getRoles(document.body).article)
  article.innerHTML //?
})
