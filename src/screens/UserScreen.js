import React, { useState, useEffect } from 'react'
import { render } from 'react-dom'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { Card, Title, Paragraph, Button } from 'react-native-paper'
import { BASE_URL } from '../CONSTANTS'

export const UserScreen = (props) => {
    const [user, setUser] = useState({})

    const getUser = async () => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        fetch(`${BASE_URL}/user/profile/${props.route.params._id}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                setUser(result.result);
            })
            .catch(error => console.log('error', error));
    }

    useEffect(() => {
        getUser();
    },[user])


    console.clear()
    console.log('tet')
    if (user) {
        return (
            <Card key={user.username}>
                <View style={{height:100}}></View>
                <Card.Title title={`${user.first_name} ${user.last_name}`} subtitle={user.username} />
                <Card.Content>
                    <Paragraph>Email: {user.email}</Paragraph>
                </Card.Content>
                <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
            </Card>
        )
    } else {
     return null   
    }
}

export default UserScreen

const styles = StyleSheet.create({})
