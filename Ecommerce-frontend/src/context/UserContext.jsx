import { createContext, useState } from 'react'

export const DataContext = createContext()


const UserContext = ({ children }) => {

    const [centerData, setCenterData] = useState()

    return (
        <DataContext.Provider value={{ centerData, setCenterData }}>
            {children}
        </DataContext.Provider>
    )
}

export default UserContext