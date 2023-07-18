import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, Image, Alert } from 'react-native';

export const COLORS = [
  {
    id: 1,
    name: "Amarillo",
    image: require('../../assets/images/colors/amarillo-1.png')
  },
  {
    id: 2,
    name: "Amarillo",
    image: require('../../assets/images/colors/amarillo-2.png')
  },
  {
    id: 3,
    name: "Azul",
    image: require('../../assets/images/colors/azul.png')
  },
  {
    id: 4,
    name: "Café",
    image: require('../../assets/images/colors/cafe.png')
  },
  {
    id: 5,
    name: "Café",
    image: require('../../assets/images/colors/cafe.png')
  },
  {
    id: 6,
    name: "Morado",
    image: require('../../assets/images/colors/morado-1.png')
  },
  {
    id: 7,
    name: "Morado",
    image: require('../../assets/images/colors/morado-2.png')
  },
  {
    id: 8,
    name: "Morado",
    image: require('../../assets/images/colors/morado-3.png')
  },
  {
    id: 9,
    name: "Rojo",
    image: require('../../assets/images/colors/rojo-1.png')
  },
  {
    id: 10,
    name: "Rojo",
    image: require('../../assets/images/colors/rojo-2.png')
  },
  {
    id: 11,
    name: "Rosado",
    image: require('../../assets/images/colors/rosado.png')
  },
  {
    id: 12,
    name: "Verde",
    image: require('../../assets/images/colors/verde-1.png')
  },
  {
    id: 13,
    name: "Verde",
    image: require('../../assets/images/colors/verde-2.png')
  }
];

export const Colors = ({ navigation }: any) => {
  const [questionCount, setQuestionCount] = useState(0)
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [currentOptions, setCurrentOptions] = useState<string[]>([]);
  const [currentImage, setCurrentImage] = useState(COLORS[0].image);

  function getRandomIndex() {
    let randomIndex = Math.floor(Math.random() * COLORS.length);
    while (randomIndex === currentIndex) {
      randomIndex = Math.floor(Math.random() * COLORS.length);
    }
    return randomIndex;
  }

  useEffect(() => {
    const Index = getRandomIndex();
    setCurrentImage(COLORS[Index].image)
    const Options = generateOptions(COLORS[Index].name);
    setCurrentOptions(Options);
    setCurrentIndex(Index);
  }, []);

  useEffect(() => {
    if (questionCount === 10) {
      gameFinish();
    } else {
      const Index = getRandomIndex();
      const Options = generateOptions(COLORS[Index].name);
      setCurrentImage(COLORS[Index].image)
      setCurrentIndex(Index);
      setCurrentOptions(Options);
    }
  }, [questionCount]);

  function generateOptions(name: string) {
    const showOptions = [name];
    let lastIndex = -1;

    [1, 2].map(item => {
      let newIndex = getRandomIndex();

      while (COLORS[newIndex]?.name === name || COLORS[newIndex]?.name === COLORS[lastIndex]?.name) {
        newIndex = getRandomIndex();
      }
      showOptions.push(COLORS[newIndex].name)
      lastIndex = newIndex;
    })

    return showOptions.sort();
  }

  function handleAnswer(option: string) {
    const isCorrect = option === COLORS[currentIndex].name;
    if (isCorrect) {
      setCorrectCount(correctCount + 1);
    } else {
      setIncorrectCount(incorrectCount + 1);
    }
    setQuestionCount(questionCount + 1);
  }

  const gameFinish = () => {
    Alert.alert(
      'EL JUEGO HA TERMINADO',
      `PUNTUACIÓN: ${correctCount}`,
      [
        {
          text: 'Repetir',
          onPress: () => resetGame()
        },
        {
          text: 'Aceptar',
          onPress: () => navigation.navigate('GameSelection')
        }
      ],
    );
  }

  function resetGame() {
    setQuestionCount(0);
    setCorrectCount(0);
    setIncorrectCount(0);
    const Index = getRandomIndex();
    const Options = generateOptions(COLORS[Index].name);
    setCurrentImage(COLORS[Index].image)
    setCurrentIndex(Index);
    setCurrentOptions(Options);
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle={"light-content"} backgroundColor={"black"} />

      <View style={{ flexDirection: "row", width: "80%", justifyContent: "space-between" }}>
        <View style={styles.scoreContainer}>
          <Image source={require('../../assets/images/check.png')} style={styles.imageCheck} resizeMode="contain" />
          <Text style={styles.score}>{correctCount}</Text>
        </View>
        <View style={styles.scoreContainer}>
          <Image source={require('../../assets/images/cancel.png')} style={styles.imageX} resizeMode="contain" />
          <Text style={styles.score}>{incorrectCount}</Text>
        </View>
      </View>

      <View style={styles.colorBox}>
        <Image style={styles.imageBox} source={currentImage}></Image>
      </View>
      <Text style={styles.question}>{'¿De qué color es el traje?'}</Text>
      {currentOptions.length > 0 && currentOptions.map((option, index) => (
        <TouchableOpacity key={index} style={styles.optionButton} onPress={() => handleAnswer(option)}>
          <Text style={styles.optionText}>{option}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 80,
    paddingHorizontal: 30,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: "black"
  },
  colorBox: {
    width: 250,
    height: 250,
    marginBottom: 20,
    borderColor: "white",
    justifyContent: "center",
    alignItems: "center",
    objectFit: "contain"
  },
  imageBox: {
    width: "90%",
    height: "90%",
    objectFit: "contain"
  },
  question: {
    fontSize: 24,
    marginBottom: 20,
    color: "white",
    fontFamily: "FredokaOne-Regular",
  },
  optionButton: {
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 5,
    width: 250,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  optionText: {
    fontSize: 18,
    color: "black",
    fontFamily: "FredokaOne-Regular",
  },
  score: {
    fontSize: 18,
    color: "white",
    fontFamily: "FredokaOne-Regular",
  },
  imageCheck: {
    width: 30,
    height: 30
  },
  imageX: {
    width: 25,
    height: 25
  },
  scoreContainer: {
    flexDirection: 'row',
    gap: 10
  }
});
