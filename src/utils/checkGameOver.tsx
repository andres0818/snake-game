import { Coordinate } from "../types/types";

import React from "react";

export const checkGameOver = (
  snakeHead: Coordinate,
  boundaries: any
): boolean => {
  return (
    snakeHead.x < boundaries.xMin ||
    snakeHead.x > boundaries.xMax ||
    snakeHead.y < boundaries.yMin ||
    snakeHead.y > boundaries.yMax
  );
};
