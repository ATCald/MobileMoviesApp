import { icons } from '@/constants/icons'
import React from 'react'
import { Image, TextInput, View } from 'react-native'

type Props = {
    searchQuery?: string
    onChangeText?: ((text: string) => void)
    onSubmitEditing?: () => void
}

const SearchBar = ({searchQuery, onChangeText, onSubmitEditing}: Props) => {
  return (
    <View className='flex-row bg-[#0f0d23] rounded-full items-center px-4 py-5 mb-10'>
        <Image 
            source={icons.search}
            resizeMode='contain'
            className='size-5'
            tintColor={"#ab8bff"}
        />
        <TextInput 
          value={searchQuery}
          onChangeText={onChangeText}
          className='ml-2 text-white' 
          placeholder='Search for movies...'
          placeholderTextColor="#999"
          onSubmitEditing={onSubmitEditing}
        />
    </View>
  )
}

export default SearchBar