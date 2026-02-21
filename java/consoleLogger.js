console.log('%c📢 consoleLogger.js загружен', 'color: #4CAF50; font-weight: bold;');

document.addEventListener('DOMContentLoaded', function() {
    console.log('%c📋 Страница контактов загружена', 'color: #2196F3; font-weight: bold;');
    
    // Слушаем событие formValid от validation.js
    document.addEventListener('formValid', function(event) {
        const data = event.detail;
        

        
        // Красивый заголовок
        console.log('%c┌─────────────────────────────────────┐', 'color: #666;');
        console.log('%c│      📦 ДАННЫЕ ФОРМЫ ОТПРАВЛЕНЫ      │', 'color: #e63946; font-weight: bold; font-size: 14px;');
        console.log('%c└─────────────────────────────────────┘', 'color: #666;');
        console.log('');
        
        // Вывод данных с иконками
        console.log('%c👤 ФИО:', 'font-weight: bold; color: #333;', data.fullname);
        console.log('%c📞 Телефон:', 'font-weight: bold; color: #333;', data.phone);
        console.log('%c✉️ Email:', 'font-weight: bold; color: #333;', data.email);
        console.log('%c💬 Сообщение:', 'font-weight: bold; color: #333;', data.message);
        console.log('%c🕒 Время:', 'font-weight: bold; color: #333;', data.date);
        console.log('%c🆔 ID:', 'font-weight: bold; color: #333;', data.timestamp);
        
        console.log('');
        console.log('%c──────────────────────────────────────', 'color: #666;');
        console.log('%c✅ СТАТУС: ФОРМА ВАЛИДНА', 'color: #4CAF50; font-weight: bold;');
        
        // Дополнительная информация в табличном виде
        console.log('');
        console.log('%c📊 Детальная информация:', 'font-weight: bold; color: #FF9800;');
        console.table({
            'Поле': ['ФИО', 'Телефон', 'Email', 'Сообщение', 'Время отправки'],
            'Значение': [data.fullname, data.phone, data.email, data.message, data.date],
            'Длина': [data.fullname.length, data.phone.length, data.email.length, data.message.length, data.date.length]
        });
        
        // Подсчет статистики
        console.log('');
        console.log('%c📈 Статистика:', 'font-weight: bold; color: #9C27B0;');
        console.log(`   Всего символов: ${data.fullname.length + data.phone.length + data.email.length + data.message.length}`);
        console.log(`   Сообщение ${data.message === '(не заполнено)' ? 'не заполнено' : 'заполнено'}`);
        
        // Приветствие пользователя
        const firstName = data.fullname.split(' ')[0] || 'пользователь';
        console.log('');
        console.log(`%c👋 Спасибо, ${firstName}! Мы ответим вам в ближайшее время.`, 'color: #2196F3; font-style: italic;');
        
        // Сохраняем в localStorage для истории
        saveToHistory(data);
    });
    
    // Функция сохранения в историю (опционально)
    function saveToHistory(data) {
        let history = JSON.parse(localStorage.getItem('formHistory') || '[]');
        history.push(data);
        // Храним только последние 5 записей
        if (history.length > 5) history = history.slice(-5);
        localStorage.setItem('formHistory', JSON.stringify(history));
        console.log('%c💾 Данные сохранены в истории браузера', 'color: #795548;');
    }
    
    // Показываем историю, если есть
    const history = JSON.parse(localStorage.getItem('formHistory') || '[]');
    if (history.length > 0) {
        console.log('');
        console.log('%c📚 История последних отправок:', 'font-weight: bold; color: #9C27B0;');
        history.forEach((item, index) => {
            console.log(`   ${index + 1}. ${item.fullname} - ${item.email} (${item.date})`);
        });
    }
    
    // Подсказка для пользователя
    console.log('');
    console.log('%c💡 Совет: Заполните форму и отправьте, чтобы увидеть данные здесь', 'color: #666; font-size: 12px;');
});