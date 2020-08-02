import React, { useReducer } from 'react';
import { FAILED } from './fetchUrl';

export const START = 'START';
const SUCCEEDED = 'SUCCEEDED';
type FetchAction = typeof START | typeof FAILED | typeof SUCCEEDED;

export interface FetchControl {
  started: boolean;
  failed: boolean;
}

const reducer = (state: FetchControl, action: FetchAction): FetchControl => {
  switch (action) {
    case START:
      return { started: true, failed: false };

    case FAILED:
      return { started: false, failed: true };

    case SUCCEEDED:
      return { started: false, failed: false };
  }
};

export const setFetchResult = <T>(
  dispatch: React.Dispatch<FetchAction>,
  setResult: (result: T) => void
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
) => (state: typeof FAILED | T) => {
  if (state === FAILED) {
    dispatch(FAILED);
  } else {
    dispatch(SUCCEEDED);
    setResult(state);
  }
};

export const useFetchReducer = (): [FetchControl, React.Dispatch<FetchAction>] => {
  return useReducer(reducer, { started: false, failed: false });
};
