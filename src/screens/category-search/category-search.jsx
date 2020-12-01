import React from "react"
import API from "./../../API"
import Spinner from "../../shared/components/spinner"
import { gql } from "graphql-request"
import { Link } from "react-router-dom"

const query = gql`
  query categoryFind($query: String) {
    CategoryFind(query: $query) {
      name
      _id
    }
  }
`

const StatusResolver = ({ status, noData, children }) => {
  if (status === "searching") {
    return <Spinner />
  }

  if (noData) {
    return <span>No Data</span>
  }
  if (status === "idle") {
    return <span className="my-3">Search data</span>
  }
  if (status === "resolved") {
    return <div className="mt-3">{children}</div>
  }
}
const CategorySearch = () => {
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
    }).then((d) => {
      setResult(d.CategoryFind)
      setStatus("resolved")
    }, console.log)
  }

  // console.log(result, "result", result !== null && result.length === 0);
  return (
    <div className="Container"><h1>Поиск категории товаров</h1>

      <div className="row">
        <Link className="col-sm-12 my-3" to="/">
          Go Home
        </Link>
      </div>
      <div className="row flex-sm-column align-items-sm-center">
        <div className="col-sm-6">
          <input className="form-control" type="search" onChange={onChange} />
        </div>
          <StatusResolver
            noData={result !== null && result.length === 0}
            status={status}
          >
            <div>{JSON.stringify(result)}</div>
          </StatusResolver>
      </div>
    </div>
  )
}

export default CategorySearch
