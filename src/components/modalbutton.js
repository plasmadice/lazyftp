import React, { useState } from "react"
import { Modal, Header, Icon, Button } from "semantic-ui-react"

const ModalButton = () => {
  const [open, setOpen] = useState(false)

  return (
    <Modal
      // style={{ maxWidth: "20rem" }}
      size="small"
      closeIcon
      open={open}
      trigger={
        <Button size="tiny">
          Click to view updates and news
        </Button>
      }
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    >
      <Header icon="archive" content="Features, Fixes, & News" />
      <Modal.Content>
        <h2>
          Report issues on{" "}
          <a
            href="https://github.com/plasmadice/lazy-ftp/issues"
            rel="noreferrer"
            target="_blank"
          >
            Github
          </a>
        </h2>
        <div style={{margin: 20, padding: 0}}>
          <h3>Updates</h3>
          <div style={{margin: 5}}>
            <b>02/03/2023</b>
            <p style={{margin: 0}}>-Fixed issue where search was not filtering properly</p>
            <p style={{margin: 0}}>-Removed site statistics</p>
            <p style={{margin: 0}}>-Sort by Newest/Oldest fixed</p>
          </div>
          <div style={{margin: 5}}>
            <b>Previous</b>
            <p>
              -Updated domain and redirecting users from{" "}
              <a href="https://lazyanime.com/">lazyanime.com</a> to{" "}
              <a href="https://lazyftp.com/">lazyftp.com</a>
            </p>
          </div>
        </div>
        
        <p>
          -Right-Click to Open in VLC using this{" "}
          <a
            target="_blank"
            rel="noreferrer"
            style={{ color: "red" }}
            href="https://add0n.com/open-in-vlc.html"
          >
            extension
          </a>
          . Confirmed working on Chrome and Edge. May be possible in Firefox and Opera.
        </p>
        <p>
          -Confirmed normal ftp behavior for servers that require authentication
          (could use examples of ones that do not or examples of it not working)
        </p>
        <p>
          -Enable Support for FTP downloads in Chrome: (copy
          `chrome://flags/#enable-ftp` into URL bar in Chrome and change to
          `Enabled`) May be removed in future versions of Chrome.
        </p>

      </Modal.Content>
      <Modal.Actions>
        <Button color="green" onClick={() => setOpen(false)}>
          <Icon name="checkmark" /> Close
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default ModalButton
