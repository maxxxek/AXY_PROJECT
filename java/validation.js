document.addEventListener('DOMContentLoaded', function() {
    console.log('🔍 validation.js загружен');
    
    const form = document.getElementById('feedbackForm');
    if (!form) {
        console.error('❌ Форма с id="feedbackForm" не найдена!');
        return;
    }
    console.log('✅ Форма найдена, валидация активирована');
    
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        console.log('📝 Форма отправлена, начинаем валидацию...');
        
        // Сбрасываем предыдущие ошибки
        document.querySelectorAll('.form-control').forEach(el => {
            el.classList.remove('error');
            el.style.borderColor = '';
        });
        document.querySelectorAll('.error-message').forEach(el => el.remove());
        
        let isValid = true;
        
        // ===== 1. ПРОВЕРКА ФИО =====
        const fullname = document.getElementById('fullname');
        if (!fullname) {
            console.error('❌ Поле fullname не найдено');
            isValid = false;
        } else {
            const fullnameValue = fullname.value.trim();
            if (fullnameValue === '') {
                showError(fullname, 'Введите фамилию, имя и отчество');
                isValid = false;
            } else {
                const words = fullnameValue.split(' ').filter(word => word.length > 0);
                if (words.length < 2) {
                    showError(fullname, 'Введите минимум фамилию и имя');
                    isValid = false;
                } else if (words.length === 2) {
                    // Предупреждение, но не ошибка (можно отправить)
                    console.log('⚠️ Рекомендуется ввести отчество');
                }
            }
        }
        
        // ===== 2. ПРОВЕРКА ТЕЛЕФОНА =====
        const phone = document.getElementById('phone');
        if (!phone) {
            console.error('❌ Поле phone не найдено');
            isValid = false;
        } else {
            const phoneValue = phone.value.trim();
            const phoneDigits = phoneValue.replace(/\D/g, '');
            
            if (phoneValue === '') {
                showError(phone, 'Введите номер телефона');
                isValid = false;
            } else if (phoneDigits.length < 10) {
                showError(phone, 'Номер должен содержать 10 цифр');
                isValid = false;
            } else if (phoneDigits.length > 11) {
                showError(phone, 'Номер слишком длинный');
                isValid = false;
            }
        }
        
        // ===== 3. ПРОВЕРКА EMAIL =====
        const email = document.getElementById('email');
        if (!email) {
            console.error('❌ Поле email не найдено');
            isValid = false;
        } else {
            const emailValue = email.value.trim();
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (emailValue === '') {
                showError(email, 'Введите email адрес');
                isValid = false;
            } else if (!emailPattern.test(emailValue)) {
                showError(email, 'Введите корректный email (пример: name@domain.ru)');
                isValid = false;
            }
        }
        
        // ===== 4. ПРОВЕРКА СООБЩЕНИЯ (опционально, с предупреждением) =====
        const message = document.getElementById('message');
        if (message) {
            const messageValue = message.value.trim();
            if (messageValue.length > 500) {
                showError(message, 'Сообщение не должно превышать 500 символов');
                isValid = false;
            } else if (messageValue === '') {
                console.log('📝 Сообщение не заполнено (опционально)');
            }
        }
        
        // ===== 5. ПРОВЕРКА СОГЛАСИЯ =====
        const agreement = document.getElementById('agreement');
        if (!agreement) {
            console.error('❌ Поле agreement не найдено');
            isValid = false;
        } else if (!agreement.checked) {
            // Подсветка чекбокса
            agreement.style.outline = '2px solid var(--accent-color)';
            agreement.style.outlineOffset = '2px';
            
            const msg = document.createElement('p');
            msg.className = 'error-message';
            msg.textContent = 'Необходимо согласие на обработку данных';
            msg.style.color = 'var(--accent-color)';
            msg.style.fontSize = '12px';
            msg.style.marginTop = '5px';
            agreement.closest('.form-check').appendChild(msg);
            
            isValid = false;
        }
        
        // ===== 6. ЕСЛИ ВСЁ КОРРЕКТНО =====
        if (isValid) {
            console.log('✅ Валидация пройдена успешно!');
            
            // Собираем данные формы
            const formData = {
                fullname: fullname.value.trim(),
                phone: phone.value.trim(),
                email: email.value.trim(),
                message: message ? (message.value.trim() || '(не заполнено)') : '(не заполнено)',
                date: new Date().toLocaleString('ru-RU'),
                timestamp: Date.now()
            };
            
            // Создаем и отправляем событие для логгера
            const event = new CustomEvent('formValid', { detail: formData });
            document.dispatchEvent(event);
            
            // Показываем сообщение пользователю
            alert('✓ Форма успешно отправлена!');
            
            // Очищаем форму
            form.reset();
            
            // Убираем подсветку чекбокса
            if (agreement) {
                agreement.style.outline = '';
            }
        } else {
            console.log('❌ Валидация не пройдена, исправьте ошибки');
        }
    });
    
    // ===== ФУНКЦИЯ ПОКАЗА ОШИБКИ =====
    function showError(input, message) {
        // Подсвечиваем поле
        input.classList.add('error');
        input.style.borderColor = 'var(--accent-color)';
        
        // Удаляем старые сообщения для этого поля
        const parent = input.closest('.form-group');
        const oldMessages = parent.querySelectorAll('.error-message');
        oldMessages.forEach(msg => msg.remove());
        
        // Создаем новое сообщение
        const errorMsg = document.createElement('p');
        errorMsg.className = 'error-message';
        errorMsg.textContent = message;
        errorMsg.style.color = 'var(--accent-color)';
        errorMsg.style.fontSize = '12px';
        errorMsg.style.marginTop = '5px';
        errorMsg.style.fontWeight = '500';
        
        parent.appendChild(errorMsg);
        
        console.log(`❌ Ошибка в поле ${input.id || input.name}: ${message}`);
    }
    
    // ===== УБИРАЕМ ОШИБКИ ПРИ ВВОДЕ =====
    document.querySelectorAll('.form-control').forEach(input => {
        input.addEventListener('input', function() {
            // Убираем подсветку ошибки
            this.classList.remove('error');
            this.style.borderColor = '';
            
            // Удаляем сообщение об ошибке для этого поля
            const parent = this.closest('.form-group');
            const errorMsg = parent.querySelector('.error-message');
            if (errorMsg) errorMsg.remove();
        });
        
        // Также убираем ошибку при фокусе
        input.addEventListener('focus', function() {
            this.classList.remove('error');
            this.style.borderColor = '';
            
            const parent = this.closest('.form-group');
            const errorMsg = parent.querySelector('.error-message');
            if (errorMsg) errorMsg.remove();
        });
    });
    
    // ===== УБИРАЕМ ПОДСВЕТКУ ЧЕКБОКСА ПРИ КЛИКЕ =====
    const agreement = document.getElementById('agreement');
    if (agreement) {
        agreement.addEventListener('click', function() {
            this.style.outline = '';
            const parent = this.closest('.form-check');
            const errorMsg = parent.querySelector('.error-message');
            if (errorMsg) errorMsg.remove();
        });
    }
    
    console.log('🚀 Валидация готова к работе');
});