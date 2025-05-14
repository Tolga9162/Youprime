
        // Three.js Scene for Hero Background
        let scene, camera, renderer, particles;
        const particleCount = 600; // Increased slightly
        const particleColors = [ 
            0xF8F9FA, 0xE9ECEF, 0xDEE2E6, 0xCED4DA, 0xADB5BD // Using lighter shades from palette
        ];

        function initThreeJS() {
            const container = document.getElementById('threejs-canvas-container');
            if (!container) return;

            scene = new THREE.Scene();
            
            camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);
            camera.position.z = 25; // Move camera slightly closer

            renderer = new THREE.WebGLRenderer({ alpha: true }); 
            renderer.setSize(container.offsetWidth, container.offsetHeight);
            renderer.setClearColor(0x000000, 0); 
            container.appendChild(renderer.domElement);

            const geometry = new THREE.BufferGeometry();
            const positions = [];
            const colors = [];
            const sizes = []; // For individual particle sizes

            for (let i = 0; i < particleCount; i++) {
                positions.push((Math.random() - 0.5) * 120); // Wider spread
                positions.push((Math.random() - 0.5) * 120); 
                positions.push((Math.random() - 0.5) * 120); 

                const color = new THREE.Color(particleColors[Math.floor(Math.random() * particleColors.length)]);
                colors.push(color.r, color.g, color.b);
                sizes.push(Math.random() * 0.4 + 0.1); // Random sizes between 0.1 and 0.5
            }

            geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
            geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
            // geometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1)); // If using shaders for size

            const material = new THREE.PointsMaterial({ 
                size: 0.3, // Base size, can be overridden if using shader with 'size' attribute
                vertexColors: true,
                blending: THREE.AdditiveBlending, 
                transparent: true,
                opacity: 0.8, // Slightly more opaque
                sizeAttenuation: true // Particles smaller further away
            });

            particles = new THREE.Points(geometry, material);
            scene.add(particles);

            window.addEventListener('resize', onWindowResize, false);
            animateThreeJS();
        }

        function onWindowResize() {
            const container = document.getElementById('threejs-canvas-container');
            if (!container || !camera || !renderer) return;
            camera.aspect = container.offsetWidth / container.offsetHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.offsetWidth, container.offsetHeight);
        }

        function animateThreeJS() {
            if (!particles || !renderer || !scene || !camera) return; // Ensure all are initialized
            requestAnimationFrame(animateThreeJS);

            particles.rotation.x += 0.0001;
            particles.rotation.y += 0.0003;
            
            const time = Date.now() * 0.00003;
            const positions = particles.geometry.attributes.position.array;
            for (let i = 0; i < particleCount; i++) {
                // Subtle individual movement
                // positions[i * 3 + 1] += Math.sin(time + positions[i*3]) * 0.0005; 
            }
            // particles.geometry.attributes.position.needsUpdate = true;


            renderer.render(scene, camera);
        }
        
        // Anime.js Animations
        document.addEventListener('DOMContentLoaded', () => {
            if (typeof THREE !== 'undefined') {
                initThreeJS();
            } else {
                console.error("Three.js not loaded");
            }

            // Hero content animation
            anime.timeline({ easing: 'easeOutExpo' })
                .add({
                    targets: '.hero h1.anim-slide-up',
                    opacity: [0, 1],
                    translateY: [50, 0],
                    duration: 1000,
                })
                .add({
                    targets: '.hero p.anim-slide-up',
                    opacity: [0, 1],
                    translateY: [40, 0],
                    duration: 800,
                }, '-=600') // Starts 600ms before the previous animation ends
                .add({
                    targets: '.hero .btn.anim-slide-up',
                    opacity: [0, 1],
                    translateY: [30, 0],
                    duration: 700,
                }, '-=500');

            // General fade-in for section titles and subtitles
            const animatedTextElements = document.querySelectorAll('.section-title.anim-fade-in, .section-subtitle.anim-fade-in');
            const textObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && entry.target.style.opacity !== "1") {
                        anime({
                            targets: entry.target,
                            opacity: [0, 1],
                            translateY: [20, 0],
                            duration: 800,
                            delay: parseFloat(entry.target.style.animationDelay || 0) * 1000,
                            easing: 'easeOutCubic'
                        });
                        // textObserver.unobserve(entry.target); // Optional
                    }
                });
            }, { threshold: 0.2 });
            animatedTextElements.forEach(el => { el.style.opacity = "0"; textObserver.observe(el); });


            // Intersection Observer for scroll-triggered card animations
            const animatedCards = document.querySelectorAll('.feature-item.anim-slide-up, .how-it-works-item.anim-slide-up');
            const cardObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && entry.target.style.opacity !== "1") {
                         anime({
                            targets: entry.target,
                            opacity: [0, 1],
                            translateY: [50, 0],
                            duration: 700,
                            delay: parseFloat(entry.target.style.animationDelay || 0) * 1000 + (Array.from(animatedCards).indexOf(entry.target) % 2 === 0 ? 0 : 150), // Stagger effect for cards
                            easing: 'easeOutSine'
                        });
                        // cardObserver.unobserve(entry.target); // Optional
                    }
                });
            }, { threshold: 0.1 }); 

            animatedCards.forEach(el => {
                el.style.opacity = "0"; 
                cardObserver.observe(el);
            });

            // CTA section animation
            const ctaElements = document.querySelectorAll('.cta-section .anim-fade-in, .cta-section .anim-slide-up');
             const ctaObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && entry.target.style.opacity !== "1") {
                         anime({
                            targets: entry.target,
                            opacity: [0, 1],
                            translateY: entry.target.classList.contains('anim-slide-up') ? [30,0] : [10,0],
                            duration: 800,
                            delay: parseFloat(entry.target.style.animationDelay || 0) * 1000,
                            easing: 'easeOutCubic'
                        });
                        // ctaObserver.unobserve(entry.target); // Optional
                    }
                });
            }, { threshold: 0.3 });
            ctaElements.forEach(el => { el.style.opacity = "0"; ctaObserver.observe(el); });


            // Smooth scroll for nav links
            document.querySelectorAll('nav a[href^="#"], .hero a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href');
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        let offset = document.querySelector('header').offsetHeight + 10; // Dynamic offset for fixed header
                        
                        const elementPosition = targetElement.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - offset;

                        window.scrollTo({
                            top: offsetPosition,
                            behavior: "smooth"
                        });
                    }
                });
            });
        });

    