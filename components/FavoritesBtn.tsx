import { icons } from '@/constants/icons'
import { FavoritesContext } from '@/context/favContext'
import React, { useContext } from 'react'
import { Image, TouchableOpacity } from 'react-native'


const FavoritesBtn = ({movie}: {movie: Movie}) => {
    const { favorites, toggleBtn} = useContext(FavoritesContext)
    const isFavorites = favorites.some(fav => fav.id === movie.id)

  return (
    <TouchableOpacity className='w-12 h-12 justify-center items-center bg-[#221f3d] rounded-full '
        onPress={() => toggleBtn(movie)}
    >
        <Image 
            source={isFavorites? icons.full_heart: icons.heart}
            tintColor='white'
        />
    </TouchableOpacity>
  )
}

export default FavoritesBtn