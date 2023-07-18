import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar, Image, Alert} from 'react-native';

export const MathGame = ({ navigation }) => {
  const [questionCount, setQuestionCount] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(generateQuestion());
  const [userAnswer, setUserAnswer] = useState('');
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [correctAnswerToSHow, setCorrectAnswerToSHow] = useState();

  function randomBetween (min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  function generateQuestion() {
    const num1 = randomBetween(1, 25);
    const num2 = randomBetween(1, 25);
    const operator = num1 < num2 ? '+' : '-';
    const answer = operator === '+' ? num1 + num2 : num1 - num2;
    return { num1, operator, num2, answer };
  }

  function handleAnswer() {
    const { answer } = currentQuestion;
    const parsedAnswer = parseInt(userAnswer);
    if (parsedAnswer === answer) {
      setCorrectCount(correctCount + 1);
    } else {
      setIncorrectCount(incorrectCount + 1);
      setCorrectAnswerToSHow(answer);
      setShowCorrectAnswer(true);
    }
    setQuestionCount(questionCount + 1);
    setUserAnswer('');

    if (questionCount === 9) {
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
    } else {
      setCurrentQuestion(generateQuestion());
      setTimeout(() => {
        setShowCorrectAnswer(false);
      }, 1500);
    }
  }

  function resetGame() {
    setQuestionCount(0);
    setCorrectCount(0);
    setIncorrectCount(0);
    setCurrentQuestion(generateQuestion());
    setUserAnswer('');
    setShowCorrectAnswer(false);
  }

  return (
    <View style={styles.container}>
     <StatusBar barStyle={"dark-content"} backgroundColor={"#DAFFFB"} />

      <View style={{flexDirection: "row", width: "80%", justifyContent: "space-between"}}>
        <View style={styles.scoreContainer}>
          <Image source={require('../../assets/images/check.png')} style={styles.imageCheck} resizeMode="contain" />
          <Text style={styles.score}>{correctCount}</Text>
        </View>
        <View style={styles.scoreContainer}>
          <Image source={require('../../assets/images/cancel.png')} style={styles.imageX} resizeMode="contain" />
          <Text style={styles.score}>{incorrectCount}</Text>
        </View>
      </View>

      <Text style={styles.question}>¿Cuál es el resultado de la siguiente operación?</Text>
      
      {showCorrectAnswer && (
        <Text style={styles.correctAnswer}>
          {`La respuesta correcta era ${correctAnswerToSHow}`}
        </Text>
      )}

      <View style={{ gap: 20, justifyContent: 'space-between', alignItems: 'center'}}>
        <View style={{flexDirection: "row", gap: 20, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={styles.question}>
            {`${currentQuestion.num1} ${currentQuestion.operator} ${currentQuestion.num2} = `}
          </Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={userAnswer}
            onChangeText={setUserAnswer}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleAnswer}>
          <Text style={styles.buttonText}>RESPONDER</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: "#DAFFFB",
    width: "100%", 
    paddingBottom: 50
  },
  question: {
    fontSize: 24,
    marginBottom: 20,
    color: "#001C30",
    fontFamily: "FredokaOne-Regular",
  },
  input: {
    width: 100,
    height: 50,
    fontSize: 24,
    color: "#176B87",
    borderColor: '#176B87',
    borderWidth: 1,
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: "FredokaOne-Regular",
  },
  correctAnswer: {
    color: 'red',
    marginBottom: 10,
    fontSize: 18,
    fontFamily: "FredokaOne-Regular",
  },
  button: {
    backgroundColor: '#001C30',
    padding: 10,
    borderRadius: 5,
    width: 200,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: '#DAFFFB',
    fontSize: 16,
    fontFamily: "FredokaOne-Regular",
  },
  score: {
    fontSize: 18,
    color: "#001C30",
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
