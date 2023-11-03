const INITIAL_VALUE = {
  user: {},
};

export default function User(state = INITIAL_VALUE, action) {
  switch (action.type) {
    case "GET_USER":
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
}
