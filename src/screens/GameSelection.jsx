import { Text, View, StyleSheet, FlatList, Image, TouchableOpacity, StatusBar } from 'react-native';

const RenderCard = ({ id, name, nav, image, navigation }) => (

  <TouchableOpacity
    key={id}
    onPress={() => navigation.navigate(nav)}
  >
    <View style={styles.card}>
      <Image source={image} style={styles.image} />
      <Text style={styles.name}>{name}</Text>
    </View>
  </TouchableOpacity>
);

export const GameSelection = ({ navigation }) => {

  const data = [
    { id: 1, name: 'Tetris', nav: "Tetris", image: require('../../assets/images/tetris.png') },
    { id: 2, name: 'Matemáticas', nav: "Math", image: require('../../assets/images/numbers.png') },
    { id: 3, name: 'Memoriza', nav: "Memorize", image: require('../../assets/images/memory.png') },
    { id: 4, name: 'Letras', nav: "Vowels", image: require('../../assets/images/vowels.png') },
    { id: 4, name: 'Colores', nav: "Colors", image: require('../../assets/images/colors.png') },
  ];

  return (
    <View style={styles.container} >
      <StatusBar barStyle={"dark-content"} backgroundColor={"#BFF2FF"} />
      <Text style={styles.text}>SELECCIONA UN JUEGO</Text>
      <View style={styles.list}>
        <FlatList
          data={data}
          renderItem={(item) => <RenderCard id={item.item.id} name={item.item.name} nav={item.item.nav} image={item.item.image} navigation={navigation} />}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.content}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#BFF2FF",
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 10,
  },
  text: {
    marginBottom: 50,
    color: "black",
    fontSize: 20,
    fontFamily: "FredokaOne-Regular"
  },
  list: {
    width: "100%",
    height: "80%",
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  card: {
    margin: 10,
    borderWidth: 1.5,
    borderColor: 'black',
    borderRadius: 10,
    height: 200,
    width: 170,
    alignItems: "center",
    justifyContent: "space-around"
  },
  image: {
    width: 150,
    height: 100,
    objectFit: "cover"
  },
  name: {
    fontSize: 20,
    textAlign: 'center',
    color: "black",
    fontFamily: "FredokaOne-Regular"
  },
})