const INITIAL_VALUE = {
  user: null,
};

export default function currentUserReducer(state = INITIAL_VALUE, action) {
  switch (action.type) {
    case "CURRENT_USER":
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
}
