document.addEventListener('DOMContentLoaded', () => {
    
    // =========================================================
    // 1. ЛОГІКА МОДАЛЬНОГО ВІКНА (Для багатьох кнопок через клас)
    // =========================================================
    const openModalButtons = document.querySelectorAll('.open-modal-btn');
    const closeModalBtn = document.getElementById('close-modal');
    const modalOverlay = document.getElementById('contact-modal');

    if (openModalButtons.length > 0 && modalOverlay) {
        openModalButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault(); // Скасовуємо перехід, якщо це було посилання
                modalOverlay.classList.add('active');
                document.body.style.overflow = 'hidden'; 
            });
        });
    }

    const closeModal = () => {
        if (modalOverlay) {
            modalOverlay.classList.remove('active');
            document.body.style.overflow = ''; 
        }
    };

    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);

    if (modalOverlay) {
        modalOverlay.addEventListener('click', (event) => {
            if (event.target === modalOverlay) closeModal();
        });
    }

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('active')) {
            closeModal();
        }
    });

    // =========================================================
    // 2. АНІМАЦІЯ ПОЯВИ ПРИ СКРОЛІ (Intersection Observer)
    // =========================================================
    const fadeElements = document.querySelectorAll('.fade-in');

    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    fadeElements.forEach(element => {
        appearOnScroll.observe(element);
    });

    // =========================================================
    // 3. АНІМАЦІЯ КАРТОК ПОСЛУГ (Скрол для мобільних, Hover для ПК)
    // =========================================================
    const serviceCards = document.querySelectorAll('.service-card');
    const isHoverSupported = window.matchMedia('(hover: hover)').matches;

    if (!isHoverSupported) {
        const cardObserverOptions = {
            root: null,
            rootMargin: '-35% 0px -35% 0px', 
            threshold: 0
        };

        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active'); 
                } else {
                    entry.target.classList.remove('active'); 
                }
            });
        }, cardObserverOptions);

        serviceCards.forEach(card => {
            cardObserver.observe(card);
        });
    }
});