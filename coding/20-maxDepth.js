const maxDepth = function (root) {
  let ret = 0

  const dfs = (root, l) => {
    if (!root) return
    if (!root.left && !root.right) {
      ret = Math.max(ret, l)
    }
    dfs(root.left, l + 1)
    dfs(root.right, l + 1)
  }
  dfs(root, 1)

  return ret
}
