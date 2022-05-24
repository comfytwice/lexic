export const TAG = "__lexic_emphasis"

const fraction = 3 / 4
const round = Math.floor

/**
 * The number of characters to emphasise for the given length input string.
 * @param {number} len
 */
function n_emphasise(len) {
  return len <= 3
    ? len - 1
    : round(len * fraction)
}

/**
 * Add an emphasis tag to the given string (expected to correspond to a word).
 * @param {string} str
 */
export function emphasise(str) {
  const n = n_emphasise(str.length)
  return `<span class="${TAG}">${str.slice(0, n)}</span>${str.slice(n)}`
}
