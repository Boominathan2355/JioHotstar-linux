const { app, BrowserWindow, shell, ipcMain, Tray, Menu } = require('electron');
const path = require('path');
let store;
let mainWindow;
let tray;


async function setupModules() {
    const { default: Store } = await import('electron-store');
    const { default: contextMenu } = await import('electron-context-menu');

    store = new Store();
    contextMenu({
        showSaveImageAs: true,
        showInspectElement: true
    });
}


function createWindow() {
    const windowState = store.get('windowState') || {
        width: 1200,
        height: 800
    };

    mainWindow = new BrowserWindow({
        width: windowState.width,
        height: windowState.height,
        x: windowState.x,
        y: windowState.y,
        minWidth: 800,
        minHeight: 600,
        title: 'JioHotstar',
        icon: path.join(__dirname, '../../assets/icon.png'),
        backgroundColor: '#0f1014', // Hotstar dark theme base
        webPreferences: {
            preload: path.join(__dirname, '../preload/preload.js'),
            nodeIntegration: false,
            contextIsolation: true,
            spellcheck: true
        }
    });

    // Basic Ad-blocking using onBeforeRequest (simulating AdGuard DNS)
    const filter = {
        urls: [
            "*://*.doubleclick.net/*",
            "*://*.google-analytics.com/*",
            "*://*.googlesyndication.com/*",
            "*://*.googletagservices.com/*",
            "*://*.googletagmanager.com/*",
            "*://*.hotstar.com/ads/*",
            "*://*.hotstar.com/v1/ads/*",
            "*://*.hotstar.com/v1/event/*",
            "*://*.omtrdc.net/*",
            "*://*.crashlytics.com/*",
            "*://*.scorecardresearch.com/*",
            "*://*.adguard.com/*",
            "*://*.adnxs.com/*",
            "*://*.adsystem.com/*",
            "*://*.adservice.google.com/*",
            "*://*.adservice.google.co.in/*"
        ]
    };

    mainWindow.webContents.session.webRequest.onBeforeRequest(filter, (details, callback) => {
        callback({ cancel: true });
    });

    // Load JioHotstar
    mainWindow.loadURL('https://www.hotstar.com/in/home');



    // Save window state on close
    mainWindow.on('close', () => {
        if (!mainWindow.isDestroyed()) {
            store.set('windowState', mainWindow.getBounds());
        }
    });

    // Handle external links
    mainWindow.webContents.setWindowOpenHandler(({ url }) => {
        if (!url.startsWith('https://www.hotstar.com')) {
            shell.openExternal(url);
            return { action: 'deny' };
        }
        return { action: 'allow' };
    });

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

function createTray() {
    tray = new Tray(path.join(__dirname, '../../assets/icon.png'));
    const contextMenuTemplate = Menu.buildFromTemplate([
        { label: 'Show App', click: () => mainWindow.show() },
        { label: 'Quit', click: () => app.quit() }
    ]);
    tray.setToolTip('JioHotstar');
    tray.setContextMenu(contextMenuTemplate);
    tray.on('click', () => {
        mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show();
    });
}

app.whenReady().then(async () => {
    await setupModules();
    createWindow();
    createTray();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
