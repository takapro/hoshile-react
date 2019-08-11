import React, { createContext, useContext, useReducer } from 'react';
import User from './entity/User';

// action

export const LOGGED_IN: 'LOGGED_IN' = 'LOGGED_IN';
export const LOGGED_OUT: 'LOGGED_OUT' = 'LOGGED_OUT';

type Action =
  { type: typeof LOGGED_IN, userId: number | string, userName: string } |
  { type: typeof LOGGED_OUT };

// state

interface State {
  user: User | null;
}

const initialState: State = {
  user: null
};

// reducer

const reducer: React.Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case LOGGED_IN:
      return { ...state, user: { id: action.userId, name: action.userName } };

    case LOGGED_OUT:
      return { ...state, user: null };

    default:
      return state;
  }
};

// context

const StateContext = createContext(initialState);
const DispatchContext = createContext((action: Action) => {});

export const SessionProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        {children}
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};

export const useSessionState = (): State => {
  return useContext(StateContext);
};

export const useSessionDispatch = (): (action: Action) => void => {
  return useContext(DispatchContext);
};
