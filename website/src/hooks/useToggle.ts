import { useCallback, useState } from 'react'

export function useToggle(
    initialValue: boolean = false
): [boolean, () => void] {
    const [value, setValue] = useState(initialValue)

    // This function will toggle the value between true and false
    const toggle = useCallback(() => {
        setValue((value) => !value)
    }, [])

    return [value, toggle] as const
}
