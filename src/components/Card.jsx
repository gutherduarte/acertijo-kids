import * as React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

export const Card = ({ onPress, isTurnedOver, children }) => {
  return (
    <Pressable
      style={isTurnedOver ? styles.cardUp : styles.cardDown}
      onPress={onPress}
    >
      {isTurnedOver ? (
        <Text style={styles.text}>{children}</Text>
      ) : (
        <Text style={styles.text}>?</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cardUp: {
    width: 100,
    height: 100,
    margin: 10,
    borderColor: "#97F425",
    borderWidth: 1.5,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E90C8E",
  },
  cardDown: {
    width: 100,
    height: 100,
    margin: 10,
    borderWidth: 1.5,
    borderColor: "white",
    borderRadius: 20,
    backgroundColor: "#1e293b",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 40,
    color: "white",
    fontFamily: "FredokaOne-Regular",
  },
});
