export default function signalReducer(state = false, action) {
  switch (action.type) {
    case "SIGNAL":
      return action.payload;
    default:
      return state;
  }
}
