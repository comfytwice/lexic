import { expect } from "expect"
import { it } from "mocha"
import "global-jsdom/register"

import { getByText } from "@testing-library/dom"

const name = "lexic"

const div = document.createElement("div")
div.innerHTML = `<p>${name}</p>`

document.body.appendChild(div)

it("renders and locates an element", async () => {
  const handle = getByText(document.body, name)
  expect(handle.textContent).toMatch(name)
})
