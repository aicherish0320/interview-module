function walk(node, parent, { enter, leave }) {
  visit(node, parent, enter, leave)
}

function visit(node, parent, enter, leave) {
  if (enter) {
    enter(node, parent)
  }

  // 深度递归遍历子节点
  let keys = Object.keys(node).filter(key => typeof node[key] === 'object')
 keys.forEach((key) => {
    let children = node[key]
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
