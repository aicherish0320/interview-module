const list = [
  { id: 1, pid: 0, name: '部门a' },
  { id: 2, pid: 1, name: '部门b' },
  { id: 3, pid: 1, name: '部门c' },
  { id: 4, pid: 2, name: '部门d' },
  { id: 5, pid: 3, name: '部门e' },
  { id: 6, pid: 2, name: '部门f' },
  { id: 7, pid: 3, name: '部门g' },
  { id: 8, pid: 4, name: '部门h' },
  { id: 9, pid: 4, name: '部门i' },
  { id: 10, pid: 0, name: '部门j' }
]

const tree = [
  {
    id: 1,
    pid: 0,
    name: '部门a',
    children: [
      {
        id: 2,
        pid: 1,
        name: '部门b',
        children: [
          {
            id: 4,
            pid: 2,
            name: '部门d',
            children: [
              { id: 8, pid: 4, name: '部门h' },
              { id: 9, pid: 4, name: '部门i' }
            ]
          },
          { id: 6, pid: 2, name: '部门f' }
        ]
      },
      {
        id: 3,
        pid: 1,
        name: '部门c',
        children: [
          { id: 5, pid: 3, name: '部门e' },
          { id: 7, pid: 3, name: '部门g' }
        ]
      }
    ]
  },
  { id: 10, pid: 0, name: '部门j' }
]

// ! 列表转树型结构

// ! 递归
function list2Tree(list) {
  const tree = []

  for (const node of list) {
    if (!node.pid) {
      let p = { ...node }
      p.children = getChildren(p.id, list)
      tree.push(p)
    }
  }

  function getChildren(id, list) {
    const children = []

    for (const node of list) {
      if (node.pid === id) {
        children.push(node)
      }
    }

    for (const node of children) {
      const children = getChildren(node.id, list)
      if (children.length) {
        node.children = children
      }
    }

    return children
  }

  return tree
}
// ! 循环
function list2Tree(list) {
  list.forEach((child) => {
    const pid = child.pid
    if (pid) {
      list.forEach((parent) => {
        if (parent.id === pid) {
          parent.children = parent.children || []
          parent.children.push(child)
        }
      })
    }
  })
  return list.filter((n) => !n.pid)
}
// console.log(JSON.stringify(list2Tree(list)))

// ! 树形结构转列表
// ! 广度遍历
// function tree2List(tree) {
//   const list = []
//   const queue = [...tree]
//   while (queue.length) {
//     const node = queue.shift()
//     const children = node.children
//     if (children) {
//       queue.push(...children)
//     }
//     list.push(node)
//   }
//   return list
// }
// ! 深度遍历
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

console.log(JSON.stringify(tree2List(tree)))
