import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import ModalButton from "./modalbutton"
import { Grid } from 'semantic-ui-react'
import Stats from './stats'


const Logo = () => {
  const styles = {
    // paddingLeft: `1.45rem`,
    height: '100%',
    maxHeight: '10vh',
    minWidth: '80px',
    minHeight: '80px'
  }
  return <img style={styles} src={'lazyftp.svg'} alt="Logo" />
}

const Header = () => (
  <header
    style={{
      background: `#00adb5`,
      // marginBottom: `1.45rem`,
      // padding: '5px 0',
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
    <Grid style={{
      display: 'flex',
      flexDirection: 'column',
      width: '50%',
      flexBasis: "50%",
      margin: 'auto',
      justifyContent: 'flex-end',
      padding: `0 1.45rem`,
    }}>
      <Grid.Row>
        <ModalButton />
      </Grid.Row>

      <Grid.Row style={{ paddingRight: '2rem' }}>
        <Stats />
      </Grid.Row>

    </Grid>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
