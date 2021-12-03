import React from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'

export default function RegistrationSuccessfulScreen({ navigation }) {
  console.log(navigation)
  return (
    <Background>
      <Logo />
      <Header>Registration Successful</Header>
      <Button
        mode="outlined"
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: 'LoginScreen' }],
          })
        }
      >
        Go to Home
      </Button>
    </Background>
  )
}
