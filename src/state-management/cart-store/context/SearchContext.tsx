import React, {ReactNode, SetStateAction, useContext, useState, } from "react";
import { useSubmit } from "react-router-dom";




interface SearchType{
    searchQuery:string,
    setSearchQuery:React.Dispatch<SetStateAction<string>>
}


interface PropsType {
    children:ReactNode,
    // setText:Dispatch<React.SetStateAction<string>>
}





export const SearchContext=React.createContext<SearchType>({} as SearchType)


export const SearchProvider=({children}:PropsType)=>{

    const [searchQuery,setSearchQuery]=useState<string>('')
 
    return (
        <SearchContext.Provider value={{searchQuery,setSearchQuery}}>
            {children}
        </SearchContext.Provider>
    )
}

export const useSearchContext=()=>useContext(SearchContext)



