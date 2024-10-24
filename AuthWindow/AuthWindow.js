document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('auth-form'); // Убедитесь, что у вас есть ID формы

    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Предотвращаем отправку формы по умолчанию

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Проверка полей
        if (email.trim() === '' || password.trim() === '') {
            console.error('Пожалуйста, заполните все поля.'); // Можно вывести сообщение пользователю
            return;
        }

        try {
            const response = await fetch('http://192.168.1.34:5000/login/', { // Убедитесь, что URL правильный
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });

            if (!response.ok) {
                const errorText = await response.text(); // Получение текста ошибки
                throw new Error(`Ошибка: ${response.status} - ${errorText}`);
            }

            const data = await response.json();

            // Обработка ответа сервера
            if (data.error) {
                // Показать ошибку на фронте
                console.error(data.error);
                alert(data.error); // Можно показать сообщение пользователю
            } else {
                // Успешный вход
                console.log('Успешный вход:', data);
                alert('DEBUG: Вы успешно вошли!'); // Можно показать сообщение пользователю

            }
        } catch (error) {
            console.error('Ошибка:', error);
            alert('DEBUG:Произошла ошибка при отправке данных.'); // Сообщение пользователю об ошибке
        }
    });
});