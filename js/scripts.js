// ========== МОБИЛЬНОЕ МЕНЮ (БУРГЕР) ==========
document.addEventListener('DOMContentLoaded', function() {
    const burger = document.getElementById('burger');
    const navMenu = document.getElementById('navMenu');
    
    if (burger && navMenu) {
        burger.addEventListener('click', function() {
            burger.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });
        
        // Закрыть меню при клике на ссылку
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                burger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('no-scroll');
            });
        });
    }
    
    // ========== АКТИВНЫЙ ПУНКТ МЕНЮ ==========
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage) {
            link.classList.add('active');
        }
    });
    
    // ========== АККОРДЕОН ДЛЯ FAQ ==========
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const icon = this.querySelector('.accordion-icon i');
            
            // Закрыть все другие открытые элементы
            if (!this.classList.contains('active')) {
                document.querySelectorAll('.accordion-header').forEach(h => {
                    if (h !== this && h.classList.contains('active')) {
                        h.classList.remove('active');
                        h.nextElementSibling.classList.remove('show');
                        const otherIcon = h.querySelector('.accordion-icon i');
                        if (otherIcon) {
                            otherIcon.className = 'fas fa-chevron-down';
                        }
                    }
                });
            }
            
            // Переключить текущий
            this.classList.toggle('active');
            content.classList.toggle('show');
            
            if (icon) {
                if (content.classList.contains('show')) {
                    icon.className = 'fas fa-chevron-up';
                } else {
                    icon.className = 'fas fa-chevron-down';
                }
            }
        });
    });
    
    // ========== ВЫБОР РАЗМЕРА В КАРТОЧКАХ ТОВАРОВ ==========
    const sizeBtns = document.querySelectorAll('.size-btn');
    
    sizeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const parent = this.closest('.sizes');
            if (parent) {
                parent.querySelectorAll('.size-btn').forEach(b => {
                    b.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });
    
    // ========== ОБРАБОТКА ФОРМЫ ОБРАТНОЙ СВЯЗИ ==========
    const feedbackForm = document.getElementById('feedbackForm');
    
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Здесь можно добавить валидацию и отправку на сервер
            alert('Спасибо! Ваше сообщение отправлено. Мы свяжемся с вами в ближайшее время.');
            this.reset();
            
            // Сбросить активные классы размеров, если есть
            const sizeBtns = this.querySelectorAll('.size-btn');
            sizeBtns.forEach(btn => btn.classList.remove('active'));
        });
    }
    
    // ========== ДОБАВЛЕНИЕ В КОРЗИНУ ==========
    const addToCartBtns = document.querySelectorAll('.add-to-cart');
    let cartCount = 2; // Пример начального значения
    
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            cartCount++;
            const cartElement = document.querySelector('.cart-count');
            if (cartElement) {
                cartElement.textContent = cartCount;
            }
            
            // Анимация добавления
            this.innerHTML = '<i class="fas fa-check"></i> Добавлено';
            this.style.backgroundColor = '#27ae60';
            
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-shopping-cart"></i> В корзину';
                this.style.backgroundColor = '';
            }, 2000);
        });
    });
    
    // ========== ФИЛЬТРЫ В КАТАЛОГЕ ==========
    const filterBtn = document.querySelector('.filter-btn');
    
    if (filterBtn) {
        filterBtn.addEventListener('click', function() {
            // Здесь будет логика фильтрации
            alert('Фильтры применены!');
        });
    }
    
    // ========== ПЛАВНЫЙ СКРОЛЛ К ЯКОРЯМ ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
});