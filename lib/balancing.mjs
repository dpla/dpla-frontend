// stolen and modified from https://stackoverflow.com/questions/51822125/check-if-quotes-and-parentheses-are-balanced
// presumed to be public domain

export function isBalanced(expr) {
  const pairs = {
    "}": "{",
    "]": "[",
    ")": "(",
  };

  const stack = [];

  for (let i = 0; i < expr.length; ++i) {
    switch (expr.charAt(i)) {
      case "[":
      case "{":
      case "(":
        stack.push(expr.charAt(i));
        break;
      case "]":
      case "}":
      case ")":
        if (isStackEmpty(stack) || peek(stack) !== pairs[expr.charAt(i)])
          return false;
        stack.pop();
        break;
      case '"':
        if (isStackEmpty(stack) || peek(stack) !== expr.charAt(i)) {
          stack.push(expr.charAt(i));
        } else {
          stack.pop();
        }
    }
  }

  return isStackEmpty(stack);
}

function peek(s) {
  return s[s.length - 1];
}

function isStackEmpty(s) {
  return s.length === 0;
}
