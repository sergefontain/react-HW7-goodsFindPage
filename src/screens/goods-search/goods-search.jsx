import React from "react"
import API from "./../../API"
import Spinner from "../../shared/components/spinner"
import { gql } from "graphql-request"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"

const query = gql`
  query goodFind($query: String) {
    GoodFind(query: $query) {
      name
      _id
      images {
        url
      }
      description
    }
  }
`

const mapStateToProps = (state) => ({
  goodsQueryFromRedux: state.goods.goodsQuery,
})

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    { goodsQuery: (payload) => ({ type: "QUERY_RESOLVE", payload }) },
    dispatch
  )

const SubComponent = ({ noData, status, children }) => {
  if (status === "searching") {
    return <Spinner />
  }

  if (noData) {
    return <div>No Data</div>
  }
  if (status === "idle") {
    return <span className="my-3">Search data</span>
  }
  if (status === "resolved") {
    return (
      <div className="row flex-sm-row mt-3">
        {children.props.children.map((x, index) => {
          return (
            <div className="card col-sm-4 my-2 mx-5" key={index.toString()}>
              {x.images && (
                <img
                  src={
                    x.images[0].url
                      ? `http://shop-roles.asmer.fs.a-level.com.ua/${x.images[0].url}`
                      : "http://"
                  }
                  className="card-img-top"
                  alt={x._id}
                />
              )}
              <div className="card-body">
                <h5 className="card-title">{x.name}</h5>
                <p className="card-text">
                  {x.description
                    ? x.description
                    : "Описания пока нет. Ожидайте"}
                </p>
                <a href="#" className="btn btn-primary">
                  Go somewhere
                </a>
              </div>
            </div>
          )
        })}
      </div>
    )
  }
}

const GoodsSearch = (props) => {
  const [result, setResult] = React.useState(null)
  const [status, setStatus] = React.useState("idle")

  const onChange = (e) => {
    const searchQuery = new RegExp(e.target.value)
    setStatus("searching")
    API.request(query, {
      query: JSON.stringify([
        {
          name: String(searchQuery),
        },
      ]),
    }).then((r) => {
      setResult(r.GoodFind)
      props.goodsQuery(r.GoodFind)
      setStatus("resolved")
    })
  }

  // console.log(result, "result", result !== null && result.length === 0);
  return (
    <div className="Container">
      <h1>Поиск товаров по всем категориям</h1>
      <div className="row">
        <Link className="col-sm-12 my-3" to="/">
          Go Home
        </Link>
      </div>
      <div className="row flex-sm-column align-items-sm-center">
        <div className="col-sm-6">
          <input className="form-control" type="search" onChange={onChange} />
        </div>
        <SubComponent
          noData={result !== null && result.length === 0}
          status={status}
        >
          <div>{result}</div>
        </SubComponent>
      </div>
    </div>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(GoodsSearch))
