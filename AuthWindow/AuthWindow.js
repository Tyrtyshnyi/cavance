const { ipcRenderer } = require('electron');

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('auth-form');
    const responseCallback = document.querySelector('.response-callback'); // Селектор для блока с ответом

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Проверка полей
        if (email.trim() === '' || password.trim() === '') {
            responseCallback.textContent = 'Заполните все поля!';
            return;
        }

        try {
            const response = await fetch('http://192.168.1.34:5000/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                responseCallback.textContent = `${data.error || 'Неверный ответ сервера'}`;
                return;
            }

            // Обработка ответа сервера
            if (data.error) {
                responseCallback.textContent = `${data.error}`;
            } else {
                responseCallback.textContent = `${JSON.stringify(data)}`;
                // Отправляем сообщение в основной процесс
                ipcRenderer.send('auth-success');
            }
        } catch (error) {
            console.error('Ошибка:', error);
            responseCallback.textContent = '';
        }
    });
});
