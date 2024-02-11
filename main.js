const {app, BrowserWindow} = require('electron');

let appWin;

createWindow = () => {
    appWin = new BrowserWindow({
        width: 1280,
        height: 720,
        title: 'ARMONIA',
        resizable: true,
        webPreferences:{
            preload: `${app.getAppPath()}/preload.js`
        }
    });
    
    appWin.loadURL(`file://${__dirname}/dist/index.html`);

    appWin.setMenu(null); //PODES ACTIVARLO PARA VER EL MENU DE ELECTRON REY

    appWin.on('closed', () => {
        appWin = null;
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => app.quit());
