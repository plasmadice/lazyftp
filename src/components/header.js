import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import ModalButton from "./modalbutton"

const Logo = () => {
  const styles = {
    // paddingLeft: `1.45rem`,
    height: '100%',
    maxHeight: '10vh',
  }
  return <img style={styles} src={'lazyftp.svg'} alt="Logo" />
}

const Header = ({ siteTitle }) => (
  <header
    style={{
      background: `#00adb5`,
      // marginBottom: `1.45rem`,
      height: "10vh",
      display: "flex",
      width: "100%",
      justifyContent: "space-around",
    }}
  >

    <div
      style={{
        margin: `auto`,
        padding: `0 1.45rem`,
        flexBasis: "50%",
      }}
    >
      <Link
        to="/"
        style={{
          color: `white`,
          textDecoration: `none`,
        }}
      >
        <Logo />
      </Link>
    </div>
    <div
      style={{
        display: 'flex',
        width: '100%',
        flexBasis: "50%",
        margin: 'auto',
        justifyContent: 'flex-end',
        padding: `0 1.45rem`,
      }}
    >
      <ModalButton />
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
