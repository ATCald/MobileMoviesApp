import { icons } from '@/constants/icons'
import { Tabs } from 'expo-router'
import React from 'react'
import { Image, Text, View } from 'react-native'

// Custom TabBar
export const TabBar = ({ focused, icon, title }: any) => {
    if (focused) {
        return(
            <View className='flex flex-row justify-center items-center min-w-[112px] h-[61px] bg-accent rounded-full'>
                <Image 
                    source={icon}
                    className='size-5'
                    tintColor={'white'}
                />
                <Text className='text-white ml-2'>{title}</Text>
            </View>
        )
    }

    return(
        <View className='justify-center items-center'>
            <Image 
                source={icon}
                className='size-5'
            />
        </View>
    )
 
}

const _layout = () => {


  return (
    <Tabs
        screenOptions={{
            tabBarShowLabel: false,
            tabBarStyle: {
                backgroundColor: '#f0d5df',
                position: 'absolute',
                justifyContent: 'center',
                alignItems: 'stretch',
                paddingTop: 10,
                marginBottom: 50,
                height: 60,
                borderRadius: 50,
                overflow: 'hidden',
            }
        }}
    
    >
        <Tabs.Screen 
            name='index'
            options={{
                headerShown: false,
                title: "Home",
                tabBarIcon: ({ focused }) => {
                    return (
                        <TabBar focused={focused} icon={icons.home} title={'Home'}/>
                    )
                }
            }}
        />

        <Tabs.Screen 
            name='search'
            options={{
                headerShown: false,
                title: 'Search',
                tabBarIcon: ({ focused }) => {
                   return (
                        <TabBar focused={focused} icon={icons.search} title={'Search'}/>
                    )
                }
            }}
        />
         <Tabs.Screen 
            name='favorites'
            options={{
                headerShown: false,
                title: 'Favorites',
                tabBarIcon: ({ focused }) => {
                   return (
                        <TabBar focused={focused} icon={icons.heart} title={'Favorites'}/>
                    )
                }
            }}
        />
         <Tabs.Screen 
            name='profile'
            options={{
                headerShown: false,
                title: 'Profile',
                tabBarIcon: ({ focused }) => {
                    return (
                        <TabBar focused={focused} icon={icons.person} title={'Profile'}/>
                    )
                }
            }}
        />

    </Tabs>

  )
}

export default _layout