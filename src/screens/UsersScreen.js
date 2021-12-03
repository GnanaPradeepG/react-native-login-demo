import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { Card, Title, Paragraph, Button } from 'react-native-paper'
import { BASE_URL } from '../CONSTANTS'
import {UserScreen} from './UserScreen'

export const UsersScreen = ({navigation}) => {
    const [users, setUsers] = useState([])

    const getUsers = async () => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(`${BASE_URL}/user`, requestOptions)
            .then(response => response.json())
            .then(result => {
                setUsers(result.data.docs);
            })
            .catch(error => console.log('error', error));
    }

    useEffect(() => {
        getUsers();
    }, [])

    const RenderUser = () => {

        return users.map(user => {
            return (
                <Card onPress={() => {
                    navigation.navigate('UserScreen', {_id : user._id})
                }} key={user.username}>
                    <Card.Title title={`${user.first_name} ${user.last_name}`} subtitle={user.username} />
                    <Card.Content>
                        <Paragraph>Email: {user.email}</Paragraph>
                    </Card.Content>
                    <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
                </Card>
            )
        })
    }
    return (
        <ScrollView>
            <RenderUser />
        </ScrollView>
    )
}

export default UsersScreen

const styles = StyleSheet.create({})
