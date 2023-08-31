import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const DEFAULT_STATE = [
  {
    id: "1",
    name: "Peter Doe",
    email: "peterdoe@email.cl",
    github: "peterdoe"
  },
  {
    id: "2",
    name: "Rodrigo Oteiza",
    email: "roteiza@email.cl",
    github: "roteiza"
  },
  {
    id: "3",
    name: "Pepito Salinas",
    email: "peposalinas@gmail.cl",
    github: "peposalinas"
  },
  {
    id: "4",
    name: "Larry Doe",
    email: "larrydoe@outlook.com",
    github: "larrydoe"
  },
  {
    id: "5",
    name: "Cristiano Ronaldo",
    email: "cr7@email.cl",
    github: "crisronaldo"
  }
];

export interface User {
  name: string;
  email: string;
  github: string;
}

export type UserId = string;

export interface UserWithId extends User {
  id: UserId;
}

const initialState: UserWithId[] = (() => {
  const persistedData = localStorage.getItem('__redux__state__');
  return persistedData ? JSON.parse(persistedData).users : DEFAULT_STATE;
})();

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addNewUser: (state, action: PayloadAction<User>) => {
      const id = crypto.randomUUID();
      state.push({ id, ...action.payload });
    },
    deleteUserById: (state, action: PayloadAction<UserId>) => {
      const id = action.payload;
      return state.filter((user) => user.id !== id)
    },
    rollbackUser: (state, action: PayloadAction<UserWithId>) => {
      const isUserAlreadyDefined = state.some(user => user.id === action.payload.id);
      if (!isUserAlreadyDefined) {
        return [...state, action.payload];
      }
    }
  }
})

export default userSlice.reducer;

export const { addNewUser, deleteUserById, rollbackUser } = userSlice.actions;
