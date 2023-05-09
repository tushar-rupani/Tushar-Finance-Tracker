import React, {createContext, useState} from 'react'
import { records } from '../utils/constants/_const'
import { INITIAL_STATE } from '../utils/constants/_const';
export const GlobalContext = createContext(undefined);
export const GlobalProvider = ({children}) => {
   const [data, setData] = useState(records);
   const [formState, setFormState] = useState(INITIAL_STATE);
   return(
    <GlobalContext.Provider value={{data, setData, formState, setFormState}}>
        {children}
    </GlobalContext.Provider>
   )
}

