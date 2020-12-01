import React from "react"

import CategoryList from "./components/category-list"
import Spinner from "./../../shared/components/spinner"
import useQuery from "./../../shared/hooks/use-query"
import { gql } from "graphql-request"
import { ENDPOINT } from "./../../API"

const query = gql`
  query {
    CategoryFind(query: "[{}]") {
      name
      _id
      subCategories {
        name
        _id
        image {
          url
        }
      }
      image {
        url
      }
    }
  }
`

const HomeScreen = () => {
  const { data, status } = useQuery({
    query,
    initialState: { CategoryFind: [] },
  })
  // console.log(data, status)
  const onChange = (e) => {
    const formData = new FormData()

    formData.append("photo", e.target.files[0])

    fetch(`${ENDPOINT}/upload`, {
      method: "POST",
      headers: localStorage.token
        ? { Authorization: "Bearer " + localStorage.token }
        : {},
      body: formData,
    })
      .then((res) => res.json())
      .then((json) => console.log("UPLOAD RESULT", json))
  }

  return (
    <div className="mt-3">
      Home screen
      <form>
        <input onChange={onChange} type="file" name="photo" id="photo" />
      </form>
    </div>
  )
}

export default HomeScreen
