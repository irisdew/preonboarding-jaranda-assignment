import { useEffect, useState } from 'react'

export default function useValidateCell(index, id, targetData) {
  const [isOpenedEditInput, setIsOpenedEditInput] = useState(false)

  useEffect(() => {
    if (
      index !== targetData.index ||
      id !== targetData.id ||
      targetData.index === 0 ||
      targetData.id === 0
    )
      return false

    setIsOpenedEditInput(true)
  }, [index, id, targetData])

  return { isOpenedEditInput, setIsOpenedEditInput }
}
