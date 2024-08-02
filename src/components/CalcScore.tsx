import { diceActType, diceValueType } from "src/contexts/DiceContext";

type diceState = {
  id: number;
  diceValue: diceValueType;
  diceAct: diceActType;
};

export function CalcScore(fiveDice: diceState[], name: string, id: number) {
  let result: number = 0;
  const sameDiceCheck = (check: number[], k: number) => {
    fiveDice.map((dice) => {
      if (fiveDice[k].diceValue === dice.diceValue) {
        check[k] += 1;
      }
    });
  };
  const continueNumberCheck = (
    length: number,
    NumberOfCase: number,
    check: number[],
  ) => {
    for (let k = 1; k <= length; k++) {
      fiveDice.map((dice) => {
        for (let i = 0; i <= NumberOfCase - 1; i++) {
          if (dice.diceValue === i + k && check[i] === k - 1) {
            check[i] += 1;
          }
        }
      });
    }
  };

  for (let k = 1; k <= 6; k++) {
    if (id === k - 1) {
      fiveDice.map((dice) => {
        if (dice.diceValue === k) {
          result += k;
        }
      });
    }
  }
  if (name === "4 of a kind") {
    const check: number[] = [0, 0, 0, 0, 0];
    for (let k = 0; k < 5; k++) {
      sameDiceCheck(check, k);
    }
    if (check[0] >= 4 || check[1] >= 4) {
      for (let k = 0; k < 5; k++) {
        result += fiveDice[k].diceValue;
      }
    }
  } else if (name === "Full House") {
    const check: number[] = [0, 0, 0, 0, 0];
    for (let k = 0; k < 5; k++) {
      sameDiceCheck(check, k);
    }
    for (let k = 0; k < 5; k++) {
      if (check[k] === 2) {
        for (let i = k + 1; i < 5; i++) {
          if (check[i] === 3) {
            result = 2 * fiveDice[k].diceValue + 3 * fiveDice[i].diceValue;
          }
        }
      } else if (check[k] === 3) {
        for (let i = k + 1; i < 5; i++) {
          if (check[i] === 2) {
            result = 3 * fiveDice[k].diceValue + 2 * fiveDice[i].diceValue;
          }
        }
      }
    }
  } else if (name === "Small Straight") {
    const check: number[] = [0, 0, 0];
    continueNumberCheck(4, 3, check);
    if (check[0] === 4 || check[1] === 4 || check[2] === 4) {
      console.log(check[0]);
      result = 15;
    }
  } else if (name === "Large Straight") {
    const check: number[] = [0, 0];
    continueNumberCheck(5, 2, check);
    if (check[0] === 5 || check[1] === 5) {
      result = 30;
    }
  } else if (name === "Yacht") {
    const check: number[] = [0, 0, 0, 0, 0, 0];
    for (let k = 1; k <= 6; k++) {
      fiveDice.map((dice) => {
        if (k === dice.diceValue) {
          check[k - 1] += 1;
        }
      });
    }
    for (let k = 0; k < 6; k++) {
      if (check[k] === 5) result = 50;
    }
  } else if (name === "Choice") {
    fiveDice.map((dice) => (result += dice.diceValue));
  }
  return result;
}
