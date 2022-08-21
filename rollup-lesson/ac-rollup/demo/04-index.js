const MagicString = require('magic-string')
const transformedCode = new MagicString.Bundle()

transformedCode.addSource({
  content: 'Hello',
  separator: '\n'
})
transformedCode.addSource({
  content: 'World',
  separator: '\n'
})

console.log(transformedCode.toString());