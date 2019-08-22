// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const valueHandler = <T>(setValue: (value: T) => void): (event: any) => void => {
  return event => setValue(event.target.value);
};
