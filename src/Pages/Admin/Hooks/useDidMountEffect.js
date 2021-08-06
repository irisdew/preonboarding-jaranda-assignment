import { useEffect, useRef } from 'react'

export default function useDidMountEffect(func, deps) {
  const isFristRun = useRef(false)

  useEffect(() => {
    if (isFristRun.current) func()
    else isFristRun.current = true
  }, deps)
}
