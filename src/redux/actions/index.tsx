import {SAVE_TOKEN, SAVE_USER} from './types';


//Action to save token
export const saveToken = (key: string) => ({
  type: SAVE_TOKEN,
  payload: key,
});
//Action to save userinfo
export const saveUser = (key: string) => ({
  type: SAVE_USER,
  payload: key,
});
