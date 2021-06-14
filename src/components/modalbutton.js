import React, { useState } from "react"
import { Modal, Header, Icon, Button } from "semantic-ui-react"

const ModalButton = () => {
  const [open, setOpen] = useState(false)

  return (
    <Modal
      closeIcon
      open={open}
      trigger={<Button>View Updates & Changes (Updated 6/13/2021)</Button>}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    >
      <Header icon="archive" content="Features & Fixes" />
      <Modal.Content>
        <p>
          Enable Support for FTP downloads in Chrome: (copy
          `chrome://flags/#enable-ftp` into URL bar in Chrome and change to
          `Enabled`)
        </p>
      </Modal.Content>
      <Modal.Content>
        Right-Click to Open in VLC using this{" "}
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
      </Modal.Content>
      <Modal.Content>Download individual items (experimental)</Modal.Content>
      <Modal.Actions>
        <Button color="green" onClick={() => setOpen(false)}>
          <Icon name="checkmark" /> Close
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default ModalButton
