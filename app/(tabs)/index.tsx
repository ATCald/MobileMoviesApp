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
  const [page, setPage] = useState<number>(1)
  const [TotalPages, setTotalPages] = useState<number>(0)

  useEffect(() => {
    const loadMovies = async () => {
      try {
        setLoading(true)
        const {results, pageNumber, totalPages} = await fetchMovies(page)
        setMovies(results)
        setTotalPages(totalPages)
      } catch (e) {
        console.error(e)
      } finally{
        setLoading(false)
      }
    }
    loadMovies();
  },[page])

  const handlePage = (type: string) => {
    if (type === 'decrement' && page != 1) {
      setPage(prev => prev - 1)
      return
    } 
    if (type === 'increment' && page < TotalPages){
      setPage(prev => prev + 1)
      return
    } 

    setPage(page)
    return
  }
 
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

        <Text className='text-white font-bold text-lg ml-6 mt-10'>Latest Movies</Text>

        <FlatList
          data={movies}
          numColumns={3}
          renderItem={({ item }) => (
            <MovieCard movie={item} />
          )}
          keyExtractor={item => item.id.toString()}
          className='mt-5'
          contentContainerStyle={{
            justifyContent: 'center',
            gap: 20,
            marginBottom: 10,
          }}
          scrollEnabled={false}
        />

        <View className=' flex-row pb-40 mt-10 justify-center'>
          <Text onPress={() => handlePage('decrement')} className='text-primary underline italic'>Prev</Text>
          <Text className='ml-3 mr-3 text-primary'>{page}</Text>
          <Text onPress={() => handlePage('increment')} className='text-primary underline italic'>Next</Text>
        </View>
      </ScrollView>
    </ImageBackground>
  )
}
export default index