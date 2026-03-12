document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('header');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    const contactForm = document.getElementById('contactForm');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.service-card, .feature-card, .blog-card').forEach((el, index) => {
        el.classList.add('fade-in', `stagger-${(index % 4) + 1}`);
        observer.observe(el);
    });

    const revealElements = document.querySelectorAll('.section-header, .about-content, .contact-info, .cta-content');
    revealElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const service = document.getElementById('service').value;
            const phone = document.getElementById('phone').value;
            const message = document.getElementById('message').value;
            
            const phoneNumber = '5511960657174';
            
            let text = `*Olá! Gostaria de mais informações sobre:*\n\n`;
            text += `📋 *Serviço:* ${service}\n`;
            text += `📱 *WhatsApp:* ${phone}\n`;
            if (message) {
                text += `\n💬 *Mensagem:* ${message}`;
            }
            
            const encodedText = encodeURIComponent(text);
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedText}`;
            
            window.open(whatsappUrl, '_blank');
            
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<span>✓</span> Redirecionando...';
            btn.style.background = 'linear-gradient(135deg, #22c55e, #10b981)';
            
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = '';
                contactForm.reset();
            }, 3000);
        });
    }

    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 0) {
                if (value.length <= 2) {
                    value = `(${value}`;
                } else if (value.length <= 7) {
                    value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
                } else {
                    value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7, 11)}`;
                }
            }
            e.target.value = value;
        });
    }

    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.stat-number');
        
        elements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible && !el.classList.contains('animated')) {
                el.classList.add('animated');
                
                const target = parseInt(el.textContent);
                if (!isNaN(target)) {
                    animateNumber(el, 0, target, 2000);
                }
            }
        });
    };

    const animateNumber = (element, start, end, duration) => {
        const startTime = performance.now();
        
        const update = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(start + (end - start) * easeOutQuart);
            
            element.textContent = current + (element.dataset.suffix || '');
            
            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                element.textContent = end + (element.dataset.suffix || '');
            }
        };
        
        requestAnimationFrame(update);
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();

    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('.service-icon');
            if (icon) {
                icon.style.transform = 'scale(1.15) rotate(8deg)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('.service-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });

    const heroCard = document.querySelector('.hero-card');
    if (heroCard) {
        heroCard.addEventListener('mousemove', (e) => {
            const rect = heroCard.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = Math.max(-3, Math.min(3, (y - centerY) / 30));
            const rotateY = Math.max(-3, Math.min(3, (centerX - x) / 30));
            
            heroCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        heroCard.addEventListener('mouseleave', () => {
            heroCard.style.transform = 'perspective(1000px) rotateY(-3deg) rotateX(2deg)';
        });
    }

    const parallaxElements = document.querySelectorAll('.floating-element');
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        parallaxElements.forEach((el, index) => {
            const speed = 0.1 + (index * 0.05);
            el.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            if (this.tagName === 'A' && this.getAttribute('href').startsWith('#')) return;
            
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                background: rgba(255, 255, 255, 0.4);
                border-radius: 50%;
                pointer-events: none;
                width: 100px;
                height: 100px;
                transform: translate(-50%, -50%) scale(0);
                animation: rippleEffect 0.6s ease-out;
            `;
            
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });

    const style = document.createElement('style');
    style.textContent = `
        @keyframes rippleEffect {
            to {
                transform: translate(-50%, -50%) scale(2.5);
                opacity: 0;
            }
        }
        
        .service-card, .feature-card, .blog-card {
            opacity: 0;
            transform: translateY(40px);
        }
        
        .service-card.visible, .feature-card.visible, .blog-card.visible {
            opacity: 1;
            transform: translateY(0);
        }
        
        .section-header, .about-content, .contact-info, .cta-content {
            opacity: 0;
            transform: translateY(30px);
        }
        
        .section-header.visible, .about-content.visible, .contact-info.visible, .cta-content.visible {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);

    const inputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            input.parentElement.classList.remove('focused');
        });
    });

    // Carrossel de imagens nas câmeras
    const cameraCams = document.querySelectorAll('.cam[data-images]');
    cameraCams.forEach((cam, index) => {
        const images = JSON.parse(cam.dataset.images);
        let currentIndex = 0;
        
        setInterval(() => {
            currentIndex = (currentIndex + 1) % images.length;
            cam.style.backgroundImage = `url('${images[currentIndex]}')`;
        }, 3000 + (index * 500));
        
        // Popup ao clicar
        cam.style.cursor = 'pointer';
        cam.addEventListener('click', () => {
            showImagePopup(images, currentIndex);
        });
    });

    // Popup de imagens
    function showImagePopup(images, startIndex) {
        const popup = document.createElement('div');
        popup.className = 'image-popup';
        popup.innerHTML = `
            <div class="popup-overlay"></div>
            <div class="popup-content">
                <button class="popup-close">&times;</button>
                <div class="popup-gallery">
                    ${images.map((img, i) => `
                        <div class="popup-image ${i === startIndex ? 'active' : ''}">
                            <img src="${img}" alt="Imagem ${i + 1}">
                        </div>
                    `).join('')}
                </div>
                <button class="popup-nav prev">&#10094;</button>
                <button class="popup-nav next">&#10095;</button>
                <div class="popup-dots">
                    ${images.map((_, i) => `<span class="dot ${i === startIndex ? 'active' : ''}" data-index="${i}"></span>`).join('')}
                </div>
            </div>
        `;
        
        document.body.appendChild(popup);
        document.body.style.overflow = 'hidden';
        
        let currentIndex = startIndex;
        
        function showImage(index) {
            currentIndex = index;
            popup.querySelectorAll('.popup-image').forEach((img, i) => {
                img.classList.toggle('active', i === index);
            });
            popup.querySelectorAll('.popup-dots .dot').forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        }
        
        popup.querySelector('.popup-close').addEventListener('click', () => {
            popup.remove();
            document.body.style.overflow = '';
        });
        
        popup.querySelector('.popup-overlay').addEventListener('click', () => {
            popup.remove();
            document.body.style.overflow = '';
        });
        
        popup.querySelector('.popup-nav.prev').addEventListener('click', () => {
            showImage((currentIndex - 1 + images.length) % images.length);
        });
        
        popup.querySelector('.popup-nav.next').addEventListener('click', () => {
            showImage((currentIndex + 1) % images.length);
        });
        
        popup.querySelectorAll('.popup-dots .dot').forEach(dot => {
            dot.addEventListener('click', () => {
                showImage(parseInt(dot.dataset.index));
            });
        });
    }

    // Estilos do popup
    const popupStyles = document.createElement('style');
    popupStyles.textContent = `
        .image-popup {
            position: fixed;
            inset: 0;
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .popup-overlay {
            position: absolute;
            inset: 0;
            background: rgba(0,0,0,0.9);
        }
        .popup-content {
            position: relative;
            max-width: 90vw;
            max-height: 90vh;
        }
        .popup-close {
            position: absolute;
            top: -40px;
            right: 0;
            background: none;
            border: none;
            color: white;
            font-size: 32px;
            cursor: pointer;
            z-index: 10;
        }
        .popup-gallery {
            display: flex;
            gap: 10px;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            max-width: 80vw;
        }
        .popup-image {
            display: none;
            scroll-snap-align: center;
        }
        .popup-image.active {
            display: block;
        }
        .popup-image img {
            max-width: 80vw;
            max-height: 80vh;
            object-fit: contain;
            border-radius: 8px;
        }
        .popup-nav {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            background: rgba(99, 102, 241, 0.8);
            border: none;
            color: white;
            font-size: 24px;
            padding: 15px 20px;
            cursor: pointer;
            border-radius: 50%;
            z-index: 10;
        }
        .popup-nav.prev { left: -60px; }
        .popup-nav.next { right: -60px; }
        .popup-dots {
            display: flex;
            justify-content: center;
            gap: 8px;
            margin-top: 15px;
        }
        .popup-dots .dot {
            width: 10px;
            height: 10px;
            background: rgba(255,255,255,0.3);
            border-radius: 50%;
            cursor: pointer;
        }
        .popup-dots .dot.active {
            background: var(--primary);
        }
    `;
    document.head.appendChild(popupStyles);
});
