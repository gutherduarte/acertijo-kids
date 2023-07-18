import {
  View,
  StyleSheet,
  StatusBar
} from 'react-native';
import Grid from "../components/Grid"

export const Tetris = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle={"dark-content"} backgroundColor={"#F9F9F9"} />
      <Grid w={10} h={24} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
})