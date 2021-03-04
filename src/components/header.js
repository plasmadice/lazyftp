import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import Messages from "./messages"

const Header = ({ siteTitle }) => (
  <header
    style={{
      background: `#00adb5`,
      marginBottom: `1.45rem`,
      display: "flex",
      justifyContent: "space-around",
    }}
  >
    <div
      style={{
        // margin: `0 auto`,
        maxWidth: 960,
        padding: `1.45rem`,
        flexBasis: "65%",
      }}
    >
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          {siteTitle}
        </Link>
      </h1>
    </div>
    <div style={{ margin: "auto", flexBasis: "auto" }}>
      <Messages />
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
