import {SAVE_TOKEN, SAVE_REFRESH_TOKEN, SAVE_USER} from './types';

export const saveToken = (key: string) => ({
  type: SAVE_TOKEN,
  payload: key,
});

export const saveUser = (key: string) => ({
  type: SAVE_USER,
  payload: key,
});
