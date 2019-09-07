export const LOADING = 'LOADING';
export const FAILED = 'FAILED';
export type FetchState<T> = typeof LOADING | typeof FAILED | T;

export const fetchUrl = <T>(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  url: string,
  token: string | null,
  body: { [key: string]: any } | null, // eslint-disable-line @typescript-eslint/no-explicit-any
  setState: (state: typeof FAILED | T) => void
): () => void => {
  let init: RequestInit | undefined;
  if (method === 'GET') {
    if (body) {
      url += '?' + Object.keys(body).map(key => key + '=' + encodeURIComponent(body[key])).join('&');
    }
    if (token) {
      init = {
        method,
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      };
    }
  } else {
    init = {
      method,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': 'Bearer ' + token } : {})
      },
      body: JSON.stringify(body)
    };
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
    .then(json => {
      if (json) {
        return alive && setState(json);
      } else {
        throw Error();
      }
    })
    .catch(ex => {
      return alive && setState(FAILED);
    });

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
