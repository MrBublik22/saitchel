// Мобильное меню
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Переключение мобильного меню
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        
        // Анимация гамбургера
        const bars = navToggle.querySelectorAll('.bar');
        bars.forEach((bar, index) => {
            if (navMenu.classList.contains('active')) {
                if (index === 0) bar.style.transform = 'rotate(-45deg) translate(-5px, 6px)';
                if (index === 1) bar.style.opacity = '0';
                if (index === 2) bar.style.transform = 'rotate(45deg) translate(-5px, -6px)';
            } else {
                bar.style.transform = 'none';
                bar.style.opacity = '1';
            }
        });
    });

    // Закрытие меню при клике на ссылку
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            const bars = navToggle.querySelectorAll('.bar');
            bars.forEach(bar => {
                bar.style.transform = 'none';
                bar.style.opacity = '1';
            });
        });
    });

    // Плавная прокрутка к секциям
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Учитываем высоту навбара
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Изменение навбара при прокрутке
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Анимация появления элементов при прокрутке
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Применение анимации к элементам
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.timeline-item, .culture-card, .person-card, .place-card, .archaeology-card, .modern-card, .feature-card, .stat-item, .sector-item, .gallery-item');
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
});

// Параллакс эффект для героя
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image');
    
    if (scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Интерактивные карточки с эффектом наклона
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.culture-card, .person-card, .place-card, .archaeology-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
});

// Галерея с модальными окнами
document.addEventListener('DOMContentLoaded', function() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('.gallery-image');
            const overlay = this.querySelector('.gallery-overlay');
            const title = overlay.querySelector('h4').textContent;
            const description = overlay.querySelector('p').textContent;
            
            const modalContent = `
                <div class="modal-image-container">
                    <img src="${img.src}" alt="${img.alt}" class="modal-image">
                    <div class="modal-info">
                        <h3>${title}</h3>
                        <p>${description}</p>
                    </div>
                </div>
            `;
            
            createModal(modalContent);
        });
    });
});

// Анимация счетчиков для статистики
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    updateCounter();
}

// Анимация статистики при появлении
const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const text = stat.textContent;
                const number = parseFloat(text);
                if (!isNaN(number)) {
                    stat.textContent = '0';
                    setTimeout(() => {
                        animateCounter(stat, number, 2000);
                    }, 500);
                }
            });
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', function() {
    const economyStats = document.querySelector('.economy-stats');
    if (economyStats) {
        statsObserver.observe(economyStats);
    }
});

// Эффект печатания для заголовка
document.addEventListener('DOMContentLoaded', function() {
    const title = document.querySelector('.hero-title');
    if (title) {
        const text = title.textContent;
        title.textContent = '';
        
        let i = 0;
        const typeWriter = setInterval(() => {
            if (i < text.length) {
                title.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typeWriter);
            }
        }, 100);
    }
});

// Модальные окна для детальной информации (если понадобятся)
function createModal(content) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            ${content}
        </div>
    `;
    
    modal.style.cssText = `
        display: block;
        position: fixed;
        z-index: 1000;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.5);
        animation: fadeIn 0.3s ease;
    `;
    
    modal.querySelector('.modal-content').style.cssText = `
        background-color: white;
        margin: 5% auto;
        padding: 30px;
        border-radius: 15px;
        width: 80%;
        max-width: 600px;
        position: relative;
        animation: slideIn 0.3s ease;
    `;
    
    modal.querySelector('.close').style.cssText = `
        color: #aaa;
        float: right;
        font-size: 28px;
        font-weight: bold;
        cursor: pointer;
        position: absolute;
        right: 15px;
        top: 15px;
    `;
    
    document.body.appendChild(modal);
    
    modal.querySelector('.close').addEventListener('click', () => {
        modal.remove();
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// Добавление CSS для анимаций модального окна
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes slideIn {
        from { transform: translateY(-50px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
    }
    
    .modal {
        display: none;
    }
    
    .modal-image-container {
        text-align: center;
    }
    
    .modal-image {
        max-width: 100%;
        max-height: 70vh;
        border-radius: 10px;
        margin-bottom: 20px;
    }
    
    .modal-info h3 {
        color: #2c5aa0;
        margin-bottom: 10px;
        font-family: 'Playfair Display', serif;
    }
    
    .modal-info p {
        color: #666;
        line-height: 1.6;
    }
`;
document.head.appendChild(style);

// Плавное появление секций
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    
    const sectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        sectionObserver.observe(section);
    });
});

// Обработка ошибок и совместимость
window.addEventListener('error', function(e) {
    console.log('Ошибка JavaScript:', e.error);
});

// Проверка поддержки IntersectionObserver
if (!window.IntersectionObserver) {
    console.log('IntersectionObserver не поддерживается, анимации отключены');
    // Отключаем анимации для старых браузеров
    const animatedElements = document.querySelectorAll('[style*="opacity: 0"]');
    animatedElements.forEach(element => {
        element.style.opacity = '1';
        element.style.transform = 'none';
    });
}
