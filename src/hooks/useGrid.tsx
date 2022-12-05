import react, { useState } from 'react'

const useGrid = () => {
    const [start, setStart] = useState(false)
    const [grid, setGrid] = useState({})

    return {
        grid,
        start
    }
}

export default useGrid