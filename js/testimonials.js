// Carrossel de Testimonials - ADLA Site
class TestimonialsCarousel {
    constructor() {
        this.currentIndex = 1; // Começa com o segundo testimonial em destaque
        this.isAnimating = false; // Previne múltiplas animações simultâneas
        this.direction = 'next'; // Direção da última navegação
        this.testimonials = [
            {
                id: 1,
                text: "É um produto super profissional com uma equipe de suporte excepcional. Mal posso esperar para ver as próximas funcionalidades.",
                name: "Emily Peterson",
                location: "São Paulo, SP"
            },
            {
                id: 2,
                text: "Estamos procurando por este produto desde a criação do nosso negócio. Resultados extraordinários em pouco tempo!",
                name: "Adrien Jacob",
                location: "Rio de Janeiro, RJ"
            },
            {
                id: 3,
                text: "A melhor solução para exportação e obtenção dos resultados corretos de forma completamente gratuita e eficiente.",
                name: "Maria Silva",
                location: "Belo Horizonte, MG"
            },
            {
                id: 4,
                text: "Serviço excepcional e recursos inovadores que transformaram completamente nosso fluxo de trabalho.",
                name: "Carlos Santos",
                location: "Porto Alegre, RS"
            },
            {
                id: 5,
                text: "Equipe profissional, resultados incríveis e suporte contínuo. Altamente recomendado para qualquer empresa!",
                name: "Ana Costa",
                location: "Salvador, BA"
            }
        ];
        
        this.init();
    }
    
    init() {
        this.createCarousel();
        this.setupEventListeners();
        this.updateCarousel();
        
        // Auto-play opcional (descomentado se desejar)
        // this.startAutoPlay();
    }
    
    createCarousel() {
        const section = document.querySelector('.testimonials-section');
        if (!section) return;
        
        section.innerHTML = `
            <div class="section-description">
                <p>DEPOIMENTOS</p>
            </div>
            <div class="section-title">
                <h2>Veja o que nossos clientes estão falando</h2>
            </div>
            <div class="testimonials-carousel-container">
                <button class="carousel-nav-button prev" aria-label="Testimonial anterior">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
                
                <div class="testimonials-carousel-inner">
                    ${this.renderTestimonials()}
                </div>
                
                <button class="carousel-nav-button next" aria-label="Próximo testimonial">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
                
                <div class="carousel-dots">
                    ${this.renderDots()}
                </div>
            </div>
        `;
    }
    
    renderTestimonials() {
        const visibleTestimonials = this.getVisibleTestimonials();
        
        return visibleTestimonials.map(testimonial => `
            <div class="testimonial-carousel-item ${testimonial.position === 0 ? 'center' : 'side'}" data-id="${testimonial.id}">
                <div class="testimonial-quote-icon">"</div>
                <div class="testimonial-text">
                    ${testimonial.text}
                </div>
                <div class="testimonial-client-info">
                    <div class="testimonial-client-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <circle cx="12" cy="7" r="4" stroke="currentColor" stroke-width="2"/>
                        </svg>
                    </div>
                    <div class="testimonial-client-details">
                        <h4>${testimonial.name}</h4>
                        <p>${testimonial.location}</p>
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    renderDots() {
        return this.testimonials.map((_, index) => `
            <button class="carousel-dot ${index === this.currentIndex ? 'active' : ''}" 
                    data-index="${index}" 
                    aria-label="Ir para testimonial ${index + 1}">
            </button>
        `).join('');
    }
    
    getVisibleTestimonials() {
        const visible = [];
        
        // Em mobile, mostra apenas o central
        if (window.innerWidth <= 768) {
            const current = this.testimonials[this.currentIndex];
            visible.push({
                ...current,
                position: 0
            });
        } else {
            // Em desktop, mostra 3 (esquerda, centro, direita)
            for (let i = -1; i <= 1; i++) {
                const index = (this.currentIndex + i + this.testimonials.length) % this.testimonials.length;
                visible.push({
                    ...this.testimonials[index],
                    position: i
                });
            }
        }
        
        return visible;
    }
    
    setupEventListeners() {
        // Botões de navegação
        document.addEventListener('click', (e) => {
            if (e.target.closest('.carousel-nav-button.prev')) {
                this.prevTestimonial();
            } else if (e.target.closest('.carousel-nav-button.next')) {
                this.nextTestimonial();
            } else if (e.target.closest('.carousel-dot')) {
                const index = parseInt(e.target.dataset.index);
                this.goToTestimonial(index);
            }
        });
        
        // Navegação por teclado
        document.addEventListener('keydown', (e) => {
            if (document.querySelector('.testimonials-carousel-container:hover')) {
                if (e.key === 'ArrowLeft') {
                    this.prevTestimonial();
                } else if (e.key === 'ArrowRight') {
                    this.nextTestimonial();
                }
            }
        });
        
        // Suporte para touch/swipe em mobile
        this.setupTouchEvents();
        
        // Atualiza o carrossel quando a janela é redimensionada
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.updateCarousel();
            }, 250);
        });
    }
    
    setupTouchEvents() {
        let startX = 0;
        let endX = 0;
        let startY = 0;
        let endY = 0;
        let isDragging = false;
        const carousel = document.querySelector('.testimonials-carousel-inner');
        
        if (!carousel) return;
        
        carousel.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
            isDragging = true;
        }, { passive: true });
        
        carousel.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            
            const currentX = e.touches[0].clientX;
            const currentY = e.touches[0].clientY;
            const deltaX = Math.abs(currentX - startX);
            const deltaY = Math.abs(currentY - startY);
            
            // Se o movimento horizontal for maior que o vertical, previne scroll vertical
            if (deltaX > deltaY && deltaX > 10) {
                e.preventDefault();
            }
        }, { passive: false });
        
        carousel.addEventListener('touchend', (e) => {
            if (!isDragging) return;
            
            endX = e.changedTouches[0].clientX;
            endY = e.changedTouches[0].clientY;
            isDragging = false;
            this.handleSwipe();
        }, { passive: true });
        
        const handleSwipe = () => {
            const difference = startX - endX;
            const verticalDifference = Math.abs(startY - endY);
            const threshold = 75; // Aumentado para ser mais seletivo
            
            // Só considera swipe se o movimento horizontal for maior que o vertical
            if (Math.abs(difference) > threshold && Math.abs(difference) > verticalDifference) {
                if (this.isAnimating) return; // Previne swipes durante animação
                
                if (difference > 0) {
                    this.nextTestimonial(); // Swipe left = próximo
                } else {
                    this.prevTestimonial(); // Swipe right = anterior
                }
            }
        };
        
        this.handleSwipe = handleSwipe;
    }
    
    nextTestimonial() {
        if (this.isAnimating) return;
        
        this.direction = 'next';
        this.currentIndex = (this.currentIndex + 1) % this.testimonials.length;
        this.updateCarouselWithAnimation();
    }
    
    prevTestimonial() {
        if (this.isAnimating) return;
        
        this.direction = 'prev';
        this.currentIndex = (this.currentIndex - 1 + this.testimonials.length) % this.testimonials.length;
        this.updateCarouselWithAnimation();
    }
    
    goToTestimonial(index) {
        if (this.isAnimating || index === this.currentIndex) return;
        
        this.direction = index > this.currentIndex ? 'next' : 'prev';
        this.currentIndex = index;
        this.updateCarouselWithAnimation();
    }
    
    updateCarousel() {
        const carouselInner = document.querySelector('.testimonials-carousel-inner');
        const dots = document.querySelectorAll('.carousel-dot');
        
        if (!carouselInner) return;
        
        // Atualiza o conteúdo dos testimonials
        carouselInner.innerHTML = this.renderTestimonials();
        
        // Atualiza os dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentIndex);
        });
    }
    
    updateCarouselWithAnimation() {
        if (this.isAnimating) return;
        
        this.isAnimating = true;
        const carouselInner = document.querySelector('.testimonials-carousel-inner');
        const isMobile = window.innerWidth <= 768;
        
        if (!carouselInner) {
            this.isAnimating = false;
            return;
        }
        
        if (isMobile) {
            this.animateMobileTransition();
        } else {
            this.animateDesktopTransition();
        }
    }
    
    animateMobileTransition() {
        const carouselInner = document.querySelector('.testimonials-carousel-inner');
        const currentCard = carouselInner.querySelector('.testimonial-carousel-item.center');
        
        if (currentCard) {
            // Adiciona classe de saída baseada na direção
            const exitClass = this.direction === 'next' ? 'exit-left' : 'exit-right';
            currentCard.classList.add(exitClass);
            
            // Aguarda a animação de saída completar
            setTimeout(() => {
                this.updateCarousel();
                
                // Adiciona animação de entrada
                const newCard = carouselInner.querySelector('.testimonial-carousel-item.center');
                if (newCard) {
                    const slideClass = this.direction === 'next' ? 'slide-left' : 'slide-right';
                    newCard.classList.add(slideClass);
                    
                    // Remove as classes após a animação
                    setTimeout(() => {
                        newCard.classList.remove(slideClass);
                        this.isAnimating = false;
                    }, 600);
                }
            }, 300);
        } else {
            this.updateCarousel();
            this.isAnimating = false;
        }
    }
    
    animateDesktopTransition() {
        const carouselInner = document.querySelector('.testimonials-carousel-inner');
        
        // Primeiro atualiza o conteúdo
        this.updateCarousel();
        
        // Adiciona classes de animação baseadas na direção
        const centerCard = carouselInner.querySelector('.testimonial-carousel-item.center');
        const sideCards = carouselInner.querySelectorAll('.testimonial-carousel-item.side');
        
        if (centerCard) {
            centerCard.classList.add('sliding');
            
            setTimeout(() => {
                centerCard.classList.remove('sliding');
            }, 600);
        }
        
        // Adiciona animações aos cards laterais
        sideCards.forEach((card, index) => {
            if (this.direction === 'next') {
                card.classList.add(index === 0 ? 'from-left' : 'from-right');
            } else {
                card.classList.add(index === 0 ? 'from-right' : 'from-left');
            }
            
            setTimeout(() => {
                card.classList.remove('from-left', 'from-right');
            }, 600);
        });
        
        // Finaliza a animação
        setTimeout(() => {
            this.isAnimating = false;
        }, 600);
    }
    
    startAutoPlay(interval = 5000) {
        this.autoPlayInterval = setInterval(() => {
            this.nextTestimonial();
        }, interval);
    }
    
    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
        }
    }
    
    // Pausa auto-play quando o usuário interage
    pauseAutoPlayOnInteraction() {
        const carousel = document.querySelector('.testimonials-carousel-container');
        if (carousel) {
            carousel.addEventListener('mouseenter', () => this.stopAutoPlay());
            carousel.addEventListener('mouseleave', () => this.startAutoPlay());
        }
    }
}

// Inicializa o carrossel quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    // Aguarda um pequeno delay para garantir que todos os estilos foram carregados
    setTimeout(() => {
        const testimonialsCarousel = new TestimonialsCarousel();
        
        // Torna a instância disponível globalmente para debugging
        window.testimonialsCarousel = testimonialsCarousel;
    }, 100);
});

// Reinicializa o carrossel se necessário (útil para desenvolvimento)
function resetTestimonialsCarousel() {
    if (window.testimonialsCarousel) {
        window.testimonialsCarousel.stopAutoPlay();
    }
    const newCarousel = new TestimonialsCarousel();
    window.testimonialsCarousel = newCarousel;
}