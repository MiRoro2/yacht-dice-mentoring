import { Hands } from "src/constants/types";

import { DiceState } from "./Roll";

export function calculateScore(
  fiveDice: DiceState[],
  name: Hands,
  id: number,
): number {
  switch (name) {
    case Hands.Aces:
    case Hands.Deuces:
    case Hands.Threes:
    case Hands.Fours:
    case Hands.Fives:
    case Hands.Sixes:
      return (
        fiveDice.filter((dice) => dice.diceValue === id + 1).length * (id + 1)
      );

    case Hands.Choice:
      return fiveDice.reduce(
        (accumulate, dice) => accumulate + dice.diceValue,
        0,
      );

    case Hands.FourOfAKind: {
      const isFourOfAKind = fiveDice.find(
        (dice) =>
          fiveDice.filter((d) => d.diceValue === dice.diceValue).length >= 4,
      );

      if (!isFourOfAKind) return 0;

      return fiveDice.reduce(
        (accumulate, dice) => accumulate + dice.diceValue,
        0,
      );
    }

    case Hands.FullHouse: {
      const three = fiveDice.find(
        (dice) =>
          fiveDice.filter((d) => d.diceValue === dice.diceValue).length >= 3,
      );
      if (!three) return 0;

      const two = fiveDice.find(
        (dice) =>
          fiveDice.filter((d) => d.diceValue === dice.diceValue).length >= 2,
      );
      if (!two) return 0;

      return three.diceValue * 3 + two.diceValue * 2;
    }

    case Hands.SmallStraight: {
      const isSmallStraight =
        [1, 2, 3, 4].every((i) =>
          fiveDice.find((dice) => dice.diceValue === i),
        ) ||
        [2, 3, 4, 5].every((i) =>
          fiveDice.find((dice) => dice.diceValue === i),
        ) ||
        [3, 4, 5, 6].every((i) =>
          fiveDice.find((dice) => dice.diceValue === i),
        );
      return isSmallStraight ? 15 : 0;
    }

    case Hands.LargeStraight: {
      const isLargeStraight =
        [2, 3, 4, 5, 6].every((i) =>
          fiveDice.find((dice) => dice.diceValue === i),
        ) ||
        [1, 2, 3, 4, 5].every((i) =>
          fiveDice.find((dice) => dice.diceValue === i),
        );
      return isLargeStraight ? 30 : 0;
    }

    case Hands.Yacht: {
      const isYacht = fiveDice.every(
        (dice) =>
          fiveDice.filter((_dice) => _dice.diceValue === dice.diceValue)
            .length === 5,
      );
      return isYacht ? 50 : 0;
    }

    default:
      return 0;
  }
}
