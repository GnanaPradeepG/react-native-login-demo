import React, { useState } from 'react'
import {getItemAsync, setItemAsync} from 'expo-secure-store'
import Background from '../components/Background'
import BackButton from '../components/BackButton'
import Logo from '../components/Logo'
import Header from '../components/Header'
import TextInput from '../components/TextInput'
import Button from '../components/Button'
import { passwordValidator } from '../helpers/passwordValidator'
import { BASE_URL } from '../CONSTANTS'

export default function ResetPasswordScreen({ navigation }) {
  const [password, setPassword] = useState({ value: '', error: '' })

  const resetPassword = async() => {
    const passwordError = passwordValidator(password.value)
    if (passwordError) {
      setPassword({ ...password, error: passwordError })
      return
    }
    const resetConfirmation = await reset()
    if (resetConfirmation.status) {
        setItemAsync('token',resetConfirmation.token)
        navigation.navigate('Dashboard')
    }
    else{
      setPassword({...password, error: resetConfirmation.message})
    }
  }

  const reset = async () => {
    let myHeaders = new Headers();
    myHeaders.append("Authorization", await getItemAsync('token'));
    myHeaders.append("Content-Type", "application/json");
    
    let raw = JSON.stringify({
      "newpassword": password.value
    });
    
    let requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    return fetch(`${BASE_URL}/user/reset`, requestOptions)
      .then(response => response.json())
      .then(result => {
          return result
      })
      .catch(error => console.log('error', error));
  }

  return (
    <Background>
      <Logo />
      <Header>Reset Password</Header>
      <TextInput
                label="Password"
                returnKeyType="done"
                value={password.value}
                onChangeText={(text) => setPassword({ value: text, error: '' })}
                error={!!password.error}
                errorText={password.error}
                secureTextEntry
            />
      <Button
        mode="contained"
        onPress={resetPassword}
        style={{ marginTop: 16 }}
      >
        Reset Password
      </Button>
    </Background>
  )
}
