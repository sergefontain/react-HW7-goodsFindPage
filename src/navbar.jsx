import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { bindActionCreators } from "redux"


const Logout = ({logout}) => {
  const handleLogout =()=> {
    localStorage.removeItem("token")
    logout()
  } 
  
  return <button onClick={handleLogout}>logout</button>
}

const NavBar = ({isLoginTrue,logoutToProps}) => {

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/category/search">
              Search Category
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/category/goods">
              Search Goods
            </Link>
          </li>
          <li className="nav-item">{isLoginTrue && <Logout logout={logoutToProps}/>}</li>
        </ul>
      </div>
    </nav>
  )
}

const mapStateToProps = (state) => ({
  isLoginTrue: state.auth.isLoggedIn,
})

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      logoutToProps: () => ({ type: "logout" }),
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
