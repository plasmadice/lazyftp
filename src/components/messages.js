import React from "react"
import { Message } from "semantic-ui-react"

const Messages = () => {
  return (
    <Message info compact floating>
      <Message.Header>New Site Features</Message.Header>
      <Message.List>
        NEW (6/11/2021)
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
            href="https://chrome.google.com/webstore/detail/open-in-vlc-media-player/ihpiinojhnfhpdmmacgmpoonphhimkaj"
          >
            chrome extension
          </a>
          .{" "}
          <a
            target="_blank"
            href="https://add0n.com/open-in-vlc.html"
            rel="noreferrer"
          >
            FAQ
          </a>
        </Message.Item>
      </Message.List>
    </Message>
  )
}

export default Messages
