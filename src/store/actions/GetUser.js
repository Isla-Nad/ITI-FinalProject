import axios from "axios";

export const getUser = () => (dispatch) => {
  axios
    .get("http://127.0.0.1:8000/accounts/user/")
    .then((response) =>
      dispatch({
        type: "GET_USER",
        payload: response.data,
      })
    )
    .catch((error) => console.log(error));
};
