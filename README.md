# multiscreen-content-creator

![mcc-image](https://raw.githubusercontent.com/adamskopl/multiscreen-content-creator/master/assets/mcc.jpg "mcc image")

# purpose of the project

- to display some content in multiple browser windows on multiple devices
- to manage the way connected devices display content through an editor

# terms

- `editor`: webpage managing connected devices (positions, scale)
- `device`: browser window displaying fragment of a content (on a given position and with a given scale)

# setup

- `npm install`

# running

- `npm run start` or `./start.sh`
- `localhost:3000` to open `editor` (redirects to `localhost:3000/editor`)
- `localhost:3000/devices` to register a browser window as a `device`
