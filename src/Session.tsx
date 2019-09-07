import React, { createContext, useContext, useReducer } from 'react';
import { USER_API } from './config';
import { fetchUrl } from './util/fetchUrl';
import User from './entity/User';
import { CartEntry, mergeCart } from './entity/CartEntry';

// action

export const LOGGED_IN = 'LOGGED_IN';
export const LOGGED_OUT = 'LOGGED_OUT';
export const MERGE_CART = 'MERGE_CART';
export const CLEAR_CART = 'CLEAR_CART';

type Action =
  { type: typeof LOGGED_IN, user: User } |
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

// middleware (?)

const updateShoppingCart = (user: User | null, shoppingCart: CartEntry[]): void => {
  if (user) {
    const body = { shoppingCart: JSON.stringify(shoppingCart) };
    fetchUrl('PUT', USER_API + '/shoppingCart', user.token, body, state => {});
  }
};

// reducer

const reducer: React.Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case LOGGED_IN:
      return { ...state, user: action.user };

    case LOGGED_OUT:
      return { ...state, user: null };

    case MERGE_CART:
      const shoppingCart = mergeCart(state.shoppingCart, action.cart);
      updateShoppingCart(state.user, shoppingCart);
      return { ...state, shoppingCart };

    case CLEAR_CART:
      updateShoppingCart(state.user, []);
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
