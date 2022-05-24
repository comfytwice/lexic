const TAG = "__lexic_emphasis"

const BASE_WEIGHT = 400
const TAGGED_WEIGHT = 600
const TAGGED_FRACTION = 3 / 4
const ROUNDING_FN = Math.floor

/**
 * The number of characters to emphasise for the given length input string.
 * @param {number} wordlen
 */
function k_emphasise(wordlen) {
  return wordlen <= 3
    ? wordlen - 1
    : ROUNDING_FN(wordlen * TAGGED_FRACTION)
}

/**
 * Add an emphasis tag to the given string (expected to correspond to a word).
 * @param {string} word
 */
function emphasise(word) {
  const k = k_emphasise(word.length)
  return `<span class="${TAG}">${word.slice(0, k)}</span>${word.slice(k)}`
}

document.querySelectorAll("p, ol, ul").forEach(node => {
  // TODO ignore if a child of certain nodes: e.g. time, code, nav, etc.
  node.innerHTML = node.innerHTML.replaceAll(
    /(?<!<[^>]*)\w+/g, // ignore html tags themselves
    word => emphasise(word)
  )
})

const style = document.createElement("style")
document.head.appendChild(style)
style.type = "text/css"

// TODO detect and use the existing font weight
style.appendChild(document.createTextNode(`
  .${TAG} { font-weight: ${TAGGED_WEIGHT}; }
  p { font-weight: ${BASE_WEIGHT}; }
`))
