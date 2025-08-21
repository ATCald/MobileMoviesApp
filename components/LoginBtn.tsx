import React from 'react'
import { Text, TouchableOpacity } from 'react-native'

const LoginBtn = ({input, onPress}: any) => {
  return (
    <TouchableOpacity onPress={onPress}
        className='w-[90%] h-16 rounded-full justify-center items-center border-2 border-white m-2'
    >
        <Text className='text-white text-lg font-bold'>{input}</Text>
    </TouchableOpacity>
  )
}

export default LoginBtn