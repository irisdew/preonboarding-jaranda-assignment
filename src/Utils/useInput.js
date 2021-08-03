import { useState } from 'react'

//input에 입력된 값을 읽고 설정할 수 있음
export const useInput = (initialValue) => {
  const [value, setValue] = useState(initialValue)
  const onChange = (event) => {
    const {
      target: { value },
    } = event

    setValue(value)
  }
  return [value, setValue, onChange]
}
