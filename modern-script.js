document.addEventListener('DOMContentLoaded', function() {
    // Пример данных экспонатов (замените на свои)
    const fallbackData = [
        {
            id: 1,
            title: "Основание техникума",
            thumbnail: "images/thumbnails/foundation-thumb.jpg",
            image: "images/exhibits/foundation-full.jpg",
            shortDescription: "Документы об основании учебного заведения",
            description: "Исторические документы 1950 года, свидетельствующие об основании нашего техникума. Включает устав, первые приказы и фотографии первого здания.",
            date: "1970 год",
            category: "Документы",
            additionalImages: [
                { url: "images/exhibits/foundation-doc1.jpg", alt: "Первый устав" },
                { url: "images/exhibits/foundation-doc2.jpg", alt: "Приказ №1" }
            ]
        },
        {
            id: 2,
            title: "Первые лаборатории",
            thumbnail: "images/thumbnails/labs-thumb.jpg",
            image: "images/exhibits/labs-full.jpg",
            shortDescription: "Оборудование 60-х годов",
            description: "Горное и промышленное оборудование, использовавшееся в учебном процессе в 1960-х годах. Полностью восстановленные экспонаты.",
            date: "1960-е годы",
            category: "Оборудование",
            additionalImages: [
                { url: "images/exhibits/labs-detail1.jpg", alt: "Деталь оборудования" },
                { url: "images/exhibits/labs-detail2.jpg", alt: "Общий вид лаборатории" }
            ]
        },
        {
            id: 3,
            title: "Выпускники-первопроходцы",
            thumbnail: "images/thumbnails/graduates-thumb.jpg",
            image: "images/exhibits/graduates-full.jpg",
            shortDescription: "Первый выпуск техникума",
            description: "Фотографии и биографии первых выпускников техникума, многие из которых стали известными специалистами в горной промышленности.",
            date: "1955 год",
            category: "Фотографии",
            additionalImages: []
        },
        {
            id: 4,
            title: "Награды техникума",
            thumbnail: "images/thumbnails/awards-thumb.jpg",
            image: "images/exhibits/awards-full.jpg",
            shortDescription: "Коллекция наград",
            description: "Награды, полученные техникумом за годы работы: грамоты, кубки, дипломы за достижения в образовательной деятельности.",
            date: "1955-2023 гг.",
            category: "Награды",
            additionalImages: [
                { url: "images/exhibits/awards-detail1.jpg", alt: "Грамота 1978 года" }
            ]
        },
        {
            id: 5,
            title: "Историческая форма",
            thumbnail: "images/thumbnails/uniform-thumb.jpg",
            image: "images/exhibits/uniform-full.jpg",
            shortDescription: "Форма студентов 70-х",
            description: "Подлинная форма студентов 1970-х годов, включая головные уборы и значки. Полностью восстановленный комплект.",
            date: "1970-е годы",
            category: "Артефакты",
            additionalImages: [
                { url: "images/exhibits/uniform-detail1.jpg", alt: "Значок образца 1972" },
                { url: "images/exhibits/uniform-detail2.jpg", alt: "Головной убор" }
            ]
        },
        {
            id: 6,
            title: "Редкие издания",
            thumbnail: "images/thumbnails/books-thumb.jpg",
            image: "images/exhibits/books-full.jpg",
            shortDescription: "Учебники прошлых лет",
            description: "Коллекция редких учебных пособий и методических материалов, использовавшихся в разные годы существования техникума.",
            date: "1950-1990 гг.",
            category: "Книги",
            additionalImages: []
        }
    ];
    initSmartHeader();

    // Параллакс эффект для герой-секции
    const welcomeSection = document.querySelector('.welcome-section');
    
    if (welcomeSection) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.pageYOffset;
            welcomeSection.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
        });
    }
    
    // Функция для отрисовки экспонатов
    function renderExhibits(exhibits) {
        const grid = document.querySelector('.exhibits-grid');
        if (!grid) return;
        
        grid.innerHTML = '';
        
        exhibits.forEach((exhibit, index) => {
            const item = document.createElement('div');
            item.className = 'exhibit-item';
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            item.style.transition = `opacity 0.5s ${index * 0.1}s ease, transform 0.5s ${index * 0.1}s ease`;
            
            item.innerHTML = `
                <img src="${exhibit.thumbnail}" alt="${exhibit.title}" class="exhibit-img" loading="lazy">
                <div class="exhibit-info">
                    <h3>${exhibit.title}</h3>
                    <p>${exhibit.shortDescription}</p>
                    <span class="view-more">Подробнее →</span>
                </div>
            `;
            
            item.addEventListener('click', () => {
                openExhibitModal(exhibit);
            });
            
            grid.appendChild(item);
            
            // Анимация появления
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 100);
        });
    }
    
    // Модальное окно для экспоната
    function openExhibitModal(exhibit) {
        const modal = document.createElement('div');
        modal.className = 'exhibit-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <div class="modal-grid">
                    <div class="modal-image">
                        <img src="${exhibit.image}" alt="${exhibit.title}">
                    </div>
                    <div class="modal-info">
                        <h2>${exhibit.title}</h2>
                        <div class="meta">
                            ${exhibit.date ? `<span class="date">${exhibit.date}</span>` : ''}
                            ${exhibit.category ? `<span class="category">${exhibit.category}</span>` : ''}
                        </div>
                        <p class="description">${exhibit.description}</p>
                        ${exhibit.additionalImages && exhibit.additionalImages.length > 0 ? `
                        <div class="gallery">
                            <h4>Дополнительные фото:</h4>
                            <div class="gallery-grid">
                                ${exhibit.additionalImages.map(img => `
                                    <img src="${img.url}" alt="${img.alt}" class="gallery-img">
                                `).join('')}
                            </div>
                        </div>
                        ` : ''}
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';
        
        // Закрытие модалки
        modal.querySelector('.close-modal').addEventListener('click', () => {
            modal.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(modal);
                document.body.style.overflow = 'auto';
            }, 300);
        });
        
        // Закрытие по клику на фон
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.opacity = '0';
                setTimeout(() => {
                    document.body.removeChild(modal);
                    document.body.style.overflow = 'auto';
                }, 300);
            }
        });
        
        // Анимация появления
        setTimeout(() => {
            modal.style.opacity = '1';
        }, 10);
        
        // Инициализация галереи внутри модалки
        if (exhibit.additionalImages && exhibit.additionalImages.length > 0) {
            const galleryImgs = modal.querySelectorAll('.gallery-img');
            galleryImgs.forEach(img => {
                img.addEventListener('click', () => {
                    // Можно реализовать просмотр в полноэкранном режиме
                    console.log('Открыть изображение на весь экран:', img.src);
                });
            });
        }
    }
    
    // Инициализация - используем fallbackData
    renderExhibits(fallbackData);
    
    // Плавный скролл
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    

// Умное поведение хедера на мобильных
function initSmartHeader() {
    const header = document.querySelector('header');
    if (!header) return;
    
    let lastScrollPosition = 0;
    const mobileBreakpoint = 768;
    const scrollThreshold = 100; // На сколько нужно проскроллить, чтобы зафиксировать
    
    window.addEventListener('scroll', function() {
        const currentScrollPosition = window.pageYOffset;
        const isMobile = window.innerWidth <= mobileBreakpoint;
        
        if (isMobile) {
            // На мобильных - фиксируем только после прохождения порога
            if (currentScrollPosition > scrollThreshold) {
                header.classList.add('header-fixed');
            } else {
                header.classList.remove('header-fixed');
            }
            
            // Прячем при скролле вниз, показываем при скролле вверх
            if (currentScrollPosition > lastScrollPosition && currentScrollPosition > 50) {
                // Скролл вниз
                header.classList.add('header-hidden');
            } else {
                // Скролл вверх
                header.classList.remove('header-hidden');
                header.classList.add('header-visible');
            }
        } else {
            // На десктопе - обычное sticky поведение
            header.classList.remove('header-hidden', 'header-visible', 'header-fixed');
        }
        
        lastScrollPosition = currentScrollPosition;
    });
    
    // Инициализация при загрузке
    if (window.innerWidth <= mobileBreakpoint && window.pageYOffset > scrollThreshold) {
        header.classList.add('header-fixed');
    }
}

// Вызовите эту функцию в конце вашего DOMContentLoaded:


    // Интерактивный курсор (опционально)
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    
    document.querySelectorAll('.exhibit-item, a, button').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-active');
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-active');
        });
    });
});
