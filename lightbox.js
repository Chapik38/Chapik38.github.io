document.addEventListener('DOMContentLoaded', function() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-image');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.querySelector('.close-btn');
    
    // Открытие лайтбокса
    function openLightbox(imageSrc, caption) {
        lightbox.style.display = 'flex';
        lightboxImg.src = imageSrc;
        lightboxCaption.textContent = caption || '';
        document.body.style.overflow = 'hidden';
    }
    
    // Закрытие лайтбокса
    function closeLightbox() {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    // Закрытие по клику на крестик
    closeBtn.addEventListener('click', closeLightbox);
    
    // Закрытие по клику вне изображения
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Закрытие по ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeLightbox();
        }
    });
    
    // Экспорт функций для использования в других файлах
    window.lightbox = {
        open: openLightbox,
        close: closeLightbox
    };
});