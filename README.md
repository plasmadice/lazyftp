# Usage

`npm i` to install all needed dependancies
`npm start` to start the frontend

# Encryption Details

Encrypted data is sent from the frontend to this server where it is decrypted using a key.
Official URL: https://lazyanime.com/
Netlify URL: https://elastic-panini-7bfc59.netlify.com/

## Issues:

-If a file is not a video AND not a folder it will still generate an ftp link (low priority as I don't even know what happens if you try to open that link)
-Not very descriptive on errors

## Details:

-Uses a version of crypto-js to encrypt data as it's sent out, and decrypt it on the server side.
-Only data stored is user's FTP client connection info (which is removed if you hit "Disconnect" or are timed out and attempt to connect.

## Tech:

-Frontend - Gatsby hosted on Netlify - https://github.com/plasmadice/lazy-ftp
-Backend - Node.js hosted on Heroku - https://github.com/plasmadice/lazyanime-backend

## Future Feature list

-Download media through browser
-Optionally convert videos to mp4 to view in browser
