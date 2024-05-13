export enum Sign {
  Rock = 'rock',
  Paper = 'paper',
  Scissors = 'scissors',
}

export const signValue: Record<Sign, number> = {
  [Sign.Rock]: 1,
  [Sign.Paper]: 2,
  [Sign.Scissors]: 3,
}

export type PossibleResult = 'win' | 'lose' | 'draw';

export type RoundChoice = {
  player1: Sign;
  player2: Sign;
};

export type GameStatus = 'setup' | 'playing' | 'end';

export type Player = {
  type: 'player' | 'computer';
  name: string;
}

export type PlayerScore = Player & {
  score: number;
}

export type APlayer = 'player1' | 'player2';

export type GameResults = {
  limit: number;
  winner?: APlayer;
  player1: PlayerScore;
  player2: PlayerScore;
};

export type SetupOutput = {
  limit: number;
  player1: Player;
  player2: Player;
}

