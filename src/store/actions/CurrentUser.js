export const setCurrentUser = (payload) => {
  return {
    type: "CURRENT_USER",
    payload,
  };
};
