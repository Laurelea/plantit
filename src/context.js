import React, { useContext, useState } from 'react'

const PlantContext = React.createContext()

export const usePlantContext = () => {
    return useContext(PlantContext)
}

export const ContextProvider = ({ children }) => {
    const [show, setShow] = useState(false)

    const changeShow = () => {
        setShow(show => !show)
    }

    return (
        <PlantContext.Provider value={{
            visible: show,
            changeShow
        }}>
            { children }
        </PlantContext.Provider>

    )
}
