import { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, Text, View, StatusBar } from "react-native";
import { Card } from "../components/Card";
import Sound from 'react-native-sound';

const cards = [
  "🐷",
  "🌎",
  "👻",
  "🔑",
  "🥕",
  "🥑",
  // "🥹",
  // "🗣️",
  // "🦷",
  // "🍑",
  // "🌪️",
  // "🌎",
  // "👻",
  // "🥶",
  // "🥵",
];

const victorySound = new Sound(require('../../assets/sounds/congrats_sound.mp3'));
const tabSound = new Sound(require('../../assets/sounds/tab_sound.mp3'));

export const Memorize = () => {
  const [board, setBoard] = useState(() => shuffle([...cards, ...cards]));
  const [selectedCards, setSelectedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (selectedCards.length < 2) return;

    if (board[selectedCards[0]] === board[selectedCards[1]]) {
      setMatchedCards([...matchedCards, ...selectedCards]);
      setSelectedCards([]);
    } else {
      const timeoutId = setTimeout(() => setSelectedCards([]), 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [selectedCards]);

  const handleTapCard = (index) => {

    if (selectedCards.length >= 2 || selectedCards.includes(index)) return;

    tabSound.play((success) => {
        if (!success) {
          console.log('Error al reproducir el sonido');
        }
      });
    setSelectedCards([...selectedCards, index]);
    setScore(score + 1);
  };

  const didPlayerWin = () => {
    if (matchedCards.length === board.length) {
      victorySound.play((success) => {
        if (!success) {
          console.log('Error al reproducir el sonido');
        }
      });
    }

    return matchedCards.length === board.length;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={"light-content"} backgroundColor={"#1465BB"} />
      <Text style={styles.title}>
        {didPlayerWin() ? "¡LO LOGRASTE! 🎉" : "ENCUENTRA LOS PARES"}
      </Text>
      <View style={styles.board}>
        {board.map((card, index) => {
          const isTurnedOver =
            selectedCards.includes(index) || matchedCards.includes(index);
          return (
            <Card
              key={index}
              isTurnedOver={isTurnedOver}
              onPress={() => handleTapCard(index)}
            >
              {card}
            </Card>
          );
        })}
      </View>
      <Text style={styles.title}>Puntos: {score}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1465BB",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 85
  },
  board: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  title: {
    color: "white",
    fontSize: 20,
    fontFamily: "FredokaOne-Regular",
  },
});

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));

    // Swap the elements at i and randomIndex
    [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
  }
  return array;
}
