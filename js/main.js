// Script principal do site

document.addEventListener('DOMContentLoaded', function() {
    // Navegação ativa
    const navLinks = document.querySelectorAll('.main-nav a');
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNavUl = document.querySelector('.main-nav ul');
    
    // Função para alternar o menu mobile
    function toggleMenu() {
        mainNavUl.classList.toggle('active');
        document.body.classList.toggle('menu-open');
        
        // Alterna a aparência do botão hambúrguer
        const spans = menuToggle.querySelectorAll('span');
        
        if (mainNavUl.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    }
    
    // Adiciona evento de clique ao botão do menu
    menuToggle.addEventListener('click', toggleMenu);
    
    // Fecha o menu ao clicar em um link (para mobile)
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Remove a classe active de todos os links
            navLinks.forEach(item => item.classList.remove('active'));
            
            // Adiciona a classe active ao link clicado
            this.classList.add('active');
            
            // Fecha o menu mobile se estiver aberto
            if (mainNavUl.classList.contains('active')) {
                toggleMenu();
            }
        });
    });
    
    // Destaca o link de navegação correspondente à seção visível
    function highlightNavOnScroll() {
        // Obtem a posição de rolagem atual
        const scrollPosition = window.scrollY;
    
        // Seleciona todas as seções
        const sections = document.querySelectorAll('section, header#home');
        
        // Verifica cada seção
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 60; // offset para considerar altura do header/menu
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            // Se a posição de rolagem estiver dentro da seção atual
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove a classe active de todos os links
                navLinks.forEach(link => link.classList.remove('active'));
                
                // Adiciona a classe active ao link correspondente à seção atual
                const activeLink = document.querySelector(`.main-nav a[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }
    
    // O listener de scroll foi combinado com outras funções na função handleScroll
    
    // Reduz o tamanho da navbar durante a rolagem e ajusta transparência
    function shrinkNavbar() {
        const navbar = document.querySelector('.main-nav');
        const logo = document.querySelector('.logo-image');
        
        if (window.scrollY > 50) {
            navbar.style.padding = '6px 0'; // Navbar menor ao scrollar
            navbar.style.backgroundColor = 'rgba(0, 11, 57, 0.25)'; // Mais opaco ao scrollar
            navbar.style.backdropFilter = 'blur(15px)';
            if (logo) {
                // Ajuste responsivo da logo durante o scroll
                if (window.innerWidth > 768) {
                    logo.style.height = '30px'; // Desktop
                } else {
                    logo.style.height = '26px'; // Mobile
                }
                logo.style.marginTop = '1px';
            }
        } else {
            navbar.style.padding = '12px 0';
            navbar.style.backgroundColor = 'rgba(0, 11, 57, 0.1)'; // Mais transparente no topo
            navbar.style.backdropFilter = 'blur(10px)';
            if (logo) {
                // Ajuste responsivo da logo no topo
                if (window.innerWidth > 768) {
                    logo.style.height = '36px'; // Desktop
                } else if (window.innerWidth > 576) {
                    logo.style.height = '32px'; // Tablet
                } else {
                    logo.style.height = '28px'; // Mobile pequeno
                }
                logo.style.marginTop = '2px';
            }
        }
    }
    
    // Controla o efeito de blur na blue-section
    function handleBlueSection() {
        const blueSection = document.querySelector('.blue-section');
        const heroSection = document.querySelector('.hero-section');
        
        if (blueSection && heroSection) {
            const heroHeight = heroSection.offsetHeight;
            const scrollPosition = window.scrollY;
            
            // Se o scroll está em uma posição onde a blue-section está parcialmente visível
            if (scrollPosition < heroHeight * 0.7) {
                blueSection.classList.add('blurred');
            } else {
                blueSection.classList.remove('blurred');
            }
        }
    }
    
    // Combina ambas as funções de scroll
    function handleScroll() {
        shrinkNavbar();
        handleBlueSection();
        highlightNavOnScroll();
    }
    
    window.addEventListener('scroll', handleScroll);
    
    // Executa as funções no carregamento da página
    shrinkNavbar();
    handleBlueSection();
    
    // Verifica o redimensionamento da tela para gerenciar o menu
    window.addEventListener('resize', function() {
        if (window.innerWidth > 576 && mainNavUl.classList.contains('active')) {
            mainNavUl.classList.remove('active');
            document.body.classList.remove('menu-open');
            
            // Restaura o estado do botão hambúrguer
            const spans = menuToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
    
    // Adiciona classes para animações iniciais
    document.querySelectorAll('.hero-section > *').forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('animate-fade-in');
        }, 300 * index);
    });
    
    // Configuração do Intersection Observer para animações baseadas em scroll
    const observerOptions = {
        root: null, // Usa o viewport como referência
        rootMargin: '0px', // Sem margens
        threshold: 0.2 // Aciona quando 20% do elemento estiver visível
    };
    
    // Elementos a serem observados
    const blueSection = document.querySelector('.hidden-footer');
    const sectionText = document.querySelector('.hidden-text');
    const logosContainer = document.querySelector('.hidden-logos');
    const serviceCards = document.querySelectorAll('.hidden-card');
    const hiddenSections = document.querySelectorAll('.hidden-section');
    const aboutElements = document.querySelectorAll('.hidden-about-element');
    const statItems = document.querySelectorAll('.hidden-stat');
    const servicesCtaSection = document.querySelector('.services-cta-section');
    const serviceItems = document.querySelectorAll('.hidden-service');
    const whyChooseText = document.querySelector('.why-choose-text');
    
    // Função callback para quando os elementos se tornarem visíveis
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Adiciona a classe 'show' para iniciar a animação
                entry.target.classList.add('show');
                
                // Para de observar após a animação ser acionada
                observer.unobserve(entry.target);
            }
        });
    };
    
    // Cria o observer
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    // Começa a observar os elementos
    if (blueSection) observer.observe(blueSection);
    if (sectionText) observer.observe(sectionText);
    if (logosContainer) observer.observe(logosContainer);
    if (servicesCtaSection) observer.observe(servicesCtaSection);
    if (whyChooseText) observer.observe(whyChooseText);
    
    // Observar as seções que devem aparecer com animação
    hiddenSections.forEach((section) => {
        if (section) observer.observe(section);
    });
    
    // Observar elementos da seção Sobre
    aboutElements.forEach((element) => {
        if (element) observer.observe(element);
    });
    
    // Observar itens de estatísticas com delay crescente
    statItems.forEach((stat, index) => {
        if (stat) {
            const statObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.classList.add('show');
                        }, 200 * index);
                        observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);
            
            statObserver.observe(stat);
        }
    });
    
    // Observar cada card individualmente com delay escalonado
    serviceCards.forEach((card, index) => {
        if (card) {
            // Criamos um novo observer para cada card com um delay personalizado
            const cardObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Adicionamos um delay crescente para cada card
                        setTimeout(() => {
                            entry.target.classList.add('show');
                        }, 150 * index); // 150ms de delay para cada card
                        
                        // Para de observar após a animação ser acionada
                        observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);
            
            cardObserver.observe(card);
        }
    });
    
    // Observar cada item de serviço individualmente com delay escalonado
    serviceItems.forEach((item, index) => {
        if (item) {
            // Criamos um novo observer para cada item com um delay personalizado
            const serviceObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Adicionamos um delay crescente para cada item
                        setTimeout(() => {
                            entry.target.classList.add('show');
                        }, 120 * index); // 120ms de delay para cada item
                        
                        // Para de observar após a animação ser acionada
                        observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);
            
            serviceObserver.observe(item);
        }
    });
    
    // Função para configurar o slider infinito
    function setupInfiniteSlider() {
        const sliderTrack = document.querySelector('.logo-slider-track');
        
        // Se o slider já existe, configura a animação
        if (sliderTrack) {
            // Ajusta a velocidade da animação com base no número de logos
            const logoCount = document.querySelectorAll('.logo-slide').length / 3; // Dividido por 3 porque temos 3 conjuntos
            // Velocidade ainda mais reduzida - pelo menos 40s, ou 10s por conjunto de logos
            const animationDuration = Math.max(logoCount * 6, 40);
            
            sliderTrack.style.animationDuration = `${animationDuration}s`;
        }
    }
    
    // Configura o slider infinito
    setupInfiniteSlider();
    
    // Reconfigura o slider em caso de redimensionamento da janela
    window.addEventListener('resize', setupInfiniteSlider);
});

// Função para fazer scroll suave até a seção de planos
function scrollToPlans() {
    const servicosSection = document.getElementById('servicos');
    if (servicosSection) {
        servicosSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Função para fazer scroll suave até a home (topo da página)
function scrollToHome() {
    const homeSection = document.getElementById('home');
    if (homeSection) {
        homeSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    } else {
        // Fallback para scroll para o topo se a seção home não for encontrada
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}

// Inicialização das animações da seção hero
document.addEventListener('DOMContentLoaded', function() {
    // Observa se a hero section está visível para iniciar as animações
    const heroSection = document.querySelector('.hero-section');
    const heroContent = document.querySelector('.hero-text-content');
    
    if (heroSection && heroContent) {
        // Força a execução das animações CSS quando a página carrega
        setTimeout(() => {
            heroContent.style.opacity = '0';
            heroContent.style.transform = 'translateY(30px)';
            heroContent.style.animation = 'heroFadeIn 1.2s ease 0.5s forwards';
        }, 100);
    }
    
    // Adiciona efeito de hover adicional ao botão CTA
    const ctaButton = document.querySelector('.hero-cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 15px 35px rgba(201, 225, 101, 0.4)';
        });
        
        ctaButton.addEventListener('mouseleave', function() {
            this.style.boxShadow = 'none';
        });
    }
    
    // Adiciona efeito de hover adicional ao botão do Calendly
    const calendlyButton = document.querySelector('.calendly-cta-button');
    if (calendlyButton) {
        calendlyButton.addEventListener('mouseenter', function() {
            this.style.background = 'linear-gradient(135deg, #d4f170 0%, #b8d05f 100%)';
        });
        
        calendlyButton.addEventListener('mouseleave', function() {
            this.style.background = 'linear-gradient(135deg, #C9E165 0%, #a8c654 100%)';
        });
        
        // Adiciona efeito de pulsação sutil
        setInterval(() => {
            if (!calendlyButton.matches(':hover')) {
                calendlyButton.style.transform = 'scale(1.02)';
                setTimeout(() => {
                    if (!calendlyButton.matches(':hover')) {
                        calendlyButton.style.transform = 'scale(1)';
                    }
                }, 300);
            }
        }, 4000); // Pulsa a cada 4 segundos
    }
});

// Adiciona um pequeno delay para garantir que as animações funcionem corretamente
window.addEventListener('load', function() {
    const heroTextContent = document.querySelector('.hero-text-content');
    if (heroTextContent) {
        heroTextContent.classList.add('loaded');
    }
});

// Função para reativar animações se necessário (para desenvolvimento)
function resetHeroAnimations() {
    const heroText = document.querySelector('.hero-main-text');
    const heroButton = document.querySelector('.hero-cta-button');
    const heroContent = document.querySelector('.hero-text-content');
    
    if (heroContent) {
        heroContent.style.animation = 'none';
        heroContent.offsetHeight; // força reflow
        heroContent.style.animation = 'heroFadeIn 1.2s ease 0.5s forwards';
    }
    
    if (heroText) {
        heroText.style.animation = 'none';
        heroText.offsetHeight; // força reflow
        heroText.style.animation = 'textSlideIn 1s ease 1s forwards';
    }
    
    if (heroButton) {
        heroButton.style.animation = 'none';
        heroButton.offsetHeight; // força reflow
        heroButton.style.animation = 'buttonSlideIn 1s ease 1.5s forwards';
    }
}