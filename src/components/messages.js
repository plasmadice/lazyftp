import React, { useState } from "react"
import { Message } from "semantic-ui-react"

const Messages = () => {
  const [visible, setVisible] = useState(false)

  const handleClick = () => {
    setVisible(!visible) // swaps visibility
  }

  if (visible) {
    return (
      <Message info compact floating onDismiss={handleClick}>
        <Message.Header>Features & Fixes</Message.Header>
        <Message.List>
          NEW (6/13/2021)
          <Message.Item>
            Enable Support for FTP downloads in Chrome: (copy
            `chrome://flags/#enable-ftp` into URL bar in Chrome and change to
            `Enabled`)
          </Message.Item>
          <Message.Item>
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
          </Message.Item>
          <Message.Item>Download individual items (experimental)</Message.Item>
        </Message.List>
      </Message>
    )
  } else {
    return (
      <a
        style={{ color: "yellow", fontSize: "1.3em", cursor: "pointer" }}
        onClick={handleClick}
      >
        View Updates & Changes (Updated 6/13/2021)
      </a>
    )
  }
}

export default Messages
