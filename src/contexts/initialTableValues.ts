import assets from "src/constants/assets";
import { Hands } from "src/constants/types";

import { PreScore, Table } from "./TableContext";

export const INITIAL_TABLE_VALUES: Table[] = [
  {
    id: 0,
    score: 0,
    name: Hands.Aces,
    img: assets.icons.aces,
    isChosen: false,
  },
  {
    id: 1,
    score: 0,
    name: Hands.Deuces,
    img: assets.icons.deuces,
    isChosen: false,
  },
  {
    id: 2,
    score: 0,
    name: Hands.Threes,
    img: assets.icons.threes,
    isChosen: false,
  },
  {
    id: 3,
    score: 0,
    name: Hands.Fours,
    img: assets.icons.fours,
    isChosen: false,
  },
  {
    id: 4,
    score: 0,
    name: Hands.Fives,
    img: assets.icons.fives,
    isChosen: false,
  },
  {
    id: 5,
    score: 0,
    name: Hands.Sixes,
    img: assets.icons.sixes,
    isChosen: false,
  },
  {
    id: 6,
    score: 0,
    name: Hands.Choice,
    img: assets.icons.choice,
    isChosen: false,
  },
  {
    id: 7,
    score: 0,
    name: Hands.FourOfAKind,
    img: assets.icons.fourOfKind,
    isChosen: false,
  },
  {
    id: 8,
    score: 0,
    name: Hands.FullHouse,
    img: assets.icons.fullHouse,
    isChosen: false,
  },
  {
    id: 9,
    score: 0,
    name: Hands.SmallStraight,
    img: assets.icons.smallStraight,
    isChosen: false,
  },
  {
    id: 10,
    score: 0,
    name: Hands.LargeStraight,
    img: assets.icons.largeStraight,
    isChosen: false,
  },
  {
    id: 11,
    score: 0,
    name: Hands.Yacht,
    img: assets.icons.yacht,
    isChosen: false,
  },
];

export const INITIAL_PRESCORE_VALUES: PreScore[] = [
  { id: 0, value: null },
  { id: 1, value: null },
  { id: 2, value: null },
  { id: 3, value: null },
  { id: 4, value: null },
  { id: 5, value: null },
  { id: 6, value: null },
  { id: 7, value: null },
  { id: 8, value: null },
  { id: 9, value: null },
  { id: 10, value: null },
  { id: 11, value: null },
];
