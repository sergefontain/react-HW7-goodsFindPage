const initialState = {
  goodsQuery: null,
}

const goodsReducer = (state=initialState, action) => {
  switch (action.type) {
    case "QUERY_RESOLVE":
      return { ...state, goodsQuery: action.payload }
    default:
      return state
  }
}

export default goodsReducer
