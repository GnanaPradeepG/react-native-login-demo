import React, { useState } from 'react'
import { setItemAsync } from 'expo-secure-store'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import { emailValidator } from '../helpers/emailValidator'
import { passwordValidator } from '../helpers/passwordValidator'
import { nameValidator } from '../helpers/nameValidator'
import { BASE_URL } from '../CONSTANTS'

export default function RegisterScreen({ navigation }) {
    const [username, setUserName] = useState({ value: '', error: '' })
    const [first_name, setFirstName] = useState({ value: '', error: '' })
    const [last_name, setLastName] = useState({ value: '', error: '' })
    const [email, setEmail] = useState({ value: '', error: '' })
    const [password, setPassword] = useState({ value: '', error: '' })
    // const [phone, setPhone] = useState({ value: '', error: '' })
    // const [dob, setDOB] = useState({ value: '', error: '' })
    // const [profile_image, setProfileImage] = useState({ value: '', error: '' })
    // const [social_info, setSocialInfo] = useState({ value: '', error: '' })
    // const [device_info, setDeviceInfo] = useState({ value: '', error: '' })

    const onSignUpPressed = async () => {
        const userNameError = nameValidator(username.value, 'User Name')
        const firstNameError = nameValidator(first_name.value, 'First Name')
        const lastNameError = nameValidator(last_name.value, 'Last Name')
        const emailError = emailValidator(email.value)
        const passwordError = passwordValidator(password.value)

        if (userNameError || firstNameError || lastNameError || emailError || passwordError) {
            setUserName({ ...username, error: userNameError })
            setFirstName({ ...first_name, error: firstNameError })
            setLastName({ ...last_name, error: lastNameError })
            setEmail({ ...email, error: emailError })
            setPassword({ ...password, error: passwordError })
            return
        }

        const registerResponse = await register();

        if (registerResponse.status) {
            await setItemAsync('token', registerResponse.token)
            registerResponse.token
            navigation.reset({
                index: 0,
                routes: [{ name: 'RegistrationSuccessfulScreen' }],
            })
        }
        else if (registerResponse.message === 'User Name already Exist') {
            setUserName({ ...username, error: 'User Name already Exist' })
        }
        else if (registerResponse.message === 'Email already Exist') {
            setEmail({ ...username, error: 'Email already Exist' })
        }
        else {
            setPassword({ ...password, error: 'There seems to be some issue, please try again' })
        }
    }

    const register = async () => {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        let raw = JSON.stringify({
            "username": username.value.toLocaleLowerCase(),
            "first_name": first_name.value,
            "last_name": last_name.value,
            "email": email.value.toLocaleLowerCase(),
            "password": password.value,
            // "phone": phone,
            // "dob": dob,
            // "profile_image": profile_image,
            // "social_info": social_info,
            // "device_info": device_info
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        return fetch(`${BASE_URL}/user`, requestOptions)
            .then(response => response.json())
            .then(result => {
                return result
            })
            .catch(error => console.log('error', error));
    }

    return (
        <Background>
            {/* <BackButton goBack={navigation.goBack} /> */}
            <Logo />
            <Header>Create Account</Header>
            <TextInput
                label="User Name"
                returnKeyType="next"
                value={username.value}
                onChangeText={(text) => setUserName({ value: text, error: '' })}
                error={!!username.error}
                errorText={username.error}
            />
            <TextInput
                label="First Name"
                returnKeyType="next"
                value={first_name.value}
                onChangeText={(text) => setFirstName({ value: text, error: '' })}
                error={!!first_name.error}
                errorText={first_name.error}
            />
            <TextInput
                label="Last Name"
                returnKeyType="next"
                value={last_name.value}
                onChangeText={(text) => setLastName({ value: text, error: '' })}
                error={!!last_name.error}
                errorText={last_name.error}
            />
            <TextInput
                label="Email"
                returnKeyType="next"
                value={email.value}
                onChangeText={(text) => setEmail({ value: text, error: '' })}
                error={!!email.error}
                errorText={email.error}
                autoCapitalize="none"
                autoCompleteType="email"
                textContentType="emailAddress"
                keyboardType="email-address"
            />
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
                onPress={onSignUpPressed}
                style={{ marginTop: 24 }}
            >
                Sign Up
            </Button>
            <View style={styles.row}>
                <Text>Already have an account? </Text>
                <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
                    <Text style={styles.link}>Login</Text>
                </TouchableOpacity>
            </View>
        </Background>
    )
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        marginTop: 4,
    },
    link: {
        fontWeight: 'bold',
        color: theme.colors.primary,
    },
})
