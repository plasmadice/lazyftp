# Usage

`npm i` to install all needed dependancies
`npm start` to start the server

# Encryption Details

Encrypted data is sent from the frontend to this server where it is decrypted using a key.
Official URL (As of 3/19 https is not fully provisioned): https://lazyanime.com/
Netlify URL: https://elastic-panini-7bfc59.netlify.com/

## Notes:

-Logging in is simple. Same way as normal. https://i.imgur.com/z7Gc9F0.png
-From there you can navigate. https://i.imgur.com/sy2qw5m.png
-Folders get a folder icon (means you can navigate inside of it)
-Everything else gets a camera icon and will create an ftp: link.
-The link can be dropped into VLC's "network stream" (CTRL + N on desktop) and it'll stream it. https://i.imgur.com/XoQ14bV.png and https://i.imgur.com/VLg7DC0.jpg
-The link generated contains your username, password, and the ftp site's url. Not a good idea to share these links with anyone.

## Issues:

-If a file is not a video AND not a folder it will still generate an ftp link (low priority as I don't even know what happens if you try to open that link)
-Not very descriptive on errors

## Details:

-Uses a version of crypto-js to encrypt data as it's sent out, and decrypt it on the server side.
-Only data stored is user's FTP client connection info (which is removed if you hit "Disconnect" or are timed out and attempt to connect.

## Tech:

-Frontend - Gatsby hosted on Netlify - https://github.com/plasmadice/lazy-ftp
-Backend - Node.js hosted on Heroku (Free dyno tier so after extended periods of time the server goes down. Attempts to connect to it will spin it back up. Takes ~10 seconds) - https://github.com/plasmadice/lazyanime-backend

## Plans:

-Launch VLC on click - Currently pretty easy to do using node.js, but on the frontend it's a different matter. This stackoverflow page provides some info on how that works if anyone is interested.
-VLC playlist - after VLC implementation, queuing up anime would be somewhat trivial
-Download to computer - I don't think this is that difficult to implement. But every time I think about it I want to make a desktop app variant using Electron or something. So that's on the backburner.
-Implement pagination using semantic-ui-react pagination component
-Change message component to breadcrumb

## Conclusion:

Overall this was a success. I learned a lot and will implement launching from the browser sometime soon. Users may need to have a chrome extension or something to make it work, but I'm going to do everything I can to avoid that.
