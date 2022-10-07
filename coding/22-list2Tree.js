function list2Tree(list) {
  list.forEach((child) => {
    const pid = child.pid
    if (pid) {
      list.forEach((parent) => {
        if (parent.id === pid) {
          parent.children = parent.children || []
          parent.child.push(child)
        }
      })
    }
  })
  return list.filter((n) => !n.pid)
}

function tree2List(tree) {
  const list = []
  const stack = [...tree]

  while (stack.length) {
    const node = stack.pop()
    const children = node.children
    if (children) {
      stack.push(...children)
    }
    list.push(node)
  }
  return list
}
