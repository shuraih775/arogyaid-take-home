import React from 'react'
import {View,Text} from 'react-native';

function Home() {
  return (
    <View className='bg-white h-[100%] justify-center items-center m-4'>
      <Text className='font-bold text-2xl text-center mb-8'>This is the AarogyaId take home Project app</Text>

      <Text className='font-light text-xl text-center mb-4'>Navigate to the Records Screen using the navigation bar in the bottom, to view the records.</Text>
      <Text className='font-light text-xl text-center '>As the backend service is hosted on a free plan. The data loading might take some so please do wait.</Text>
      

      
    </View>
  )
}

export default Home
