import LottieView from 'lottie-react-native';
import { Text, View, Image, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export const Welcome = () => {
  const navigation = useNavigation();

  return (
    <>
      <StatusBar barStyle={"dark-content"} backgroundColor={"#BFF2FF"} />
      <LottieView
        style={styles.background}
        source={require('../../assets/images/clouds.json')}
        autoPlay
        loop
      />
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Text style={styles.title}>
            ACERTIJO KIDS
          </Text>
          <Image source={require('../../assets/images/icon.png')}
            style={styles.logo}
          />
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('GameSelection')}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>¡Vamos a divertirnos!</Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  background: {
    height: "100%",
  },

  container: {
    position: "absolute",
    display: "flex",
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '100%',
    width: "100%",
    paddingTop: 200,
    paddingBottom: 50,
    zIndex: 10
  },

  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
    gap: 60
  },

  title: {
    fontSize: 40,
    color: "white",
    fontFamily: 'FredokaOne-Regular',
    textAlign: "center",
    textShadowColor: "black",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
  },

  logo: {
    width: 225,
    height: 225,
  },

  button: {
    width: 310,
    backgroundColor: "#ffff00",
    height: 50,
    justifyContent: "center",
    alignContent: "center",
    borderRadius: 10,
    // borderWidth: 0.5,
    // borderColor: "black", 
  },

  buttonText: {
    fontSize: 20,
    color: "black",
    textAlign: "center",
    fontFamily: "FredokaOne-Regular",
  }

});