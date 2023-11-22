export default function changeLangReduser(state = `${localStorage.getItem("LANGUAGE")}`, action) {
  switch (action.type) {
    case "CHANGE_LANG":
      return action.payload;
    default:
      return state;
  }
}
