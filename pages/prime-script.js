
        // Three.js Background Animation with Letters
        let scene, camera, renderer, letterSprites = [];
        // Removed numbers, kept YOUPRIME repeated and all uppercase letters
        const letterChars = "YOUPRIMEYOUPRIMEYOUPRIMEABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
        const letterCount = 180;

        const letterColorPalette = [
            getComputedStyle(document.documentElement).getPropertyValue('--letter-color-1').trim(),
            getComputedStyle(document.documentElement).getPropertyValue('--letter-color-2').trim(),
            getComputedStyle(document.documentElement).getPropertyValue('--letter-color-3').trim(),
            getComputedStyle(document.documentElement).getPropertyValue('--letter-color-4').trim()
        ];

        function createLetterTexture(char, color, font, canvasSize = 64) {
            const canvas = document.createElement('canvas');
            canvas.width = canvasSize;
            canvas.height = canvasSize;
            const context = canvas.getContext('2d');
            
            context.font = font;
            context.fillStyle = color;
            context.textAlign = 'center';
            context.textBaseline = 'middle';
            context.fillText(char, canvasSize / 2, canvasSize / 2 + 2);
            
            return new THREE.CanvasTexture(canvas);
        }

        function initThreeJS() {
            scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            camera.position.z = 60;

            renderer = new THREE.WebGLRenderer({
                canvas: document.getElementById("threejs-bg-canvas"),
                antialias: true,
                alpha: true
            });
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setClearColor(0x000000, 0); 

            const letterFont = 'bold 48px Arial';

            for (let i = 0; i < letterCount; i++) {
                const char = letterChars[Math.floor(Math.random() * letterChars.length)];
                const chosenLetterColor = letterColorPalette[Math.floor(Math.random() * letterColorPalette.length)];
                const texture = createLetterTexture(char, chosenLetterColor, letterFont);
                
                const material = new THREE.SpriteMaterial({
                    map: texture,
                    transparent: true,
                    opacity: Math.random() * 0.6 + 0.3,
                    blending: THREE.NormalBlending,
                });
                
                const sprite = new THREE.Sprite(material);
                
                sprite.position.set(
                    (Math.random() - 0.5) * 250,
                    (Math.random() - 0.5) * 250,
                    (Math.random() - 0.5) * 150
                );
                
                const scale = Math.random() * 3.5 + 2.5;
                sprite.scale.set(scale, scale, 1);
                
                sprite.userData = { 
                    initialZ: sprite.position.z,
                    velocity: Math.random() * 0.04 + 0.015,
                    rotationSpeed: (Math.random() - 0.5) * 0.002
                };

                letterSprites.push(sprite);
                scene.add(sprite);
            }

            window.addEventListener("resize", onWindowResize, false);
            animateThreeJS();
        }

        function onWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }

        function animateThreeJS() {
            letterSprites.forEach(sprite => {
                sprite.position.z += sprite.userData.velocity;
                sprite.material.rotation += sprite.userData.rotationSpeed;

                if (sprite.position.z > camera.position.z) {
                    sprite.position.z = sprite.userData.initialZ - 70; 
                    sprite.position.x = (Math.random() - 0.5) * 250;
                    sprite.position.y = (Math.random() - 0.5) * 250;
                }
            });
            
            scene.rotation.y += 0.00008;
            scene.rotation.x += 0.00004;

            renderer.render(scene, camera);
            requestAnimationFrame(animateThreeJS);
        }

        document.addEventListener('DOMContentLoaded', () => {
            if (typeof THREE !== 'undefined') {
                initThreeJS();
            } else {
                console.error("Three.js not loaded");
            }

            anime({
                targets: '.logo-header',
                opacity: [0, 1],
                translateY: [-20, 0],
                duration: 800,
                easing: 'easeOutExpo',
                delay: 200
            });

            anime({
                targets: '.anim-scale-up',
                opacity: [0, 1],
                scale: [0.85, 1],
                duration: 900,
                delay: (el) => parseFloat(el.style.animationDelay || 0) * 1000,
                easing: 'easeOutElastic(1, .8)'
            });
            
            anime({
                targets: '.anim-fade-in-up',
                opacity: [0, 1],
                translateY: [30, 0],
                duration: 700,
                delay: anime.stagger(150, {start: (el) => parseFloat(el.style.animationDelay || 0) * 1000 }),
                easing: 'easeOutCubic'
            });

            document.querySelectorAll('.method-card').forEach(card => {
                card.addEventListener('click', function(e) {
                    console.log('User selected: ' + this.querySelector('h3').textContent);
                    anime({
                        targets: this,
                        scale: [1.03, 0.95, 1],
                        duration: 500,
                        easing: 'easeInOutSine'
                    });
                });
            });
        });
    