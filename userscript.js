// ==UserScript==
// @name        lexic
// @author      twice 🐝
// @namespace   https://github.com/comfytwice/lexic
// @match       *://*/*
// ==/UserScript==

const EMPHASIS = "__lexic_emphasis"
const VISITED = "__lexic_visited"
const ACIVATION_KEY = "Semicolon"
const EMPHASISED_ELEMENTS = "p, ol, ul, span"
const EMPHASISED_FRACTION = 3 / 4
const ROUNDING_FN = Math.floor

/**
 * The number of characters to emphasise for a given length input word.
 * @param {number} length
 */
function k_emphasise(length) {
  return length <= 3
    ? length - 1
    : ROUNDING_FN(length * EMPHASISED_FRACTION)
}

/**
 * Add an emphasis tag to the given string (expected to correspond to a word).
 * @param {string} word
 */
function emphasise(word) {
  const k = k_emphasise(word.length)
  return `<span class="${EMPHASIS}">${word.slice(0, k)}</span>${word.slice(k)}`
}

const style = document.createElement("style")
document.head.appendChild(style)
style.type = "text/css"

let applied = false

function applyToDocument() {
  if (applied) return

  style.appendChild(document.createTextNode(`
    .${EMPHASIS} { color: rgba(0,0,0,1); }
    ${EMPHASISED_ELEMENTS} { color: rgba(0,0,0,0.5); }
    a { color: rgba(0,0,0,1); text-decoration: underline; }
  `))

  document.querySelectorAll(EMPHASISED_ELEMENTS).forEach(node => {
    if (node.classList.contains(VISITED)) return

    // TODO ignore if a child of certain nodes: e.g. time, code, nav, etc.
    node.innerHTML = node.innerHTML.replaceAll(
      /(?<!<[^>]*)\w+/g, // ignore html tags themselves
      word => emphasise(word)
    )

    node.classList.add(VISITED)
  })

  applied = true
}

document.addEventListener("keydown", ({ ctrlKey, code }) => {
  if (ctrlKey && code === ACIVATION_KEY) {
    applyToDocument()
  }
})
