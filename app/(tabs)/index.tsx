import MovieCard from '@/components/MovieCard'
import SearchBar from '@/components/SearchBar'
import { icons } from '@/constants/icons'
import { images } from '@/constants/images'
import { fetchMovies } from '@/services/api'
import { useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { FlatList, Image, ImageBackground, ScrollView, Text, View } from 'react-native'
import '../globals.css'

const index = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [movies, setMovies] = useState<Movie[]>([])

  useEffect(() => {
    const loadMovies = async () => {
      try {
        setLoading(true)
        const data = await fetchMovies()
        setMovies(data)
      } catch (e) {
        console.log(e)
      } finally{
        setLoading(false)
      }
    }

    loadMovies();
  },[])

  return (
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
        <View className='flex-1 mt-5 px-5'>
          <SearchBar searchQuery={searchQuery} onChangeText={(text: string) => setSearchQuery(text)} onSubmitEditing={() => router.push(`/search?query=${encodeURIComponent(searchQuery)}`)}/>
        </View>

        <Text className='text-white font-bold text-lg ml-3 mt-5'>Latest Movies</Text>

        <FlatList
          data={movies}
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
  )
}
// Logo, searchbar.
// somhow get the searchquery into search.tsx file and render the 

export default index