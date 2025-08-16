// File: js/script.js
// Versi final dengan navbar statis.

document.addEventListener('DOMContentLoaded', () => {
    // =======================================================
    // === BAGIAN 1: LOGIKA TRANSISI HALAMAN (UMUM) ===
    // =======================================================

    const mainContent = document.querySelector('main');
    const footerContent = document.querySelector('footer');

    // Terapkan animasi masuk saat halaman selesai dimuat
    if (mainContent) mainContent.classList.add('page-enter-active');
    if (footerContent) footerContent.classList.add('page-enter-active');

    // Tangani animasi keluar saat link navigasi di header diklik
    const navLinks = document.querySelectorAll('header nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            const targetUrl = this.href;
            
            if (targetUrl === window.location.href || targetUrl.endsWith('#')) {
                event.preventDefault();
                return;
            }

            event.preventDefault();
            
            // Terapkan animasi keluar pada main dan footer
            if (mainContent) mainContent.classList.add('page-exit-active');
            if (footerContent) footerContent.classList.add('page-exit-active');
            
            // Tunggu animasi selesai, lalu pindah halaman
            setTimeout(() => {
                window.location.href = targetUrl;
            }, 500); // Durasi harus cocok dengan durasi animasi CSS (0.5s)
        });
    });

    
    // =======================================================
    // === BAGIAN 2: LOGIKA SLIDESHOW (HANYA JIKA ADA) ===
    // =======================================================

    const slideshowContainer = document.querySelector('.slideshow-container');
    
    if (slideshowContainer) {
        console.log('Slideshow terdeteksi, inisialisasi dimulai...');

        const animations = ['anim-fade', 'anim-slide-right', 'anim-slide-left', 'anim-zoom-in'];
        let slideIndex = 0;
        let slideshowInterval;

        function setupSlideBackgrounds() {
            const slides = slideshowContainer.getElementsByClassName("slide");
            for (let i = 0; i < slides.length; i++) {
                const slide = slides[i];
                const img = slide.querySelector('img');
                if (img) {
                    const absoluteImgUrl = new URL(img.src, window.location.href).href;
                    slide.style.setProperty('--slide-bg', `url('${absoluteImgUrl}')`);
                }
            }
        }

        function showSlides() {
            const slides = slideshowContainer.getElementsByClassName("slide");
            if (slides.length <= 1) return;

            const currentIndex = slideIndex % slides.length;
            const previousIndex = (slideIndex - 1 + slides.length) % slides.length;
            const currentSlide = slides[currentIndex];
            const previousSlide = slides[previousIndex];

            if (previousSlide && previousSlide !== currentSlide) {
                previousSlide.style.display = "none";
                previousSlide.classList.remove(...animations);
            }

            const randomIndex = Math.floor(Math.random() * animations.length);
            const randomAnimationClass = animations[randomIndex];
            currentSlide.classList.add(randomAnimationClass);
            currentSlide.style.display = "flex";
            slideIndex++;
        }

        // --- Inisialisasi Slideshow ---
        setupSlideBackgrounds();
        const slides = slideshowContainer.getElementsByClassName("slide");
        if (slides.length > 0) {
            slides[0].style.display = "flex";
            slideIndex = 1;
        }
        if (slideshowInterval) clearInterval(slideshowInterval);
        slideshowInterval = setInterval(showSlides, 3050);
    }

});

console.log('Skrip utama tunggal (navbar statis) berhasil dimuat.');