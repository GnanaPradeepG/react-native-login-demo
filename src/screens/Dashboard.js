import React from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'
import { deleteItemAsync } from 'expo-secure-store'
import {UsersScreen} from './UsersScreen'

export default function Dashboard({ navigation }) {
  const logOut = () => {
    deleteItemAsync('token');
    navigation.reset({
      index: 0,
      routes: [{ name: 'StartScreen' }],
    })
  }
  return (
    <Background>
      <Logo />
      <UsersScreen navigation={navigation}/>
      <Button
        mode="outlined"
        onPress={() =>logOut()}
      >
        Logout
      </Button>
    </Background>
  )
}
