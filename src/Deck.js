import React, { useEffect } from 'react'
import { View, Animated, PanResponder, Dimensions, LayoutAnimation, UIManager } from 'react-native'

const SCREEN_WIDTH = Dimensions.get('window').width
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH

const DIRECTION = {
  right: 'right',
  left: 'left'
}

export const Deck = ({ data, renderCard, onSwipeRight, onSwipeLeft }) => {
  const position = new Animated.ValueXY()

  useEffect(() => {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true)
    }

    LayoutAnimation.spring()
  })

  const swipe = direction => {
    const toValue = DIRECTION.right === direction ? { x: SCREEN_WIDTH, y: 0 } : { x: -SCREEN_WIDTH, y: 0 }

    Animated.timing(position, {
      toValue,
      duration: 250,
      useNativeDriver: false
    }).start(() => {
      direction === DIRECTION.right ? onSwipeRight(data[0]) : onSwipeLeft(data[0])
    })
  }

  const panResponder = PanResponder.create({
    /**
     *  execute anytime the user taps on the screen
     */
    onStartShouldSetPanResponder: () => true,
    /**
     * this call anytime users starts to drag the finger around the screen
     */
    onPanResponderMove: (_, gesture) => {
      position.setValue({ x: gesture.dx, y: gesture.dy })
    },
    /**
     * this call anytime users remove the finger from the screen
     */
    onPanResponderRelease: (_, gesture) => {
      if (gesture.dx > SWIPE_THRESHOLD) {
        swipe(DIRECTION.right)
      } else if (gesture.dx < -SWIPE_THRESHOLD) {
        swipe(DIRECTION.left)
      } else {
        Animated.spring(position, { toValue: { x: 0, y: 0 }, useNativeDriver: false }).start()
      }
    }
  })

  const getStyles = () => {
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
      outputRange: ['-120deg', '0deg', '120deg']
    })

    return {
      ...position.getLayout(),
      transform: [{ rotate }]
    }
  }

  function renderCards() {
    return data
      .map((item, i) => {
        if (i === 0) {
          return (
            <Animated.View key={item.id} {...panResponder.panHandlers} style={[getStyles(), styles.cardStyle]}>
              {renderCard(item)}
            </Animated.View>
          )
        }

        return (
          <View key={item.id} style={[styles.cardStyle, { top: i * 10 }]}>
            {renderCard(item)}
          </View>
        )
      })
      .reverse()
  }

  return <Animated.View style={{ width: '100%' }}>{renderCards()}</Animated.View>
}

const styles = {
  cardStyle: {
    width: '100%',
    position: 'absolute'
  }
}
