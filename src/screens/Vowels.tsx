import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, StatusBar, FlatList } from 'react-native';
import Sound from 'react-native-sound';

interface IVowel {
  id: number;
  letter: string;
  color: string;
  image: any;
  sound: Sound;
}

export const Vowels = ({ navigation }: any) => {
  const vowels: Array<IVowel> = [
    {
      id: 1,
      letter: 'A',
      color: '#FF595E',
      image: require('../../assets/images/a.png'),
      sound: new Sound(require('../../assets/sounds/a_sound.mp3')),
    },
    {
      id: 2,
      letter: 'E',
      color: '#FFCA3A',
      image: require('../../assets/images/e.png'),
      sound: new Sound(require('../../assets/sounds/e_sound.mp3')),
    },
    {
      id: 3,
      letter: 'I',
      color: '#8AC926',
      image: require('../../assets/images/i.png'),
      sound: new Sound(require('../../assets/sounds/i_sound.mp3')),
    },
    {
      id: 4,
      letter: 'O',
      color: '#1982C4',
      image: require('../../assets/images/o.png'),
      sound: new Sound(require('../../assets/sounds/o_sound.mp3')),
    },
    {
      id: 5,
      letter: 'U',
      color: '#6A4C93',
      image: require('../../assets/images/u.png'),
      sound: new Sound(require('../../assets/sounds/u_sound.mp3')),
    },
  ];

  const handleVowelPress = (vowel: IVowel) => {
    vowel.sound.play((success) => {
      if (!success) {
        console.log('Error al reproducir el sonido');
      }
    });
  };

  const RenderVowelButton = ({ id, letter, color, image, sound }: IVowel) => {
    return (
      <TouchableOpacity
        key={id}
        onPress={() => handleVowelPress({ id, letter, color, image, sound })}
      >
        <View style={styles.card}>
          <Image source={image} style={styles.image} resizeMode="contain" />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container} >
      <StatusBar barStyle={"light-content"} backgroundColor={"#7F00B2"} />
      <Text style={styles.text}>SELECCIONA UNA VOCAL</Text>
      <View style={styles.list}>
        <FlatList
          data={vowels}
          renderItem={(item) => <RenderVowelButton id={item.item.id} letter={item.item.letter} color={item.item.color} image={item.item.image} sound={item.item.sound} />}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.gridContainer}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  gridContainer: {
    alignItems: "center"
  },
  container: {
    backgroundColor: "#7F00B2",
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingTop: 80,
    paddingBottom: 100
  },
  text: {
    color: "white",
    fontSize: 20,
    fontFamily: "FredokaOne-Regular"
  },
  list: {
    width: "100%",
    alignItems: "center",
  },
  card: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 15,
    borderWidth: 1.5,
    borderColor: 'white',
    borderRadius: 10,
    padding: 16,
    backgroundColor: "#00b380"
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
    borderRadius: 8,
  }
})