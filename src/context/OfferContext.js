import React, {useContext, useEffect, useState} from 'react'

const OfferContext = React.createContext(null)

export function useOfferContext() {
    return useContext(OfferContext)
}

export function OfferProvider(props, {children}) {

    const [ offer, setOffer ] = useState()

    useEffect(() => {
        setOffer(props.offer)
    })

    const value = {
        offer
    }

    return (
        <OfferContext.Provider value={value} >
            { children }
        </OfferContext.Provider>
    )

}

export default OfferContext