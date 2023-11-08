import axios from "axios";

export const getUsers = () => (dispatch) => {
  axios
    .get("https://retoolapi.dev/J8jOPq/users")
    .then((response) =>
      dispatch({
        type: "GET_USERS",
        payload: response.data,
      })
    )
    .catch((error) => console.log(error));
};
