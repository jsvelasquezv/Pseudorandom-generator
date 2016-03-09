var app = require('app')
var BrowserWindow = require('browser-window')

app.on('ready', function() {
  var mainWindow = new BrowserWindow({
    width: 1280,
    height: 1024
  })
  mainWindow.loadURL('file://' + __dirname + '/index.html')
})