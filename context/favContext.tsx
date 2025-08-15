import { createContext, ReactNode, useState } from "react";

interface FavoritesInterface {
    favorites: Movie[],
    toggleBtn: (movie: Movie) => void
}

export const FavoritesContext = createContext<FavoritesInterface>({
    favorites: [],
    toggleBtn: () => {},
})

export const FavoritesProvider = ({ children }: {children: ReactNode}) => {
    // logic goes in here
    
    // the movie object should now be saved as favorites
    const [favorites, setFavorites] = useState<Movie[]>([]) 

    // toggle button
   const toggleBtn = (movie: Movie) => {
    // prev is previous state,
    setFavorites(prev => 
        prev.some(fav => fav.id === movie.id) // check to see if movie id is in our setFavorites
        ? prev.filter(fav => fav.id !== movie.id) // if it IS TRUE^ then remove it using filter
        : [...prev, movie] // else add the movie to our setFavorites
    )
   }

    return (
        <FavoritesContext.Provider value={{favorites, toggleBtn}}>
            {children}
        </FavoritesContext.Provider>
    );
}