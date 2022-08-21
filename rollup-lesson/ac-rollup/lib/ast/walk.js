function walk(node, parent, { enter, leave }) {
  visit(node, parent, enter, leave)
}

function visit(node, parent, enter, leave) {
  if (enter) {
    enter(node, parent)
  }

  const keys = Object.keys(node).filter((key) => typeof node[key] === 'object')
  keys.forEach((key) => {
    const children = node[key]
    if (Array.isArray(children)) {
      children.forEach((child) => {
        visit(child, node, enter, leave)
      })
    } else if (children && children.type) {
      visit(children, node, enter, leave)
    }
  })
  if (leave) {
    leave(node, parent)
  }
}

module.exports = walk
