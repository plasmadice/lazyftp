# Usage

`npm i` to install all needed dependancies
`npm start` to start the server

# Encryption Details

Encrypted data is sent from the frontend to this server where it is decrypted using a key.
Official URL (As of 3/19 https is not fully provisioned): https://lazyanime.com/
Netlify URL: https://elastic-panini-7bfc59.netlify.com/

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
-Implement pagination using semantic-ui-react pagination component
