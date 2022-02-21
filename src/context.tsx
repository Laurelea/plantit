import React, { useContext, useState } from 'react'

interface IPlantContext {
    visible: boolean,
    changeShow: (show: boolean) => void
}

const PlantContext = React.createContext<IPlantContext | null>(null)

export const usePlantContext = () => {
    return useContext(PlantContext)
}

export const ContextProvider = ({ children }: any) => {
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
