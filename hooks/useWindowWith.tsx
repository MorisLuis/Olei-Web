import React, { useEffect, useState } from 'react'

export const useWindowWith = () => {
    
    const [windowWidth, setWindowWidth] = useState<number | null>(null)

    const handleResize = () => {
        setWindowWidth(window.innerWidth)
    }

    useEffect(() => {
        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    useEffect(() => {
        setWindowWidth(window.innerWidth)
    }, [])

    return windowWidth;
}
