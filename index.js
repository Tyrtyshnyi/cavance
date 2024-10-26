const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

const electronReload = require('electron-reload');
electronReload(__dirname, {
    electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
});


let authWindow;
let mainWindow

function createAuthWindow() {
    authWindow = new BrowserWindow({
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
    authWindow.maximize();
    authWindow.setMinimumSize(1000, 800);
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


function createMainWindow() {
    mainWindow = new BrowserWindow({
        resizable: true, // Возможность изменять размеры окна
        movable: true, // Возможность передвигать окно
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    });


    mainWindow.setMenu(null);
    mainWindow.maximize();
    mainWindow.loadFile(path.join(__dirname, 'MainWindow', 'MainWindow.html'))
    mainWindow.setMinimumSize(1000, 800);



    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

// Слушаем событие от рендерного процесса
ipcMain.on('auth-success', () => {
    if (authWindow) {
        authWindow.close(); // Закрыть окно авторизации
    }
    createMainWindow(); // Открыть основное окно
});




// Закрытие приложения, когда все окна закрыты
app.on('window-all-closed', function () {
    // Для macOS, закрытие окна не завершает работу приложения
    if (process.platform !== 'darwin') {
        app.quit();
    }
});