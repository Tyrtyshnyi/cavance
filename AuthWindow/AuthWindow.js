document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');

    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Предотвращаем отправку формы по умолчанию





















        // Функция для авторизации
        async function login() {
            const email = document.querySelector('input[placeholder="Почта"]').value;
            const password = document.querySelector('input[placeholder="Пароль"]').value;

            try {
                const response = await fetch('http://127.0.0.1:8000/api/login/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password
                    })
                });

                const data = await response.json();

                if (response.ok) {
                    console.log('Авторизация успешна!', data);
                    // Здесь можно выполнить дальнейшие действия, например, редирект или показ главного окна
                } else {
                    console.error('Ошибка авторизации:', data);
                }
            } catch (error) {
                console.error('Ошибка сети или сервера:', error);
            }
        }

        // Вызываем функцию авторизации при нажатии на кнопку
        login();
    });
});