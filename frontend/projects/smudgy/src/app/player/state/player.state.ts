export interface Player {
  id: string;
  name: string;
}

export interface PlayerState {
  player?: Player;
  isLoggedIn: boolean;
}

export const initialState: PlayerState = {
  isLoggedIn: false,
};
