const INITIAL_VALUE = {
  list: [],
};

export default function Users(state = INITIAL_VALUE, action) {
  switch (action.type) {
    case "GET_USERS":
      return {
        ...state,
        list: action.payload,
      };
    default:
      return state;
  }
}
