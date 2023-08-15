import { createContext, useState } from 'react'

// Create context
// This is what to consume
export const FiltersContext = createContext()

// Create Provider to provide context
// This provide acceso to context
export function FiltersProviders ({ children }) {
    const [filters, setFilters] = useState({
        category : 'all',
        minPrice : 0
    })
    
    return (
        <FiltersContext.Provider value={{
            filters,
            setFilters
        }}>
            {children}
        </FiltersContext.Provider>
    )
}
