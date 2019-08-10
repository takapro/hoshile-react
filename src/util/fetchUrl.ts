export const LOADING: 'LOADING' = 'LOADING';
export const FAILED: 'FAILED' = 'FAILED';
export type FetchState<T> = typeof LOADING | typeof FAILED | T;

export const fetchUrl = <T>(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  url: string,
  body: { [key: string]: any } | null, // eslint-disable-line @typescript-eslint/no-explicit-any
  setState: (state: FetchState<T>) => void
): () => void => {
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

  let alive = true;
  fetch(url, init)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error();
      }
    })
    .then(json => alive && setState(json))
    .catch(() => alive && setState(FAILED));

  return () => alive = false;
};

export const fetchCase = <T, U = void>(
  state: FetchState<T>,
  success: (state: T) => U,
  failure?: (state: typeof LOADING | typeof FAILED) => U
): U | undefined => {
  if (state !== LOADING && state !== FAILED) {
    return success(state);
  } else {
    return failure && failure(state);
  }
};
