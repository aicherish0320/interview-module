// 反转二叉树

const inverseTree = (root) => {
  if (!root) return

  const left = inverseTree(root.left)
  const right = inverseTree(root.right)

  root.right = left
  root.left = right

  return root
}
