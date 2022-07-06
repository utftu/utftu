import {useState, useCallback} from 'react'

function useForceUpdate() {
  const [,stateUpdate] = useState(null)
  return useCallback(() => stateUpdate({}), [])
}

export default useForceUpdate