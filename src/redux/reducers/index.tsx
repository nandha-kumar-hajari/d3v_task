import {SAVE_TOKEN, SAVE_USER} from '../actions/types';

const initialState = {
  token: '',
  userData: [],
};

const Reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SAVE_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    case SAVE_USER:
      return {
        ...state,
        userData: action.payload,
      };

    default:
      return state;
  }
};

export default Reducer;
