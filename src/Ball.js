import React, { useEffect } from 'react'
import { View, StyleSheet, Animated } from 'react-native'

export const Ball = () => {
  const position = new Animated.ValueXY(0, 0)

  useEffect(() => {
    Animated.spring(position, {
      toValue: { x: 150, y: 500 }
    }).start()
  }, [])

  return (
    <Animated.View style={position.getLayout()}>
      <View style={styles.ball} />
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  ball: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'black'
  }
})
