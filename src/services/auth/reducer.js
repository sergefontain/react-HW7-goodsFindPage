const initialState = {
  isLoggedIn: !!localStorage.getItem("token"),
  status: "idle",
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "login/pending":
      return {
        ...state,
        status: "pending",
      }
    case "login/resolved":
      return {
        ...state,
        status: "resolved",
        isLoggedIn: true,
      }
    case "login/rejected":
      return {
        ...state,
        status: "rejected",
        isLoggedIn: false,
      }
    case "logout":
      return {
        ...state,
        status: "logged out",
        isLoggedIn: false,
      }
    default:
      return state
  }
}

export default authReducer
