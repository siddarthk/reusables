import { useState } from 'react'

interface ReturnType {
  value: boolean
  toggle: () => void
}

function useToggle(defaultValue?: boolean): ReturnType {
  const [value, setValue] = useState(!!defaultValue)
  const toggle = () => setValue(x => !x)

  return { value, toggle }
}

export default useToggle;