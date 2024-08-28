import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import CustomSwitch from './src/components/CustomSwitch'

const App = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Custom Switch</Text>
      <View style={styles.content}>
        <CustomSwitch inactiveColor='#F2F5F7' activeColor='#FFA901' />
      </View>
      <View style={styles.content}>
        <CustomSwitch inactiveColor='#F2F5F7' activeColor='#92D8EF' />
      </View>
    </View>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 20,
    marginBottom: 20
  },
  content: {
    margin: 5
  }
})