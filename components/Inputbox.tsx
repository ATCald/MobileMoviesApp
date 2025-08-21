import React from 'react'
import { TextInput, View } from 'react-native'

type InputProp = {
    placeholder: string,
    value: string,
    onChangeText?: ((text: string) => void),
    filter?: boolean
}


const Inputbox = ({placeholder, value, onChangeText, filter = false}: InputProp) => {
  return (
    <View className='justify-center items-center w-full'>
        <TextInput
            value={value}
            onChangeText={onChangeText}
            className='border-2 border-accent rounded-xl m-2 p-4 w-[70%]'
            placeholder={placeholder}
            placeholderTextColor="#E81E63"
            secureTextEntry={filter}
        />
    </View>
  )
}

export default Inputbox