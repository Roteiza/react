import { useEffect, useState } from 'react'

export function useDebounce<T> (value: T, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log('timer setdebounce')
      setDebouncedValue(value)
    }, delay)

    return () => { clearTimeout(timer); console.log('end return') }
  }, [value, delay])

  console.log('fin')
  return debouncedValue
}
