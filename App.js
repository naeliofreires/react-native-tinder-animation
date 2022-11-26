import { SafeAreaView, StyleSheet, Text } from 'react-native'
import { Button } from '@rneui/base'
import { Card } from '@rneui/themed'

import { Deck } from './src/Deck'
import { DATA } from './src/data'
import { useState } from 'react'

export default function App() {
  const [data, onChageData] = useState(DATA)

  const renderCard = item => {
    return (
      <Card key={item.text}>
        <Card.Title> {item.text} </Card.Title>
        <Card.Divider />
        <Card.Image style={{ padding: 0 }} source={{ uri: item.uri }} />
        <Button title='View Now!' icon={{ name: 'code' }} />
      </Card>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text>{data.length}</Text>
      <Deck
        data={data}
        renderCard={renderCard}
        onSwipeRight={item => {
          onChageData(state => state.filter(i => i.id !== item.id))
        }}
        onSwipeLeft={item => {
          onChageData(state => state.filter(i => i.id !== item.id))
        }}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ededed',
    alignItems: 'center'
  }
})
