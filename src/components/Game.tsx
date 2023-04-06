import React, { useEffect, useState } from "react";
import { PanGestureHandler } from "react-native-gesture-handler";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { Colors } from "../styles/colors";
import Header from "./Header";
import { Coordinate, Direction, GestureEventType } from "../types/types";

const SNAKE_INITIAL_POSITION = [{ x: 5, y: 5 }];
const FOOD_INITIAL_POSITION = { x: 5, y: 20 };
const GAME_BOUNDS = { xMin: 0, xMax: 35, yMin: 0, yMax: 63 };
const MOVE_INTERVAL = 50;
const SCORE_INCREMENT = 10;

const Game = (): JSX.Element => {
  const [direction, setDirection] = useState<Direction>(Direction.Right);
  const [snake, setSnake] = useState<Coordinate[]>(SNAKE_INITIAL_POSITION);
  const [food, setFood] = useState<Coordinate>(FOOD_INITIAL_POSITION);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  useEffect(() => {
    if (!isGameOver) {
      // moveSnake
    }
  }, [isGameOver]);

  const moveSnake = () => {
    const snakeHead = snake[0];
    const newHead = { ...snakeHead }; //create a copy of the snake

    // game over

    switch (direction) {
      case Direction.Up:
        newHead.y -= 1;
        break;
      case Direction.Down:
        newHead.y += 1;
        break;
      case Direction.Left:
        newHead.x -= 1;
        break;
      case Direction.Right:
        newHead.x += 1;
      default:
        break;
    }
  };

  const handlerGesture = (event: GestureEventType) => {
    const { translationX, translationY } = event.nativeEvent;
    // console.log(Direction);

    if (Math.abs(translationX) > Math.abs(translationY)) {
      if (translationX > 0) {
        setDirection(Direction.Right);
      } else {
        setDirection(Direction.Left);
      }
    } else {
      if (translationY > 0) {
        setDirection(Direction.Down);
      } else {
        setDirection(Direction.Up);
      }
    }
  };

  return (
    <PanGestureHandler onGestureEvent={handlerGesture}>
      <SafeAreaView style={styles.container}>
        {/* <Header> 
         </Header> */}
        <View style={styles.boundries}>
          <View style={styles.snake} />
          <View style={styles.snake} />
        </View>
      </SafeAreaView>
    </PanGestureHandler>
  );
};

export default Game;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  boundries: {
    flex: 1,
    borderWidth: 12,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    borderColor: Colors.primary,
    backgroundColor: Colors.background,
  },
  snake: {
    width: 20,
    height: 20,
    backgroundColor: "red",
  },
});
