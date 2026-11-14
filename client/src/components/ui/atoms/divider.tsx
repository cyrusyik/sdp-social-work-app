import React from 'react'
import { StyleSheet, View } from 'react-native'
import { theme } from '@/theme/theme'

export const Divider = () => {
  return (
    <View style={styles.divider} />
  )
}

export default Divider;

const styles = StyleSheet.create({
  divider:{
    height: 1,
    width: '100%',
    backgroundColor: theme.colors.stroke
  }
})