import path from "path";

interface Assets {
  [key: string]: string | Assets;
}

const assetsPaths = {
  buttons: {
    endRoll: "EndRollButton.svg", // /assets/buttons/EndRollButton.svg
    firstRoll: "FirstRollButton.svg",
    lastRoll: "LastRollButton.svg",
    reRoll: "ReRollButton.svg",
  },
  dices: {
    dice1: "Dice1.svg",
    dice2: "Dice2.svg",
    dice3: "Dice3.svg",
    dice4: "Dice4.svg",
    dice5: "Dice5.svg",
    dice6: "Dice6.svg",
    dice1Glow: "Dice1Glow.svg",
    dice2Glow: "Dice2Glow.svg",
    dice3Glow: "Dice3Glow.svg",
    dice4Glow: "Dice4Glow.svg",
    dice5Glow: "Dice5Glow.svg",
    dice6Glow: "Dice6Glow.svg",
  },
  icons: {
    aces: "Aces.svg",
    deuces: "Deuces.svg",
    threes: "Threes.svg",
    fours: "Fours.svg",
    fives: "Fives.svg",
    sixes: "Sixes.svg",
    choice: "Choice.svg",
    fourOfKind: "4_of_a_kind.svg",
    fullHouse: "Full_House.svg",
    largeStraight: "Large_Straight.svg",
    smallStraight: "Small_Straight.svg",
    yacht: "Yacht.svg",
  },
  refresh: "Refresh.svg",
};

const generatePaths = (basePath: string, obj: Assets): Assets => {
  const result: Assets = {};

  for (const key in obj) {
    if (typeof obj[key] === "object") {
      result[key] = generatePaths(path.join(basePath, key), obj[key] as Assets);
    } else {
      result[key] = path.join(basePath, obj[key] as string);
    }
  }

  return result;
};

const baseAssetsPath = "/assets";

// @ts-ignore
const assets: typeof assetsPaths = generatePaths(baseAssetsPath, assetsPaths);

export default assets;
