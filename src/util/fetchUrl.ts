export type FetchState<T> = 'LOADING' | 'FAILED' | T;
export const LOADING: 'LOADING' = 'LOADING';
export const FAILED: 'FAILED' = 'FAILED';

export const fetchUrl = <T>(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  url: string,
  body: any, // eslint-disable-line @typescript-eslint/no-explicit-any
  setState: (state: FetchState<T>) => void
): void => {
  let init: RequestInit | undefined;
  if (method === 'GET') {
    if (body) {
      url += '?' + Object.keys(body).map(key => key + '=' + encodeURIComponent(body[key])).join('&');
    }
  } else {
    if (body) {
      init = { method, body: JSON.stringify(body) };
    } else {
      init = { method };
    }
  }

  fetch(url, init)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error();
      }
    })
    .then(json => setState(json))
    .catch(() => setState(FAILED));
};

export const fetchCase = <T, U = void>(
  state: FetchState<T>,
  success: (state: T) => U,
  failure?: (state: 'LOADING' | 'FAILED') => U
): U | undefined => {
  if (state !== LOADING && state !== FAILED) {
    return success(state);
  } else {
    return failure && failure(state);
  }
};
