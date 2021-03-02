import React from "react"
import { Grid, Dropdown, Button, Menu } from "semantic-ui-react"

const Navigation = ({ sort, setSort, goHome, goBack, disconnect }) => {
  // sort menu (changes to sort state triggers buildItems())
  const sortNameAscending = () => {
    setSort("A-Z (Default)")
  }
  const sortNameDescending = () => {
    setSort("Z-A")
  }
  const sortDateAscending = () => {
    setSort("Oldest")
  }
  const sortDateDescending = () => {
    setSort("Newest")
  }

  return (
    <Grid
      stackable
      columns={2}
      textAlign="center"
      style={{
        maxHeight: "15vh",
        pointerEvents: "none",
        margin: "10px auto 50px auto",
      }}
    >
      <Grid.Row style={{ float: "left" }}>
        <Grid.Column>
          <Button.Group floated="left" style={{ pointerEvents: "auto" }}>
            <Button color="grey" onClick={() => goHome()}>
              Home
            </Button>
            <Button color="grey" onClick={() => goBack()}>
              Back
            </Button>
            <Button color="black" onClick={() => disconnect()}>
              Disconnect
            </Button>
          </Button.Group>
        </Grid.Column>
        <Grid.Column>
          <Menu floated="right" compact style={{ pointerEvents: "auto" }}>
            <Dropdown item text={`Sort By: ${sort}`}>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => sortNameAscending()}>
                  A-Z (Default)
                </Dropdown.Item>
                <Dropdown.Item onClick={() => sortNameDescending()}>
                  Z-A
                </Dropdown.Item>
                <Dropdown.Item onClick={() => sortDateAscending()}>
                  Oldest
                </Dropdown.Item>
                <Dropdown.Item onClick={() => sortDateDescending()}>
                  Newest
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Menu>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

export default Navigation
