function lazyFunc(func, getDeps = () => ([])) {
  let prevDeps = null
  let prevResult = null
  return function (...args) {
    const deps = getDeps()
    if (!prevDeps  || !deps) {
      return exec()
    }
    
    if (Array.isArray(deps) === false) {
      return exec()
    }
    
    if (prevDeps.length !== deps.length) {
      return exec()
    }
    
    for (let i = 0; i < deps.length; i++) {
      const newDep = deps[i]
      const oldDep = prevDeps[i]
      if (newDep !== oldDep) {
        return exec()
      }
    }
    
    prevDeps = deps
    return prevResult
    
    function exec() {
      prevDeps = deps
      const result = func(...args)
      prevResult = result
      return result
    }
  }
}

export default lazyFunc