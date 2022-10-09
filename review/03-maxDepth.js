// 求二叉树的最大深度

const maxDepth = (root) => {
  let ret = 0
  const dfs = (root, l) => {
    if (!root) return
    if (!root.left && !root.right) {
      ret = Math.max(ret, l)
    }

    dfs(root.left, l + 1)
    dfs(root.right, l + 1)
  }
  dfs(root, l)

  return ret
}
