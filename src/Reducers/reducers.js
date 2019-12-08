//Update reducers here

import { TEST_ACTION } from '../Actions/actions'

const initialState = {
  value : 0
}

const dataReducer = (state = initialState, action) => {
    switch (action.type) {
      case TEST_ACTION: {
          let newState = {};
          if(action.value !== undefined) {
              newState.value = action.value;
          }
          return Object.assign({}, state, newState);
      }
      default:
        return state
    }
};

export default dataReducer;