/**
 * @fileoverview 项目中不能有 var
 * @author aicherish
 */
'use strict'

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: 'problem', // `problem`, `suggestion`, or `layout`
    docs: {
      description: '项目中不能有 var',
      recommended: false,
      url: null // URL to the documentation page for this rule
    },
    fixable: 'code', // Or `code` or `whitespace`
    schema: [], // Add a schema if the rule has options
    messages: {
      unexpected: '不能用 {{type}}'
    }
  },

  create(context) {
    // variables should be defined here

    //----------------------------------------------------------------------
    // Helpers
    //----------------------------------------------------------------------

    // any helper functions should go here or else delete this section

    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------

    const sourceCode = context.getSourceCode()

    return {
      // visitor functions for different types of nodes
      VariableDeclaration(node) {
        if (node.kind === 'var') {
          context.report({
            node,
            data: { type: 'var' },
            messageId: 'unexpected',
            fix(fixer) {
              const varToken = sourceCode.getFirstToken(node, {
                filter: (t) => t.value === 'var'
              })
              console.log('varToken >>> ', varToken)
              return fixer.replaceText(varToken, 'let')
            }
          })
        }
      }
    }
  }
}
