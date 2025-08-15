import MovieCard from '@/components/MovieCard'
import { icons } from '@/constants/icons'
import { images } from '@/constants/images'
import { FavoritesContext } from '@/context/favContext'
import React, { useContext } from 'react'
import { FlatList, Image, ImageBackground, ScrollView, Text, View } from 'react-native'

const favorites = () => {
  const {favorites, toggleBtn} = useContext(FavoritesContext)

return (
<>
  {favorites.length > 0 ? (
    <ImageBackground
          source={images.purpleBg}
        resizeMode='cover'
        className='flex flex-1'
    >
      <ScrollView 
        className='w-full'        
        showsVerticalScrollIndicator={false}
      >
        <Image 
          source={icons.logo}
          className='size-12 mt-20 mx-auto'
        />

        <Text className='text-white font-bold text-lg ml-3 mt-5'>Favorites</Text>

        <FlatList
          data={favorites}
          numColumns={3}
          renderItem={({ item }) => (
            <MovieCard movie={item} />
          )}
          keyExtractor={item => item.id.toString()}
          className='mt-5 pb-32 '
          contentContainerStyle={{
            justifyContent: 'flex-start',
            gap: 20,
            marginBottom: 10,
          }}
          scrollEnabled={false}
        />
      </ScrollView>

    </ImageBackground>
  ) : (
    <ImageBackground
          source={images.purpleBg}
        resizeMode='cover'
        className='flex flex-1 items-center'
    >
      <Image 
          source={icons.logo}
          className='size-12 mt-20 mx-auto'
        />
      <View 
        className='w-[90%] h-[30%] rounded-lg mt-20  justify-center items-center'        
      >
        <Text className='text-white font-bold text-lg'>No Favorites Yet</Text>
        <Text className='text-white font-semibold text-sm'>start adding to your favorites by pressing the heart!</Text>
        <Image 
          source={icons.full_heart}
          className='font-bold size-5'
        />
      </View>

    </ImageBackground>
  )}
  
</>

    
  )
}

export default favorites