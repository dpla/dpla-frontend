/**
 * Google Translate wraps text nodes in <font>, so React's removeChild and
 * insertBefore calls throw and it loops until the stack overflows (React
 * #11538). Make those two calls no-ops instead.
 *
 * Do not guard appendChild or replaceChild. React never calls replaceChild,
 * and appendChild moves nodes; guarding it broke OpenSeadragon full page.
 *
 * Call once before React renders (module scope in _app.js).
 */
export function patchDOMForGoogleTranslate() {
  if (typeof Node === "undefined" || !Node.prototype) return;
  if (Node.prototype.__patchedForGoogleTranslate) return;
  Node.prototype.__patchedForGoogleTranslate = true;

  const originalRemoveChild = Node.prototype.removeChild;
  Node.prototype.removeChild = function (child) {
    if (child.parentNode !== this) {
      return child;
    }
    return originalRemoveChild.call(this, child);
  };

  const originalInsertBefore = Node.prototype.insertBefore;
  Node.prototype.insertBefore = function (newNode, referenceNode) {
    if (referenceNode && referenceNode.parentNode !== this) {
      return newNode;
    }
    return originalInsertBefore.call(this, newNode, referenceNode);
  };
}
