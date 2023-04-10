import React from "react";
import { Coordinate } from "../types/types";

const checkEastFoot = (
  head: Coordinate,
  food: Coordinate,
  area: number
): boolean => {
  const distanceBetweenFoodAndSnakeX: number = Math.abs(head.x - food.x);
  const distanceBetweenFoodAndSnakeY: number = Math.abs(head.y - food.y);

  return (
    distanceBetweenFoodAndSnakeX < area && distanceBetweenFoodAndSnakeY < area
  );
};

export default checkEastFoot;
