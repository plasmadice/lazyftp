import React from "react"
import { Message } from "semantic-ui-react"

const Messages = () => {
  return (
    <Message info compact floating attached="bottom">
      <Message.Header>New Site Features</Message.Header>
      <Message.List>
        <Message.Item>
          Right-Click to Open in VLC using this{" "}
          <a
            target="_blank"
            href="https://chrome.google.com/webstore/detail/open-in-vlc-media-player/ihpiinojhnfhpdmmacgmpoonphhimkaj"
          >
            chrome extension
          </a>
          .{" "}
          <a target="_blank" href="https://add0n.com/open-in-vlc.html">
            FAQ
          </a>
        </Message.Item>
      </Message.List>
    </Message>
  )
}

export default Messages
