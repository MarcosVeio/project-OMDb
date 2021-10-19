import React, { createContext, useCallback, useContext, useReducer, useEffect } from 'react'

const favouritesContext = createContext()

const favouritesReducer = (state, { type, payload }) => {
    switch (type) {
        case 'ADD_MOVIE':
            return [...state, payload]
        case 'REMOVE_MOVIE':
            return (
                state.filter(({ imdbID }) => imdbID !== payload.imdbID)
            )
        case 'CLEAR_STATE':
            return state = []
        default:
            return state
    }
}

export const FavouritesProvider = ({ initialState, children }) => {
    const [favourites, dispatchListFavourites] = useReducer(favouritesReducer, initialState, () => {
        const localData = localStorage.getItem('listFavourites')
        return localData ? JSON.parse(localData) : initialState
    })

    useEffect(() => {
        localStorage.setItem('listFavourites', JSON.stringify(favourites))
    }, [favourites])

    return <favouritesContext.Provider value={{ favourites, dispatchListFavourites }}>{children}</favouritesContext.Provider>
}


export const useFavContext = () => {
    const { favourites, dispatchListFavourites } = useContext(favouritesContext)

    const addMovie = useCallback((movie) => {
        dispatchListFavourites({ type: 'ADD_MOVIE', payload: movie })
    }, [dispatchListFavourites])

    const removeMovie = useCallback((movie) => {
        dispatchListFavourites({ type: 'REMOVE_MOVIE', payload: movie })
    }, [dispatchListFavourites])

    const clearFavourites = useCallback(() => {
        dispatchListFavourites({ type: 'CLEAR_STATE' })
    }, [dispatchListFavourites])

    return { favourites, addMovie, removeMovie, clearFavourites }
}