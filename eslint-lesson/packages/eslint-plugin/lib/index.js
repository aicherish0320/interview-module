/**
 * @fileoverview test eslint plugin
 * @author aicherish
 */
'use strict'

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const requireIndex = require('requireindex')

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------

// import all rules in lib/rules
// module.exports.rules = requireIndex(__dirname + "/rules");

module.exports = {
  rules: requireIndex(__dirname + '/rules'),
  configs: {
    recommend: {
      plugins: ['ac-lint'],
      rules: {
        'ac-lint/no-var': ['error']
      }
    }
  }
}
