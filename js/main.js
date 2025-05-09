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
            const sectionTop = section.offsetTop - 100; // offset para considerar altura do header/menu
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
    
    // Adiciona o listener de scroll
    window.addEventListener('scroll', highlightNavOnScroll);
    
    // Reduz o tamanho da navbar durante a rolagem
    function shrinkNavbar() {
        const navbar = document.querySelector('.main-nav');
        if (window.scrollY > 100) {
            navbar.style.padding = '10px 0';
        } else {
            navbar.style.padding = '20px 0';
        }
    }
    
    window.addEventListener('scroll', shrinkNavbar);
    
    // Executa a função no carregamento da página
    shrinkNavbar();
    
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