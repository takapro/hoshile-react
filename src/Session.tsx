import React, { createContext, useContext, useReducer } from 'react';
import User from './entity/User';
import { CartEntry, mergeCart } from './entity/CartEntry';

// action

export const LOGGED_IN: 'LOGGED_IN' = 'LOGGED_IN';
export const LOGGED_OUT: 'LOGGED_OUT' = 'LOGGED_OUT';
export const MERGE_CART: 'MERGE_CART' = 'MERGE_CART';
export const CLEAR_CART: 'CLEAR_CART' = 'CLEAR_CART';

type Action =
  { type: typeof LOGGED_IN, userId: number | string, userName: string } |
  { type: typeof LOGGED_OUT } |
  { type: typeof MERGE_CART, cart: CartEntry[] } |
  { type: typeof CLEAR_CART };

// state

interface State {
  user: User | null;
  shoppingCart: CartEntry[];
}

const initialState: State = {
  user: null,
  shoppingCart: []
};

// reducer

const reducer: React.Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case LOGGED_IN:
      return { ...state, user: { id: action.userId, name: action.userName } };

    case LOGGED_OUT:
      return { ...state, user: null };

    case MERGE_CART:
      return { ...state, shoppingCart: mergeCart(state.shoppingCart, action.cart) };

    case CLEAR_CART:
      return { ...state, shoppingCart: [] };

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
