const { app, BrowserWindow } = require('electron');
const path = require('path');

const electronReload = require('electron-reload');
electronReload(__dirname, {
    electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
});


let authWindow;
// let mainWindow

function createAuthWindow() {
    authWindow = new BrowserWindow({
        //width: 400,
       // height: 550,
        resizable: true, // Возможность изменять размеры окна
        movable: true, // Возможность передвигать окно
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'), // Если понадобится, для скриптов
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    // Загружаем в окно HTML-файл
    authWindow.setMenu(null);
    // authWindow.maximize();
    // authWindow.setMinimumSize(1000, 800);

    authWindow.loadFile(path.join(__dirname, 'AuthWindow', 'AuthWindow.html'))
        .then(() => {
            console.log('AuthWindow loaded!');
        })
        .catch((err)=> {
            console.error('AuthWindow failed to load AuthWindow', err);
        });


    // Открыть инструменты разработчика
    authWindow.webContents.openDevTools();

    // Обработчик закрытия окна
    authWindow.on('closed', function () {
        authWindow = null;
    });
}

// Запуск приложения, когда оно готово
app.whenReady().then(createAuthWindow);

// Закрытие приложения, когда все окна закрыты
app.on('window-all-closed', function () {
    // Для macOS, закрытие окна не завершает работу приложения
    if (process.platform !== 'darwin') {
        app.quit();
    }
});