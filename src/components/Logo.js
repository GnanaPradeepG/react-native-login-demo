import React from 'react'
import { Image, StyleSheet } from 'react-native'

export default function Logo() {
  return <Image source={{uri:"https://pbs.twimg.com/profile_images/1185075864523935746/VddmAMEX_400x400.png", width:200,height:200 }} style={styles.image} />
}

const styles = StyleSheet.create({
  image: {
    width: 110,
    height: 110,
    marginBottom: 8,
  },
})
