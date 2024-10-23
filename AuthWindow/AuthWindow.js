document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');

    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Предотвращаем отправку формы

        // Здесь можно обработать данные, например, получить значения полей ввода
        const email = form.querySelector('input[type="text"]').value;
        const password = form.querySelector('input[type="password"]').value;

        // Логика аутентификации или другие действия
        console.log('Email:', email);
        console.log('Пароль:', password);

        // Здесь можно добавить логику для дальнейшей обработки
    });
});