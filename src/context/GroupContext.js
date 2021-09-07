import React, {useContext, useEffect, useState} from 'react'
import firebase from '../firebase'

const GroupContext = React.createContext(null);

export function useGroupContext() {
    return useContext(GroupContext)
}

export function GroupProvider( props, {children} ) {

    const groupToLookup = props.groupId
    const [group, setGroup] = useState();
    const groupsRef = firebase.firestore().collection('groups')

    useEffect(() => {
        try {
            groupsRef.doc()
        } catch(e) {
            console.log(e)
        }
    }, [])

    const value = {
        group
    }

    return (
        <GroupContext.Provider value={value} >
            {children}
        </GroupContext.Provider>
    )
}