import { GameResults, Player, RoundChoice, SetupOutput, Sign } from "../../../../shared/types";


// Mock data to be used in testing the play components
export const mockPlayer: Player = {
  type: 'player',
  name: 'Player 1'
};

export const mockSetup: SetupOutput = {
  limit: 1,
  player1: {
    type: 'player',
    name: 'Player 1',
  },
  player2: {
    type: 'player',
    name: 'Player 2',
  }
};

export const mockRoundChoices: RoundChoice = {
  player1: Sign.Rock,
  player2: Sign.Scissors,
};

export const mockResults: GameResults = {
  limit: 1,
  player1: {
    type: 'player',
    name: 'Player 1',
    score: 1
  },
  player2: {
    type: 'player',
    name: 'Player 2',
    score: 0
  },
  winner: 'player1',
};