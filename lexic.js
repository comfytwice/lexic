// ==UserScript==
// @name        lexic
// @author      twice 🐝
// @namespace   https://github.com/comfytwice/lexic
// @match       *://*/*
// ==/UserScript==

const TAG = "__lexic_emphasis"

const TAGGED_FRACTION = 3 / 4
const ROUNDING_FN = Math.floor

/**
 * The number of characters to emphasise for a given length input word.
 * @param {number} length
 */
function k_emphasise(length) {
  return length <= 3
    ? length - 1
    : ROUNDING_FN(length * TAGGED_FRACTION)
}

/**
 * Add an emphasis tag to the given string (expected to correspond to a word).
 * @param {string} word
 */
function emphasise(word) {
  const k = k_emphasise(word.length)
  return `<span class="${TAG}">${word.slice(0, k)}</span>${word.slice(k)}`
}

const style = document.createElement("style")
document.head.appendChild(style)
style.type = "text/css"
style.appendChild(document.createTextNode(`
  .${TAG} { font-weight: bold; }
`))

function applyToDocument() {
  document.querySelectorAll("p, ol, ul, span").forEach(node => {
    // TODO ignore if a child of certain nodes: e.g. time, code, nav, etc.
    node.innerHTML = node.innerHTML.replaceAll(
      /(?<!<[^>]*)\w+/g, // ignore html tags themselves
      word => emphasise(word)
    )
  })
}

document.addEventListener("keydown", function ({ ctrlKey, which }) {
  if (ctrlKey && which === 192) {
    applyToDocument()
  }
})
