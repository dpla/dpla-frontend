/**
 * Patches Node.prototype.removeChild and insertBefore to handle DOM mutations
 * from Google Translate gracefully instead of crashing React.
 *
 * Google Translate wraps text nodes in <font> elements, which breaks React's
 * virtual DOM reconciliation (React issue #11538). This patch makes the
 * affected DOM methods fail silently when called with nodes that have been
 * reparented by the translator.
 *
 * Must be called once before React renders (e.g. at module scope in _app.js).
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
