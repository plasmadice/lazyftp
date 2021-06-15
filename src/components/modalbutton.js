import React, { useState } from "react"
import { Modal, Header, Icon, Button } from "semantic-ui-react"

const ModalButton = () => {
  const [open, setOpen] = useState(false)

  return (
    <Modal
      closeIcon
      open={open}
      trigger={
        <Button>
          Now lazyftp.com | previously lazyanime.com (click for more)
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
        <p>
          -Updated domain and redirecting users from{" "}
          <a href="https://lazyanime.com/">lazyanime.com</a> to{" "}
          <a href="https://lazyftp.com/">lazyftp.com</a>
        </p>
        <p>
          -Confirmed normal ftp behavior for servers that require authentication
          (could use examples of ones that do not)
        </p>
        <p>-Added search feature</p>
        <p>
          -Enable Support for FTP downloads in Chrome: (copy
          `chrome://flags/#enable-ftp` into URL bar in Chrome and change to
          `Enabled`)
        </p>
        -Right-Click to Open in VLC using this{" "}
        <a
          target="_blank"
          rel="noreferrer"
          style={{ color: "red" }}
          href="https://chrome.google.com/webstore/detail/open-in-vlc-media-player/ihpiinojhnfhpdmmacgmpoonphhimkaj"
        >
          chrome extension
        </a>
        .{" & "}
        <a
          target="_blank"
          href="https://add0n.com/open-in-vlc.html"
          rel="noreferrer"
          style={{ color: "red" }}
        >
          FAQ
        </a>
        <br />
        -Download individual items (experimental)
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
