import React, { useEffect, useState } from "react";
import { PanGestureHandler } from "react-native-gesture-handler";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Colors } from "../styles/colors";
import Header from "./Header";
import { Coordinate, Direction, GestureEventType } from "../types/types";
import Snake from "./Snake";
import { checkGameOver } from "../utils/checkGameOver";
import Food from "./Food";
import checkEastFoot from "../utils/checkEastFoot";
import randomFoodPosition from "../utils/randomFoodPosition";
import Score from "./Score";

const SNAKE_INITIAL_POSITION = [{ x: 5, y: 5 }];
const FOOD_INITIAL_POSITION = { x: 5, y: 20 };
const GAME_BOUNDS = { xMin: 0, xMax: 34.5, yMin: 0, yMax: 69 };
const MOVE_INTERVAL = 50;
const SCORE_INCREMENT = 10;

function getRandomFruitEmoji() {
  const fruitEmojis = ["🍎", "🍊", "🍋", "🍇", "🍉", "🍓", "🍑", "🍍"];
  const randomIndex = Math.floor(Math.random() * fruitEmojis.length);
  return fruitEmojis[randomIndex];
}

const Game = (): JSX.Element => {
  const [direction, setDirection] = useState<Direction>(Direction.Right);
  const [snake, setSnake] = useState<Coordinate[]>(SNAKE_INITIAL_POSITION);
  const [food, setFood] = useState<Coordinate>(FOOD_INITIAL_POSITION);
  const [score, setScore] = useState<number>(0);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [fruits, setFruits] = useState<string>(getRandomFruitEmoji());

  useEffect(() => {
    if (!isGameOver) {
      const intervalID = setInterval(() => {
        !isPaused && moveSnake();
      }, MOVE_INTERVAL);
      return () => clearInterval(intervalID);
    }
  }, [isGameOver, snake, isPaused]);

  const moveSnake = () => {
    const snakeHead = snake[0];
    const newHead = { ...snakeHead }; //create a copy of the snake

    if (checkGameOver(snakeHead, GAME_BOUNDS)) {
      setIsGameOver((prev) => !prev);
      return;
    }
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

    if (checkEastFoot(newHead, food, 1)) {
      setFruits(getRandomFruitEmoji());
      setFood(randomFoodPosition(GAME_BOUNDS.xMax, GAME_BOUNDS.yMax));
      setSnake([newHead, ...snake]);
      setScore(score + SCORE_INCREMENT);
    } else {
      setSnake([newHead, ...snake.slice(0, -1)]); //move snake
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

  const reloadGame = () => {
    setSnake(SNAKE_INITIAL_POSITION);
    setFood(FOOD_INITIAL_POSITION);
    setIsGameOver(false);
    setScore(0);
    setDirection(Direction.Right);
    setIsPaused(false);
  };

  const pauseGame = () => {
    setIsPaused(!isPaused);
  };

  return (
    <PanGestureHandler onGestureEvent={handlerGesture}>
      <SafeAreaView style={styles.container}>
        <Header
          reloadGame={reloadGame}
          isPaused={isPaused}
          pauseGame={pauseGame}
        >
          <Score score={score} />
        </Header>
        <View style={styles.boundries}>
          <Snake snake={snake} />
          <Food x={food.x} y={food.y} randomFood={fruits} />
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
});
