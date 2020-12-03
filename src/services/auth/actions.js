import { gql } from "graphql-request"
import API, { myFetch } from "./../../API"

// const loginQuery = gql`
//   query auth($login: String!, $password: String!) {
//     login(login: $login, password: $password)
//   }
// `
const query = `
query auth($login: String!, $password: String!) {
  login(login: $login, password: $password)
}
`
export const login = (values) => async (dispatch) => {
  try {
    dispatch({ type: "login/pending" })
    // const { token } = await api.request(loginQuery, values)

    // const { login: token } = await API.request(loginQuery, values)
    const { login: token } = await myFetch(query, values)

    if (!token) {
      dispatch({ type: "login/rejected" })
    }
    localStorage.setItem("token", token)
    API.setHeader("Authorization", `Bearer ${token}`)
    dispatch({ type: "login/resolved" })
  } catch (error) {
    dispatch({ type: "login/rejected" })
  }
}
