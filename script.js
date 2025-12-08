        // Частинки на фоні
        document.addEventListener('DOMContentLoaded', function() {
            // Ініціалізація частинок на фоні
            initParticles();
            
            // Ініціалізація всіх скриптів
            initTypewriter();
            initMobileMenu();
            initScrollAnimations();
            initNavHighlight();
            initGallery();
            initContactForm();
            initDownloadResume();
            initStickyHeader();
            initQuickNav();
            initCounter();
            initConsole();
            initCyberCube();
            initThreatMap();
            initCyberQuiz();
            initCyberLab();
            initQuickNav();
        });
        
        // Частинки на фоні
        function initParticles() {
            const canvas = document.createElement('canvas');
            canvas.id = 'particles-canvas';
            canvas.style.position = 'fixed';
            canvas.style.top = '0';
            canvas.style.left = '0';
            canvas.style.width = '100%';
            canvas.style.height = '100%';
            canvas.style.zIndex = '-1';
            document.body.appendChild(canvas);
            
            const ctx = canvas.getContext('2d');
            let particles = [];
            const particleCount = 80;
            
            // Налаштування розмірів canvas
            function resizeCanvas() {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            }
            
            resizeCanvas();
            window.addEventListener('resize', resizeCanvas);
            
            // Клас частинки
            class Particle {
                constructor() {
                    this.x = Math.random() * canvas.width;
                    this.y = Math.random() * canvas.height;
                    this.size = Math.random() * 2 + 0.5;
                    this.speedX = Math.random() * 0.5 - 0.25;
                    this.speedY = Math.random() * 0.5 - 0.25;
                    this.color = Math.random() > 0.5 ? 'rgba(0, 234, 255, 0.5)' : 'rgba(143, 96, 255, 0.5)';
                }
                
                update() {
                    this.x += this.speedX;
                    this.y += this.speedY;
                    
                    if (this.x > canvas.width) this.x = 0;
                    else if (this.x < 0) this.x = canvas.width;
                    
                    if (this.y > canvas.height) this.y = 0;
                    else if (this.y < 0) this.y = canvas.height;
                }
                
                draw() {
                    ctx.fillStyle = this.color;
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
            
            // Створення частинок
            function initParticlesArray() {
                particles = [];
                for (let i = 0; i < particleCount; i++) {
                    particles.push(new Particle());
                }
            }
            
            // Анімація частинок
            function animateParticles() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                
                for (let i = 0; i < particles.length; i++) {
                    particles[i].update();
                    particles[i].draw();
                    
                    // З'єднання частинок лініями
                    for (let j = i + 1; j < particles.length; j++) {
                        const dx = particles[i].x - particles[j].x;
                        const dy = particles[i].y - particles[j].y;
                        const distance = Math.sqrt(dx * dx + dy * dy);
                        
                        if (distance < 100) {
                            ctx.strokeStyle = `rgba(0, 234, 255, ${0.2 * (1 - distance/100)})`;
                            ctx.lineWidth = 0.5;
                            ctx.beginPath();
                            ctx.moveTo(particles[i].x, particles[i].y);
                            ctx.lineTo(particles[j].x, particles[j].y);
                            ctx.stroke();
                        }
                    }
                }
                
                requestAnimationFrame(animateParticles);
            }
            
            initParticlesArray();
            animateParticles();
        }
        
        // Ефект друкарської машинки
        function initTypewriter() {
            const typewriterElement = document.getElementById('typewriter');
            const texts = [
                'Студент 5 курсу • Кібербезпека • Digital Forensics • Network Analysis',
                'Практика в Кіберполіції України • Інформаційна безпека • Аналіз загроз',
                'Комп\'ютерна інженерія • Кібербезпека • Реагування на інциденти • Pentesting'
            ];
            let textIndex = 0;
            let charIndex = 0;
            let isDeleting = false;
            let typingSpeed = 100;
            
            function type() {
                const currentText = texts[textIndex];
                
                if (isDeleting) {
                    // Видалення тексту
                    typewriterElement.textContent = currentText.substring(0, charIndex - 1);
                    charIndex--;
                    typingSpeed = 50;
                } else {
                    // Друкування тексту
                    typewriterElement.textContent = currentText.substring(0, charIndex + 1);
                    charIndex++;
                    typingSpeed = 100;
                }
                
                // Якщо текст повністю надруковано
                if (!isDeleting && charIndex === currentText.length) {
                    isDeleting = true;
                    typingSpeed = 1500; // Пауза перед видаленням
                }
                // Якщо текст повністю видалено
                else if (isDeleting && charIndex === 0) {
                    isDeleting = false;
                    textIndex = (textIndex + 1) % texts.length;
                    typingSpeed = 500; // Пауза перед новим текстом
                }
                
                setTimeout(type, typingSpeed);
            }
            
            // Запуск ефекту після затримки
            setTimeout(type, 1000);
        }
        
        // Мобільне меню
        function initMobileMenu() {
            const mobileMenuBtn = document.getElementById('mobileMenuBtn');
            const navList = document.getElementById('navList');
            
            mobileMenuBtn.addEventListener('click', function() {
                navList.classList.toggle('active');
                mobileMenuBtn.innerHTML = navList.classList.contains('active') 
                    ? '<i class="fas fa-times"></i>' 
                    : '<i class="fas fa-bars"></i>';
            });
            
            // Закриття меню при кліку на посилання
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.addEventListener('click', function() {
                    navList.classList.remove('active');
                    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                });
            });
        }
        
        // Анімації при скролі
        function initScrollAnimations() {
            const fadeElements = document.querySelectorAll('.fade-in');
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });
            
            fadeElements.forEach(element => {
                observer.observe(element);
            });
        }
        
        function initNavHighlight() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        const quickNavItems = document.querySelectorAll('.quick-nav-item');
        
        window.addEventListener('scroll', function() {
            let current = '';
            const scrollPosition = window.scrollY + 100;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });
            
            // Оновити основну навігацію
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').substring(1) === current) {
                    link.classList.add('active');
                }
            });
            
            // Оновити швидку навігацію
            quickNavItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('data-target') === current) {
                    item.classList.add('active');
                }
            });
        });
    }
        
        // Галерея з lightbox
        function initGallery() {
            const galleryItems = document.querySelectorAll('.gallery-item');
            const lightbox = document.getElementById('lightbox');
            const lightboxImg = document.getElementById('lightboxImg');
            const lightboxClose = document.getElementById('lightboxClose');
            
            galleryItems.forEach(item => {
                item.addEventListener('click', function() {
                    const imgSrc = this.querySelector('img').src;
                    lightboxImg.src = imgSrc;
                    lightbox.classList.add('active');
                    document.body.style.overflow = 'hidden';
                });
            });
            
            lightboxClose.addEventListener('click', function() {
                lightbox.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
            
            lightbox.addEventListener('click', function(e) {
                if (e.target === lightbox) {
                    lightbox.classList.remove('active');
                    document.body.style.overflow = 'auto';
                }
            });
            
            // Закриття по Escape
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                    lightbox.classList.remove('active');
                    document.body.style.overflow = 'auto';
                }
            });
        }
        
        // Форма контактів
        function initContactForm() {
            const contactForm = document.getElementById('contactForm');
            
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Отримання даних форми
                const formData = new FormData(contactForm);
                const name = contactForm.querySelector('input[type="text"]').value;
                
                // Симуляція відправки форми
                alert(`Дякую, ${name}! Ваше повідомлення було "відправлено". Це демонстраційний функціонал.`);
                
                // Очищення форми
                contactForm.reset();
            });
        }
        
        // Кнопка завантаження резюме
        function initDownloadResume() {
            const downloadBtn = document.getElementById('downloadResume');
            
            downloadBtn.addEventListener('click', function(e) {
                e.preventDefault();
                alert('Це демонстраційна кнопка. У реальному варіанті тут можна було б завантажити резюме.');
            });
        }
        
        // Sticky header
        function initStickyHeader() {
            const header = document.getElementById('header');
            
            window.addEventListener('scroll', function() {
                if (window.scrollY > 100) {
                    header.classList.add('sticky');
                } else {
                    header.classList.remove('sticky');
                }
            });
        }
        // Додати в існуючий JavaScript (після initStickyHeader функції)
        function initQuickNav() {
            const quickNavItems = document.querySelectorAll('.quick-nav-item');
            const sections = document.querySelectorAll('section');
            
            // Обробник кліку по точках навігації
            quickNavItems.forEach(item => {
                item.addEventListener('click', function() {
                    const targetId = this.getAttribute('data-target');
                    const targetSection = document.getElementById(targetId);
                    
                    if (targetSection) {
                        window.scrollTo({
                            top: targetSection.offsetTop - 80,
                            behavior: 'smooth'
                        });
                    }
                });
            });
            
            // Оновлення активних точок при скролі
            window.addEventListener('scroll', function() {
                let currentSection = '';
                
                sections.forEach(section => {
                    const sectionTop = section.offsetTop - 150;
                    const sectionHeight = section.clientHeight;
                    
                    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                        currentSection = section.getAttribute('id');
                    }
                });
                
                quickNavItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('data-target') === currentSection) {
                        item.classList.add('active');
                    }
                });
            });
        }

        // Не забудьте викликати функцію в DOMContentLoaded
        // Додайте цей виклик в кінець події DOMContentLoaded:
        // initQuickNav();
        // Додати в існуючий JavaScript
        function initCounter() {
            const counters = document.querySelectorAll('.counter-number');
            const speed = 200; // Швидкість анімації
            
            const animateCounter = (counter) => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const increment = target / speed;
                
                if (count < target) {
                    counter.innerText = Math.ceil(count + increment);
                    setTimeout(() => animateCounter(counter), 10);
                } else {
                    counter.innerText = target;
                }
            };
            
            // Запуск анімації при скролі до секції
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        counters.forEach(counter => {
                            animateCounter(counter);
                        });
                        observer.disconnect();
                    }
                });
            }, { threshold: 0.5 });
            
            const skillsSection = document.getElementById('skills');
            if (skillsSection) {
                observer.observe(skillsSection);
            }
        }

        // Викликати в DOMContentLoaded
        // Додати в існуючий JavaScript
        function initConsole() {
            const consoleInput = document.getElementById('consoleInput');
            const consoleOutput = document.getElementById('consoleOutput');
            
            const commands = {
                help: {
                    description: "Показати список доступних команд",
                    execute: () => {
                        addOutputLine("Доступні команди:");
                        addOutputLine("• help - ця довідка");
                        addOutputLine("• skills - показати навички");
                        addOutputLine("• tasks - показати завдання");
                        addOutputLine("• contact - контактна інформація");
                        addOutputLine("• clear - очистити консоль");
                        addOutputLine("• date - поточна дата");
                        addOutputLine("• status - статус практики");
                    }
                },
                skills: {
                    description: "Показати навички, отримані під час практики",
                    execute: () => {
                        addOutputLine("Навички отримані під час практики:");
                        addOutputLine("• Аналіз логів та SIEM-систем");
                        addOutputLine("• Цифрова криміналістика");
                        addOutputLine("• Мережева безпека (TCP/IP, firewall)");
                        addOutputLine("• Робота з Wireshark/tcpdump");
                        addOutputLine("• Автоматизація (Python/Bash)");
                        addOutputLine("• Реагування на інциденти");
                        addOutputLine("• Технічне документування");
                    }
                },
                tasks: {
                    description: "Показати завдання практики",
                    execute: () => {
                        addOutputLine("Основні завдання практики:");
                        addOutputLine("• Аналіз підозрілих логів");
                        addOutputLine("• Розробка скриптів для перевірки IoC");
                        addOutputLine("• Створення технічних звітів");
                        addOutputLine("• Дослідження фішингових атак");
                        addOutputLine("• Аналіз мережевого трафіку");
                        addOutputLine("• Обробка даних інцидентів");
                    }
                },
                contact: {
                    description: "Контактна інформація",
                    execute: () => {
                        addOutputLine("Контакти практиканта:");
                        addOutputLine("• Ім'я: Олександр Петренко");
                        addOutputLine("• Спеціальність: Кібербезпека, 5 курс");
                        addOutputLine("• Email: student.cybersecurity@example.com");
                        addOutputLine("• Період практики: червень-серпень 2023");
                    }
                },
                clear: {
                    description: "Очистити консоль",
                    execute: () => {
                        consoleOutput.innerHTML = '';
                        addOutputLine("Консоль очищена. Введіть 'help' для списку команд.");
                    }
                },
                date: {
                    description: "Показати поточну дату",
                    execute: () => {
                        const now = new Date();
                        addOutputLine(`Поточна дата: ${now.toLocaleDateString('uk-UA')}`);
                        addOutputLine(`Час: ${now.toLocaleTimeString('uk-UA')}`);
                    }
                },
                status: {
                    description: "Статус проходження практики",
                    execute: () => {
                        addOutputLine("Статус практики в Кіберполіції:");
                        addOutputLine("• Організація: Кіберполіція України");
                        addOutputLine("• Статус: <span class='success'>Успішно завершено</span>");
                        addOutputLine("• Тривалість: 3 місяці");
                        addOutputLine("• Оцінка: <span class='success'>Відмінно</span>");
                    }
                }
            };
            
            function addOutputLine(text) {
                const line = document.createElement('div');
                line.className = 'console-line';
                line.innerHTML = text;
                consoleOutput.appendChild(line);
                consoleOutput.scrollTop = consoleOutput.scrollHeight;
            }
            
            function processCommand(cmd) {
                addOutputLine(`$ ${cmd}`);
                
                const trimmedCmd = cmd.trim().toLowerCase();
                
                if (trimmedCmd === '') {
                    return;
                }
                
                if (commands[trimmedCmd]) {
                    commands[trimmedCmd].execute();
                } else {
                    addOutputLine(`<span class="error">Команда "${cmd}" не знайдена. Введіть "help" для списку команд.</span>`);
                }
                
                // Додати новий промпт
                addOutputLine('$ <span class="blink">_</span>');
            }
            
            // Обробка введення команди
            consoleInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    const command = this.value;
                    this.value = '';
                    processCommand(command);
                }
            });
            
            // Клік по командам у підказках
            document.querySelectorAll('.console-hints .command').forEach(el => {
                el.addEventListener('click', function() {
                    const cmd = this.textContent;
                    consoleInput.value = cmd;
                    consoleInput.focus();
                });
            });
        }
        // Додати в існуючий JavaScript
        function initCyberCube() {
            const cube = document.getElementById('cyberCube');
            const rotateXBtn = document.getElementById('cubeRotateX');
            const rotateYBtn = document.getElementById('cubeRotateY');
            const rotateZBtn = document.getElementById('cubeRotateZ');
            const autoRotateBtn = document.getElementById('cubeAutoRotate');
            
            let rotation = { x: 20, y: 20, z: 0 };
            let autoRotate = false;
            let autoRotateInterval;
            
            function updateCubeTransform() {
                cube.style.transform = `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) rotateZ(${rotation.z}deg)`;
            }
            
            rotateXBtn.addEventListener('click', () => {
                rotation.x += 45;
                updateCubeTransform();
            });
            
            rotateYBtn.addEventListener('click', () => {
                rotation.y += 45;
                updateCubeTransform();
            });
            
            rotateZBtn.addEventListener('click', () => {
                rotation.z += 45;
                updateCubeTransform();
            });
            
            autoRotateBtn.addEventListener('click', () => {
                autoRotate = !autoRotate;
                
                if (autoRotate) {
                    autoRotateBtn.innerHTML = '<i class="fas fa-pause"></i> Стоп';
                    autoRotateBtn.style.borderColor = 'var(--accent-green)';
                    autoRotateBtn.style.color = 'var(--accent-green)';
                    
                    autoRotateInterval = setInterval(() => {
                        rotation.y += 2;
                        updateCubeTransform();
                    }, 50);
                } else {
                    autoRotateBtn.innerHTML = '<i class="fas fa-play"></i> Авто';
                    autoRotateBtn.style.borderColor = 'var(--accent-blue)';
                    autoRotateBtn.style.color = 'var(--accent-blue)';
                    clearInterval(autoRotateInterval);
                }
            });
            
            // Дозволити обертання куба мишею
            let isDragging = false;
            let previousMousePosition = { x: 0, y: 0 };
            
            cube.addEventListener('mousedown', (e) => {
                isDragging = true;
                previousMousePosition = { x: e.clientX, y: e.clientY };
            });
            
            document.addEventListener('mousemove', (e) => {
                if (!isDragging) return;
                
                const deltaX = e.clientX - previousMousePosition.x;
                const deltaY = e.clientY - previousMousePosition.y;
                
                rotation.y += deltaX * 0.5;
                rotation.x -= deltaY * 0.5;
                
                updateCubeTransform();
                previousMousePosition = { x: e.clientX, y: e.clientY };
            });
            
            document.addEventListener('mouseup', () => {
                isDragging = false;
            });
            
            // Для мобільних пристроїв
            cube.addEventListener('touchstart', (e) => {
                isDragging = true;
                previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
                e.preventDefault();
            });
            
            document.addEventListener('touchmove', (e) => {
                if (!isDragging) return;
                
                const deltaX = e.touches[0].clientX - previousMousePosition.x;
                const deltaY = e.touches[0].clientY - previousMousePosition.y;
                
                rotation.y += deltaX * 0.5;
                rotation.x -= deltaY * 0.5;
                
                updateCubeTransform();
                previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
                e.preventDefault();
            });
            
            document.addEventListener('touchend', () => {
                isDragging = false;
            });
        }

        // Викликати в DOMContentLoaded
        // Викликати в DOMContentLoaded
        // Додати в існуючий JavaScript
        function initThreatMap() {
            const simulateBtn = document.getElementById('simulateAttack');
            const defenseBtn = document.getElementById('showDefense');
            const resetBtn = document.getElementById('resetMap');
            const attackCount = document.getElementById('attackCount');
            const cityMarkers = document.querySelectorAll('.city-marker');
            const statFills = document.querySelectorAll('.stat-fill');
            const attackLines = document.querySelectorAll('.attack-line');
            
            let currentAttackCount = 142;
            let isDefenseMode = false;
            let attackInterval;
            
            // Оновлення лічильника атак
            function updateAttackCount() {
                attackCount.textContent = currentAttackCount;
            }
            
            // Симуляція атаки
            function simulateAttack() {
                // Збільшити лічильник
                currentAttackCount += Math.floor(Math.random() * 10) + 1;
                updateAttackCount();
                
                // Анімація міток
                cityMarkers.forEach(marker => {
                    const markerDot = marker.querySelector('.marker-dot');
                    markerDot.style.transform = 'translate(-50%, -50%) scale(1.5)';
                    markerDot.style.boxShadow = '0 0 30px #ff5555';
                    
                    setTimeout(() => {
                        markerDot.style.transform = 'translate(-50%, -50%) scale(1)';
                        markerDot.style.boxShadow = '0 0 15px #ff5555';
                    }, 300);
                });
                
                // Додати нові лінії атак
                addAttackLine();
                
                // Анімація статистики
                animateStats();
                
                // Ефект глітчу на заголовку
                const mapTitle = document.querySelector('.map-title');
                mapTitle.style.animation = 'glitch-effect 0.3s';
                setTimeout(() => {
                    mapTitle.style.animation = '';
                }, 300);
            }
            
            // Додати лінію атаки
            function addAttackLine() {
                const mapVisual = document.querySelector('.ukraine-outline');
                const attackLine = document.createElement('div');
                
                attackLine.className = 'attack-line';
                attackLine.style.top = Math.random() * 80 + 10 + '%';
                attackLine.style.left = Math.random() * 80 + 10 + '%';
                
                mapVisual.appendChild(attackLine);
                
                // Видалити через 5 секунд
                setTimeout(() => {
                    if (attackLine.parentNode) {
                        attackLine.remove();
                    }
                }, 5000);
            }
            
            // Анімація статистики
            function animateStats() {
                statFills.forEach(fill => {
                    const currentWidth = parseInt(fill.style.width);
                    const targetWidth = parseInt(fill.getAttribute('data-width'));
                    const newWidth = Math.min(100, Math.max(0, targetWidth + (Math.random() * 5 - 2.5)));
                    
                    fill.setAttribute('data-width', newWidth);
                    
                    // Плавна анімація
                    let width = currentWidth;
                    const interval = setInterval(() => {
                        if (width < newWidth) {
                            width += 0.5;
                        } else if (width > newWidth) {
                            width -= 0.5;
                        } else {
                            clearInterval(interval);
                        }
                        fill.style.width = width + '%';
                    }, 10);
                });
            }
            
            // Показати режим захисту
            function showDefense() {
                isDefenseMode = !isDefenseMode;
                
                if (isDefenseMode) {
                    defenseBtn.innerHTML = '<i class="fas fa-shield-alt"></i> Захист активний';
                    defenseBtn.style.background = 'rgba(0, 255, 157, 0.2)';
                    defenseBtn.style.borderColor = 'var(--accent-green)';
                    defenseBtn.style.color = 'var(--accent-green)';
                    
                    // Змінити колір міток на зелений
                    cityMarkers.forEach(marker => {
                        const markerDot = marker.querySelector('.marker-dot');
                        markerDot.style.background = '#55ff55';
                        markerDot.style.boxShadow = '0 0 20px #55ff55';
                        
                        const markerPulse = marker.querySelector('.marker-pulse');
                        markerPulse.style.background = 'rgba(85, 255, 85, 0.3)';
                    });
                    
                    // Додати ефект щита
                    const mapVisual = document.querySelector('.map-visual');
                    const shieldEffect = document.createElement('div');
                    shieldEffect.className = 'shield-effect';
                    shieldEffect.style.cssText = `
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        border-radius: 15px;
                        border: 3px solid rgba(0, 255, 157, 0.5);
                        box-shadow: 0 0 50px rgba(0, 255, 157, 0.3);
                        pointer-events: none;
                        z-index: 5;
                        animation: shieldPulse 2s infinite;
                    `;
                    
                    mapVisual.appendChild(shieldEffect);
                    
                    // Зупинити автоматичні атаки
                    if (attackInterval) {
                        clearInterval(attackInterval);
                    }
                    
                } else {
                    defenseBtn.innerHTML = '<i class="fas fa-shield-alt"></i> Показати захист';
                    defenseBtn.style.background = '';
                    defenseBtn.style.borderColor = 'var(--accent-green)';
                    defenseBtn.style.color = 'var(--text-primary)';
                    
                    // Повернути початкові кольори
                    cityMarkers.forEach((marker, index) => {
                        const markerDot = marker.querySelector('.marker-dot');
                        const markerPulse = marker.querySelector('.marker-pulse');
                        
                        if (index === 0 || index === 1) {
                            markerDot.style.background = '#ff5555';
                            markerPulse.style.background = 'rgba(255, 85, 85, 0.3)';
                        } else if (index === 2 || index === 3) {
                            markerDot.style.background = '#ffaa00';
                            markerPulse.style.background = 'rgba(255, 170, 0, 0.3)';
                        } else {
                            markerDot.style.background = '#55ff55';
                            markerPulse.style.background = 'rgba(85, 255, 85, 0.3)';
                        }
                        
                        markerDot.style.boxShadow = '0 0 15px ' + markerDot.style.background;
                    });
                    
                    // Видалити ефект щита
                    const shieldEffect = document.querySelector('.shield-effect');
                    if (shieldEffect) {
                        shieldEffect.remove();
                    }
                }
            }
            
            // Скинути карту
            function resetMap() {
                currentAttackCount = 142;
                updateAttackCount();
                
                // Повернути початкові значення статистики
                const initialValues = [42, 28, 15, 10, 5];
                statFills.forEach((fill, index) => {
                    fill.setAttribute('data-width', initialValues[index]);
                    fill.style.width = initialValues[index] + '%';
                });
                
                // Видалити всі лінії атак
                const allLines = document.querySelectorAll('.attack-line');
                allLines.forEach(line => {
                    if (line.parentNode) {
                        line.remove();
                    }
                });
                
                // Вийти з режиму захисту
                if (isDefenseMode) {
                    showDefense();
                }
            }
            
            // Автоматичні атаки
            function startAutoAttacks() {
                attackInterval = setInterval(() => {
                    if (!isDefenseMode && Math.random() > 0.7) {
                        simulateAttack();
                    }
                }, 3000);
            }
            
            // Ініціалізація
            updateAttackCount();
            startAutoAttacks();
            
            // Обробники подій
            simulateBtn.addEventListener('click', simulateAttack);
            defenseBtn.addEventListener('click', showDefense);
            resetBtn.addEventListener('click', resetMap);
            
            // Додати CSS для анімації щита
            const style = document.createElement('style');
            style.textContent = `
                @keyframes shieldPulse {
                    0%, 100% { opacity: 0.5; }
                    50% { opacity: 0.8; }
                }
                
                @keyframes glitch-effect {
                    0% { transform: translate(0); }
                    20% { transform: translate(-3px, 3px); }
                    40% { transform: translate(-3px, -3px); }
                    60% { transform: translate(3px, 3px); }
                    80% { transform: translate(3px, -3px); }
                    100% { transform: translate(0); }
                }
            `;
            document.head.appendChild(style);
        }
        // Додати в існуючий JavaScript
        function initCyberQuiz() {
            const quizQuestions = [
                {
                    id: 1,
                    question: "Ви отримали email від банку з посиланням для підтвердження даних картки. Що робити?",
                    options: [
                        { text: "Перейти за посиланням та ввести дані", correct: false },
                        { text: "Не відкривати, сповістити банк про можливий фішинг", correct: true },
                        { text: "Переслати друзям, щоб перевірили", correct: false }
                    ]
                },
                {
                    id: 2,
                    question: "Який пароль найбільш стійкий до атак підбору?",
                    options: [
                        { text: "qwerty123", correct: false },
                        { text: "ivan1990", correct: false },
                        { text: "P@ssw0rd!2023#Kyiv", correct: true }
                    ]
                },
                {
                    id: 3,
                    question: "Що таке двофакторна аутентифікація (2FA)?",
                    options: [
                        { text: "Два різних паролі для одного акаунту", correct: false },
                        { text: "Пароль + додатковий код з SMS/додатку", correct: true },
                        { text: "Автоматичний вхід на всіх пристроях", correct: false }
                    ]
                },
                {
                    id: 4,
                    question: "Як розпізнати фішинговий сайт?",
                    options: [
                        { text: "Неправильна адреса (наприклад, faceb00k.com замість facebook.com)", correct: true },
                        { text: "Відсутній SSL сертифікат (замок у рядку адреси)", correct: true },
                        { text: "Граматичні помилки та низька якість дизайну", correct: true }
                    ],
                    multiple: true
                },
                {
                    id: 5,
                    question: "Що робити, якщо ваш комп'ютер заражено вірусом?",
                    options: [
                        { text: "Видалити всі файли з комп'ютера", correct: false },
                        { text: "Відключити від інтернету та запустити антивірус", correct: true },
                        { text: "Продовжити роботу, ігноруючи попередження", correct: false }
                    ]
                }
            ];
            
            // Елементи DOM
            const currentQuestionEl = document.getElementById('currentQuestion');
            const totalQuestionsEl = document.getElementById('totalQuestions');
            const quizProgressEl = document.getElementById('quizProgress');
            const prevBtn = document.getElementById('prevQuestion');
            const nextBtn = document.getElementById('nextQuestion');
            const submitBtn = document.getElementById('submitQuiz');
            const quizResultEl = document.getElementById('quizResult');
            const retryBtn = document.getElementById('retryQuiz');
            const shareBtn = document.getElementById('shareQuiz');
            
            // Елементи результатів
            const finalScoreEl = document.getElementById('finalScore');
            const resultTitleEl = document.getElementById('resultTitle');
            const resultMessageEl = document.getElementById('resultMessage');
            const correctAnswersEl = document.getElementById('correctAnswers');
            const quizTimeEl = document.getElementById('quizTime');
            const accuracyEl = document.getElementById('accuracy');
            
            let currentQuestionIndex = 0;
            let userAnswers = {};
            let quizStartTime;
            let quizResults = [];
            
            // Ініціалізація тесту
            function initQuiz() {
                totalQuestionsEl.textContent = quizQuestions.length;
                updateProgress();
                startTimer();
                
                // Ініціалізація подій для варіантів відповідей
                document.querySelectorAll('.quiz-option').forEach(option => {
                    option.addEventListener('click', handleOptionClick);
                });
                
                // Обробники кнопок
                prevBtn.addEventListener('click', showPreviousQuestion);
                nextBtn.addEventListener('click', showNextQuestion);
                submitBtn.addEventListener('click', showResults);
                retryBtn.addEventListener('click', restartQuiz);
                shareBtn.addEventListener('click', shareResults);
                
                // Початковий стан кнопок
                updateNavButtons();
            }
            
            // Обробник кліку по варіанту відповіді
            function handleOptionClick(e) {
                const option = e.currentTarget;
                const questionId = parseInt(option.closest('.quiz-question').getAttribute('data-question'));
                const optionIndex = Array.from(option.parentNode.children).indexOf(option);
                const question = quizQuestions.find(q => q.id === questionId);
                
                if (question.multiple) {
                    // Множинний вибір
                    option.classList.toggle('selected');
                    
                    if (!userAnswers[questionId]) {
                        userAnswers[questionId] = [];
                    }
                    
                    const index = userAnswers[questionId].indexOf(optionIndex);
                    if (index > -1) {
                        userAnswers[questionId].splice(index, 1);
                    } else {
                        userAnswers[questionId].push(optionIndex);
                    }
                } else {
                    // Одиночний вибір
                    const options = option.parentNode.querySelectorAll('.quiz-option');
                    options.forEach(opt => opt.classList.remove('selected'));
                    option.classList.add('selected');
                    userAnswers[questionId] = optionIndex;
                }
                
                // Перевірити, чи є відповідь на поточне питання
                checkCurrentAnswer();
            }
            
            // Перевірка відповіді на поточне питання
            function checkCurrentAnswer() {
                const questionId = quizQuestions[currentQuestionIndex].id;
                const hasAnswer = userAnswers[questionId] !== undefined && 
                                (Array.isArray(userAnswers[questionId]) ? userAnswers[questionId].length > 0 : true);
                
                // Оновити стан кнопки "Далі" та "Завершити"
                if (currentQuestionIndex === quizQuestions.length - 1 && hasAnswer) {
                    submitBtn.style.display = 'block';
                    nextBtn.style.display = 'none';
                } else {
                    submitBtn.style.display = 'none';
                    nextBtn.style.display = 'block';
                }
            }
            
            // Показати попереднє питання
            function showPreviousQuestion() {
                if (currentQuestionIndex > 0) {
                    currentQuestionIndex--;
                    showQuestion(currentQuestionIndex);
                    updateProgress();
                    updateNavButtons();
                }
            }
            
            // Показати наступне питання
            function showNextQuestion() {
                if (currentQuestionIndex < quizQuestions.length - 1) {
                    currentQuestionIndex++;
                    showQuestion(currentQuestionIndex);
                    updateProgress();
                    updateNavButtons();
                }
            }
            
            // Показати конкретне питання
            function showQuestion(index) {
                // Приховати всі питання
                document.querySelectorAll('.quiz-question').forEach(q => {
                    q.classList.remove('active');
                });
                
                // Показати поточне питання
                document.getElementById(`question${index + 1}`).classList.add('active');
                
                // Оновити номер питання
                currentQuestionEl.textContent = index + 1;
                
                // Відновити вибір користувача (якщо є)
                const questionId = quizQuestions[index].id;
                const userAnswer = userAnswers[questionId];
                
                if (userAnswer !== undefined) {
                    const options = document.querySelectorAll(`#question${index + 1} .quiz-option`);
                    
                    if (Array.isArray(userAnswer)) {
                        // Множинний вибір
                        userAnswer.forEach(answerIndex => {
                            if (options[answerIndex]) {
                                options[answerIndex].classList.add('selected');
                            }
                        });
                    } else {
                        // Одиночний вибір
                        if (options[userAnswer]) {
                            options[userAnswer].classList.add('selected');
                        }
                    }
                }
                
                // Перевірити відповідь
                checkCurrentAnswer();
            }
            
            // Оновити прогрес
            function updateProgress() {
                const progress = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;
                quizProgressEl.style.width = `${progress}%`;
            }
            
            // Оновити кнопки навігації
            function updateNavButtons() {
                prevBtn.disabled = currentQuestionIndex === 0;
                
                if (currentQuestionIndex === quizQuestions.length - 1) {
                    nextBtn.style.display = 'none';
                    const questionId = quizQuestions[currentQuestionIndex].id;
                    const hasAnswer = userAnswers[questionId] !== undefined && 
                                    (Array.isArray(userAnswers[questionId]) ? userAnswers[questionId].length > 0 : true);
                    
                    if (hasAnswer) {
                        submitBtn.style.display = 'block';
                    }
                } else {
                    nextBtn.style.display = 'block';
                    submitBtn.style.display = 'none';
                }
            }
            
            // Почати таймер
            function startTimer() {
                quizStartTime = Date.now();
            }
            
            // Отримати час тесту
            function getQuizTime() {
                const endTime = Date.now();
                return Math.floor((endTime - quizStartTime) / 1000);
            }
            
            // Перевірити відповіді та показати результати
            function showResults() {
                let correctCount = 0;
                quizResults = [];
                
                // Перевірити кожне питання
                quizQuestions.forEach(question => {
                    const userAnswer = userAnswers[question.id];
                    let isCorrect = false;
                    
                    if (userAnswer !== undefined) {
                        if (question.multiple) {
                            // Множинний вибір
                            const correctIndices = question.options
                                .map((opt, idx) => opt.correct ? idx : -1)
                                .filter(idx => idx !== -1);
                            
                            isCorrect = arraysEqual(userAnswer.sort(), correctIndices.sort());
                        } else {
                            // Одиночний вибір
                            isCorrect = question.options[userAnswer]?.correct || false;
                        }
                    }
                    
                    if (isCorrect) correctCount++;
                    
                    quizResults.push({
                        question: question.question,
                        userAnswer,
                        correctAnswer: question.options.map((opt, idx) => opt.correct ? idx : -1).filter(idx => idx !== -1),
                        isCorrect
                    });
                });
                
                // Обчислити час
                const timeTaken = getQuizTime();
                
                // Показати результати
                showResultScreen(correctCount, timeTaken);
            }
            
            // Порівняння масивів
            function arraysEqual(a, b) {
                if (a.length !== b.length) return false;
                return a.every((val, index) => val === b[index]);
            }
            
            // Показати екран результатів
            function showResultScreen(correctCount, timeTaken) {
                // Приховати питання та показати результати
                document.querySelector('.quiz-content').style.display = 'none';
                quizResultEl.classList.remove('hidden');
                
                // Оновити дані результатів
                finalScoreEl.textContent = correctCount;
                correctAnswersEl.textContent = correctCount;
                quizTimeEl.textContent = timeTaken;
                
                const accuracy = (correctCount / quizQuestions.length) * 100;
                accuracyEl.textContent = `${Math.round(accuracy)}%`;
                
                // Встановити заголовок та повідомлення на основі результатів
                let title, message;
                
                if (correctCount === quizQuestions.length) {
                    title = "Відмінно!";
                    message = "Ви маєте чудові знання з кібербезпеки! Ви би стали відмінним фахівцем Кіберполіції.";
                } else if (correctCount >= quizQuestions.length * 0.7) {
                    title = "Добре!";
                    message = "Непоганий результат! Ви добре орієнтуєтесь в основах кібербезпеки.";
                } else if (correctCount >= quizQuestions.length * 0.5) {
                    title = "Задовільно";
                    message = "Непогано, але є куди рости. Рекомендуємо вивчити матеріали з кібербезпеки.";
                } else {
                    title = "Потрібно вчитись";
                    message = "Ваші знання з кібербезпеки потребують покращення. Будьте обережні в інтернеті!";
                }
                
                resultTitleEl.textContent = title;
                resultMessageEl.textContent = message;
                
                // Приховати кнопки навігації
                document.querySelector('.quiz-controls').style.display = 'none';
            }
            
            // Перезапустити тест
            function restartQuiz() {
                // Скинути змінні
                currentQuestionIndex = 0;
                userAnswers = {};
                quizResults = [];
                
                // Скинути вибір у всіх варіантах
                document.querySelectorAll('.quiz-option').forEach(option => {
                    option.classList.remove('selected', 'correct', 'incorrect');
                });
                
                // Показати перше питання
                showQuestion(0);
                updateProgress();
                updateNavButtons();
                
                // Показати контент тесту та приховати результати
                document.querySelector('.quiz-content').style.display = 'block';
                quizResultEl.classList.add('hidden');
                document.querySelector('.quiz-controls').style.display = 'flex';
                
                // Перезапустити таймер
                startTimer();
            }
            
            // Поділитися результатами
            function shareResults() {
                const score = parseInt(finalScoreEl.textContent);
                const total = quizQuestions.length;
                const time = quizTimeEl.textContent;
                
                const shareText = `Я пройшов тест на кіберграмотність від Кіберполіції України та набрав ${score}/${total} балів за ${time} секунд! Перевір свої знання: ${window.location.href}#cyberQuiz`;
                
                if (navigator.share) {
                    navigator.share({
                        title: 'Мій результат тесту з кібербезпеки',
                        text: shareText,
                        url: window.location.href
                    });
                } else {
                    // Копіювати в буфер обміну
                    navigator.clipboard.writeText(shareText).then(() => {
                        alert('Результат скопійовано в буфер обміну! Тепер ви можете поділитися ним у соціальних мережах.');
                    });
                }
            }
            
            // Ініціалізувати тест
            initQuiz();
        }
        // Додати в існуючий JavaScript
        function initCyberLab() {
            // Елементи DOM
            const toolCards = document.querySelectorAll('.tool-card');
            const toolInterfaces = document.querySelectorAll('.tool-interface');
            const toolTitle = document.getElementById('toolTitle');
            const clearBtn = document.getElementById('clearWorkspace');
            const saveBtn = document.getElementById('saveWorkspace');
            
            // Ініціалізація лабораторії
            function initLab() {
                // Обробники для вибору інструментів
                toolCards.forEach(card => {
                    card.addEventListener('click', function() {
                        const tool = this.getAttribute('data-tool');
                        selectTool(tool);
                    });
                });
                
                // Обробники кнопок
                clearBtn.addEventListener('click', clearWorkspace);
                saveBtn.addEventListener('click', saveWorkspace);
                
                // Ініціалізація інструментів
                initPasswordAnalyzer();
                initHashGenerator();
                initNetworkAnalyzer();
                
                // Початковий інструмент
                selectTool('password');
            }
            
            // Вибір інструмента
            function selectTool(tool) {
                // Оновити активний інструмент
                toolCards.forEach(card => {
                    card.classList.remove('active');
                    if (card.getAttribute('data-tool') === tool) {
                        card.classList.add('active');
                    }
                });
                
                // Показати відповідний інтерфейс
                toolInterfaces.forEach(interface => {
                    interface.classList.remove('active');
                    if (interface.id === `${tool}Tool`) {
                        interface.classList.add('active');
                    }
                });
                
                // Оновити заголовок
                const toolNames = {
                    password: 'Аналізатор паролів',
                    hash: 'Хеш-генератор',
                    network: 'Аналізатор трафіку'
                };
                
                toolTitle.textContent = toolNames[tool];
            }
            
            // Очистити робочу область
            function clearWorkspace() {
                const activeTool = document.querySelector('.tool-interface.active');
                const toolId = activeTool.id;
                
                switch(toolId) {
                    case 'passwordTool':
                        clearPasswordAnalyzer();
                        break;
                    case 'hashTool':
                        clearHashGenerator();
                        break;
                    case 'networkTool':
                        clearNetworkAnalyzer();
                        break;
                }
                
                // Показати сповіщення
                showNotification('Робочу область очищено', 'info');
            }
            
            // Зберегти робочу область
            function saveWorkspace() {
                showNotification('Функція збереження в розробці', 'warning');
            }
            
            // Показати сповіщення
            function showNotification(message, type) {
                // Створити елемент сповіщення
                const notification = document.createElement('div');
                notification.className = `notification ${type}`;
                notification.innerHTML = `
                    <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
                    <span>${message}</span>
                `;
                
                // Додати стилі
                notification.style.cssText = `
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: ${type === 'success' ? 'rgba(0, 255, 157, 0.9)' : 
                                type === 'error' ? 'rgba(255, 85, 85, 0.9)' : 
                                'rgba(0, 234, 255, 0.9)'};
                    color: white;
                    padding: 15px 20px;
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    z-index: 10000;
                    animation: slideIn 0.3s ease, slideOut 0.3s ease 2.7s;
                `;
                
                document.body.appendChild(notification);
                
                // Видалити через 3 секунди
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.remove();
                    }
                }, 3000);
            }
            
            // ===== ІНСТРУМЕНТ 1: АНАЛІЗАТОР ПАРОЛІВ =====
            function initPasswordAnalyzer() {
                const passwordInput = document.getElementById('passwordInput');
                const analyzeBtn = document.getElementById('analyzePassword');
                const strengthBar = document.getElementById('strengthBar');
                const strengthText = document.getElementById('strengthText');
                const strengthScore = document.getElementById('strengthScore');
                
                // Список слабких паролів
                const weakPasswords = [
                    '123456', 'password', '12345678', 'qwerty', '123456789',
                    '12345', '1234', '111111', '1234567', 'dragon',
                    '123123', 'baseball', 'abc123', 'football', 'monkey',
                    'letmein', '696969', 'shadow', 'master', '666666'
                ];
                
                // Аналіз пароля
                function analyzePassword(password) {
                    let score = 0;
                    const results = {
                        length: false,
                        uppercase: false,
                        lowercase: false,
                        numbers: false,
                        symbols: false,
                        common: false
                    };
                    
                    // Довжина (макс 30 балів)
                    const length = password.length;
                    if (length >= 8) score += 10;
                    if (length >= 12) score += 10;
                    if (length >= 16) score += 10;
                    results.length = length >= 8;
                    
                    // Великі літери (20 балів)
                    if (/[A-Z]/.test(password)) {
                        score += 20;
                        results.uppercase = true;
                    }
                    
                    // Малі літери (20 балів)
                    if (/[a-z]/.test(password)) {
                        score += 20;
                        results.lowercase = true;
                    }
                    
                    // Цифри (20 балів)
                    if (/\d/.test(password)) {
                        score += 20;
                        results.numbers = true;
                    }
                    
                    // Спецсимволи (20 балів)
                    if (/[^A-Za-z0-9]/.test(password)) {
                        score += 20;
                        results.symbols = true;
                    }
                    
                    // Не є слабким паролем (10 балів)
                    const isWeak = weakPasswords.includes(password.toLowerCase());
                    if (!isWeak) {
                        score += 10;
                        results.common = true;
                    }
                    
                    // Обмежити до 100 балів
                    score = Math.min(score, 100);
                    
                    return { score, results };
                }
                
                // Оновити відображення результатів
                function updatePasswordResults(score, results) {
                    // Оновити шкалу
                    const percentage = score;
                    strengthBar.style.width = `${percentage}%`;
                    strengthBar.style.background = getStrengthColor(score);
                    
                    // Оновити текст
                    const strengthLevel = getStrengthLevel(score);
                    strengthText.textContent = strengthLevel.text;
                    strengthText.style.color = strengthLevel.color;
                    
                    // Оновити бал
                    strengthScore.textContent = `${score}/100`;
                    
                    // Оновити детальну інформацію
                    updatePasswordDetails(results);
                    
                    // Оновити час підбору
                    updateCrackTime(score, passwordInput.value);
                    
                    // Оновити рекомендації
                    updatePasswordSuggestions(results, score);
                }
                
                // Отримати колір сили пароля
                function getStrengthColor(score) {
                    if (score < 30) return '#ff5555';
                    if (score < 60) return '#ffaa00';
                    if (score < 80) return '#ffff55';
                    return '#55ff55';
                }
                
                // Отримати рівень сили пароля
                function getStrengthLevel(score) {
                    if (score < 30) return { text: 'Дуже слабкий', color: '#ff5555' };
                    if (score < 50) return { text: 'Слабкий', color: '#ffaa00' };
                    if (score < 70) return { text: 'Середній', color: '#ffff55' };
                    if (score < 90) return { text: 'Сильний', color: '#55ff55' };
                    return { text: 'Дуже сильний', color: '#00ff00' };
                }
                
                // Оновити деталі аналізу
                function updatePasswordDetails(results) {
                    const details = {
                        length: passwordInput.value.length,
                        uppercase: (passwordInput.value.match(/[A-Z]/g) || []).length,
                        lowercase: (passwordInput.value.match(/[a-z]/g) || []).length,
                        numbers: (passwordInput.value.match(/\d/g) || []).length,
                        symbols: (passwordInput.value.match(/[^A-Za-z0-9]/g) || []).length,
                        common: !weakPasswords.includes(passwordInput.value.toLowerCase())
                    };
                    
                    // Оновити іконки та текст
                    Object.keys(results).forEach(key => {
                        const element = document.querySelector(`[data-check="${key}"]`);
                        if (element) {
                            const icon = element.querySelector('.check-icon i');
                            const detailsEl = element.querySelector('.check-details');
                            
                            if (results[key]) {
                                icon.className = 'fas fa-check';
                                icon.style.color = '#55ff55';
                            } else {
                                icon.className = 'fas fa-times';
                                icon.style.color = '#ff5555';
                            }
                            
                            // Оновити деталі
                            if (detailsEl) {
                                if (key === 'length') {
                                    detailsEl.textContent = `${details[key]}/8`;
                                } else if (key === 'common') {
                                    detailsEl.textContent = results[key] ? 'Безпечний' : 'Слабкий';
                                } else {
                                    detailsEl.textContent = details[key];
                                }
                            }
                        }
                    });
                }
                
                // Оновити час підбору
                function updateCrackTime(score, password) {
                    const crackTimeEl = document.getElementById('crackTime');
                    const crackMethodEl = document.getElementById('crackMethod');
                    
                    let time, method;
                    
                    if (score < 30) {
                        time = 'Миттєво';
                        method = 'Простий підбір';
                    } else if (score < 50) {
                        time = 'Декілька хвилин';
                        method = 'Словниковий підбір';
                    } else if (score < 70) {
                        time = 'Декілька днів';
                        method = 'Гібридний підбір';
                    } else if (score < 90) {
                        time = 'Роки';
                        method = 'Брутфорс';
                    } else {
                        time = 'Століття';
                        method = 'Квантовий комп\'ютер';
                    }
                    
                    crackTimeEl.textContent = time;
                    crackMethodEl.textContent = `Метод: ${method}`;
                }
                
                // Оновити рекомендації
                function updatePasswordSuggestions(results, score) {
                    const suggestionsEl = document.getElementById('passwordSuggestions');
                    const suggestions = [];
                    
                    if (!results.length) {
                        suggestions.push('Додайте щонайменше 8 символів');
                    }
                    
                    if (!results.uppercase) {
                        suggestions.push('Додайте великі літери (A-Z)');
                    }
                    
                    if (!results.lowercase) {
                        suggestions.push('Додайте малі літери (a-z)');
                    }
                    
                    if (!results.numbers) {
                        suggestions.push('Додайте цифри (0-9)');
                    }
                    
                    if (!results.symbols) {
                        suggestions.push('Додайте спецсимволи (!@#$%^&*)');
                    }
                    
                    if (!results.common) {
                        suggestions.push('Уникайте популярних паролів');
                    }
                    
                    if (score >= 80) {
                        suggestions.push('Відмінний пароль! Використовуйте менеджер паролів для зберігання.');
                    }
                    
                    // Оновити список
                    suggestionsEl.innerHTML = '';
                    suggestions.forEach(suggestion => {
                        const li = document.createElement('li');
                        li.textContent = suggestion;
                        li.style.color = suggestion.includes('Відмінний') ? '#55ff55' : '#ffaa00';
                        suggestionsEl.appendChild(li);
                    });
                }
                
                // Обробник кнопки аналізу
                analyzeBtn.addEventListener('click', function() {
                    const password = passwordInput.value;
                    
                    if (!password) {
                        showNotification('Введіть пароль для аналізу', 'error');
                        return;
                    }
                    
                    const { score, results } = analyzePassword(password);
                    updatePasswordResults(score, results);
                    showNotification('Пароль проаналізовано', 'success');
                });
                
                // Аналіз при введенні
                passwordInput.addEventListener('input', function() {
                    if (this.value.length > 0) {
                        const { score, results } = analyzePassword(this.value);
                        updatePasswordResults(score, results);
                    }
                });
            }
            
            // Очистити аналізатор паролів
            function clearPasswordAnalyzer() {
                document.getElementById('passwordInput').value = '';
                document.getElementById('strengthBar').style.width = '0%';
                document.getElementById('strengthText').textContent = 'Недостатня';
                document.getElementById('strengthScore').textContent = '0/100';
                
                // Скинути деталі
                document.querySelectorAll('.analysis-item').forEach(item => {
                    const icon = item.querySelector('.check-icon i');
                    icon.className = 'fas fa-times';
                    icon.style.color = '#ff5555';
                    
                    const details = item.querySelector('.check-details');
                    if (details) {
                        if (item.dataset.check === 'length') {
                            details.textContent = '0/8';
                        } else if (item.dataset.check === 'common') {
                            details.textContent = 'Перевірка...';
                        } else {
                            details.textContent = '0';
                        }
                    }
                });
            }
            
            // ===== ІНСТРУМЕНТ 2: ХЕШ-ГЕНЕРАТОР =====
            function initHashGenerator() {
                // Код для хеш-генератора...
            }
            
            // ===== ІНСТРУМЕНТ 3: АНАЛІЗАТОР ТРАФІКУ =====
            function initNetworkAnalyzer() {
                // Код для аналізатора трафіку...
            }
            
            // Ініціалізація лабораторії
            initLab();
        }
        // Додати в існуючий JavaScript
function initQuickNav() {
    const quickNav = document.getElementById('quickNav');
    const quickNavItems = document.querySelectorAll('.quick-nav-item');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Функція для плавної прокрутки
    function smoothScroll(targetId) {
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            const headerHeight = document.getElementById('header').offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Оновити активний стан в основній навігації
            updateNavLinks(targetId);
        }
    }
    
    // Оновити активні посилання в навігації
    function updateNavLinks(activeId) {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${activeId}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Обробник кліку по точках швидкої навігації
    quickNavItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('data-target');
            
            // Плавна прокрутка до секції
            smoothScroll(targetId);
            
            // Додати візуальний ефект кліку
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
    });
        
        // Оновлення активних точок при скролі
        function updateQuickNav() {
            let currentSection = '';
            const scrollPosition = window.scrollY + 100;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                const sectionId = section.getAttribute('id');
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    currentSection = sectionId;
                }
            });
            
            // Оновити активні точки швидкої навігації
            quickNavItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('data-target') === currentSection) {
                    item.classList.add('active');
                }
            });
            
            // Оновити активні посилання в основній навігації
            updateNavLinks(currentSection);
        }
        
        // Показати/приховати швидку навігацію при скролі
        let lastScrollTop = 0;
        function toggleQuickNavOnScroll() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > lastScrollTop) {
                // Скрол вниз - приховати
                quickNav.style.opacity = '0.5';
                quickNav.style.transform = 'translateY(-50%) scale(0.9)';
            } else {
                // Скрол вгору - показати
                quickNav.style.opacity = '1';
                quickNav.style.transform = 'translateY(-50%) scale(1)';
            }
            
            // Приховати при дуже низькому скролі
            if (scrollTop < 100) {
                quickNav.style.opacity = '0.7';
            }
            
            lastScrollTop = scrollTop;
        }
        
        // Ініціалізація
        function init() {
            // Початкове оновлення
            updateQuickNav();
            
            // Слухачі подій
            window.addEventListener('scroll', () => {
                updateQuickNav();
                toggleQuickNavOnScroll();
            });
            
            // Обробники для основних навігаційних посилань
            navLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href').substring(1);
                    smoothScroll(targetId);
                    
                    // Закрити мобільне меню, якщо воно відкрите
                    const navList = document.getElementById('navList');
                    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
                    if (navList.classList.contains('active')) {
                        navList.classList.remove('active');
                        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                    }
                });
            });
            
            // Додати ефект глітчу при кліку на точку
            quickNavItems.forEach(item => {
                item.addEventListener('click', function() {
                    // Створити ефект спалаху
                    const flash = document.createElement('div');
                    flash.style.cssText = `
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background: white;
                        border-radius: 50%;
                        opacity: 0.5;
                        animation: flash 0.3s ease-out;
                        z-index: 1;
                    `;
                    this.appendChild(flash);
                    
                    // Видалити ефект після анімації
                    setTimeout(() => {
                        flash.remove();
                    }, 300);
                });
            });
            
            // Додати CSS для анімації спалаху
            const style = document.createElement('style');
            style.textContent = `
                @keyframes flash {
                    0% { transform: scale(0.5); opacity: 0.8; }
                    70% { transform: scale(1.5); opacity: 0.3; }
                    100% { transform: scale(2); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
        
        // Запустити ініціалізацію
        init();
    }