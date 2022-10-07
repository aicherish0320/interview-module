const inverseTree = (root) => {
  if(!root) return

  const left = inverseTree(root.left)
  const right = inverseTree(root.right)

  root.left = right
  root.right = left

  return root

}