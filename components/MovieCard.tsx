import { icons } from '@/constants/icons'
import { Link } from 'expo-router'
import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'

const MovieCard = ({ movie }: { movie: Movie}) => {
  return (
    <Link href={`/movies/${movie.id}`} asChild>
        <TouchableOpacity className='w-[30%] m-2'>
            <Image 
                source={{uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`}}
                className='w-full h-52 rounded-lg'
                resizeMode='cover'    
            />
            <Text className='text-white text-sm  font-bold' numberOfLines={1}>{movie.title}</Text>
            <View className='flex-row items-center font-bold uppercase'>
                <Image 
                    source={icons.star}
                    className='size-4'
                />
                <Text className='text-white text-sm justify-center items-center font-medium'> {Math.round(movie.vote_average/2)}</Text>
            </View>
            <View className='flex-row justify-between'>
                <Text className='text-sm text-gray-200 font-medium'>{movie.release_date.split('-')[0]}</Text>
                <Text className='text-sm text-gray-300 uppercase font-medium'>MOVIE</Text>
            </View>
        </TouchableOpacity>
    </Link>
    
  )
}

export default MovieCard