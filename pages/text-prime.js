const primingThemesData = [
            { id: "confidence", name: "Confidence", iconClass: "fas fa-shield-alt", description: "Boost self-assurance and belief in your abilities.", particleAccentColor: "#FFD700", particleSecondaryColor: "#FFA500" },
            { id: "productivity", name: "Productivity", iconClass: "fas fa-rocket", description: "Enhance focus, motivation, and overall efficiency.", particleAccentColor: "#4682B4", particleSecondaryColor: "#5F9EA0" },
            { id: "relationships", name: "Relationships", iconClass: "fas fa-users", description: "Cultivate stronger connections and deeper understanding.", particleAccentColor: "#FFC0CB", particleSecondaryColor: "#FFB6C1" },
            { id: "business", name: "Business Success", iconClass: "fas fa-briefcase", description: "Drive ambition, strategy, and achievement in ventures.", particleAccentColor: "#2E8B57", particleSecondaryColor: "#3CB371" },
            { id: "creativity", name: "Creativity", iconClass: "fas fa-lightbulb", description: "Unlock innovative thinking and spark inspiration.", particleAccentColor: "#9370DB", particleSecondaryColor: "#BA55D3" },
            { id: "wellbeing", name: "Well-being", iconClass: "fas fa-spa", description: "Promote physical vitality and mental tranquility.", particleAccentColor: "#87CEEB", particleSecondaryColor: "#ADD8E6" },
            { id: "growth", name: "Growth Mindset", iconClass: "fas fa-seedling", description: "Embrace challenges and foster continuous learning.", particleAccentColor: "#32CD32", particleSecondaryColor: "#90EE90" },
            { id: "financial", name: "Financial Acuity", iconClass: "fas fa-piggy-bank", description: "Sharpen financial wisdom and attract abundance.", particleAccentColor: "#006400", particleSecondaryColor: "#556B2F" },
            { id: "mindfulness", name: "Mindfulness", iconClass: "fas fa-brain", description: "Foster presence, inner calm, and heightened awareness.", particleAccentColor: "#AFEEEE", particleSecondaryColor: "#E0FFFF" },
            { id: "resilience", name: "Resilience", iconClass: "fas fa-anchor", description: "Strengthen your ability to overcome adversity with grace.", particleAccentColor: "#A9A9A9", particleSecondaryColor: "#D3D3D3" }
        ];

        // IMPORTANT: Review and update these word lists with your desired 30 words per theme.
        const themeWords = {
            confidence: ["Strong", "Able", "Certain", "Valiant", "Assured", "Capable", "Secure", "Fearless", "Positive", "Empowered", "Bold", "Resolute", "Unwavering", "Self-reliant", "Trusting", "Competent", "Steadfast", "Courageous", "Optimistic", "Victorious", "Dynamic", "Tenacious", "Driven", "Poised", "Composed", "Independent", "Assertive", "Unbeatable", "Triumphant", "Masterful"],
            productivity: ["Focus", "Achieve", "Efficient", "Execute", "Progress", "Driven", "Organized", "Effective", "Active", "Complete", "Streamline", "Maximize", "Output", "Diligent", "Methodical", "Swift", "Engaged", "Results", "Prioritize", "Attain", "Concerted", "Industrious", "Purposeful", "Resourceful", "Dedicate", "Operate", "Sharp", "Systematic", "Perform", "Yield"],
            relationships: ["Connect", "Empathy", "Listen", "Support", "Harmony", "Cherish", "Understand", "Kindness", "Trust", "Bond", "Relate", "Affection", "Compassion", "Unity", "Together", "Share", "Devotion", "Respect", "Nurture", "Intimacy", "Friendship", "Loyalty", "Partnership", "Amity", "Concord", "Fellowship", "Kinship", "Communion", "Reciprocity", "Attachment"],
            business: ["Growth", "Profit", "Lead", "Innovate", "Strategy", "Succeed", "Market", "Value", "Network", "Achieve", "Venture", "Scale", "Capital", "Develop", "Commerce", "Enterprise", "Deal", "Optimize", "Revenue", "Client", "Execute", "Brand", "Invest", "Plan", "Negotiate", "Expand", "Compete", "Manage", "Vision", "Result"],
            creativity: ["Imagine", "Inspire", "Create", "Invent", "Unique", "Vision", "Original", "Express", "Design", "Flow", "Innovate", "Conceive", "Formulate", "Generate", "Artistic", "Ingenious", "Resourceful", "Fantasize", "Brainstorm", "Discover", "Picture", "Build", "Realize", "Fashion", "Craft", "Pioneer", "Muse", "Develop", "Unconventional", "Whimsical"],
            wellbeing: ["Healthy", "Calm", "Vitality", "Peace", "Balance", "Nourish", "Refresh", "Serene", "Energized", "Thrive", "Rejuvenate", "Restore", "Wholesome", "Sound", "Flourish", "Content", "Tranquil", "Relax", "Fitness", "Harmony", "Vigor", "Spirit", "Mindful", "Resilient", "Joyful", "Radiant", "Pure", "Sustained", "Rested", "Vibrant"],
            growth: ["Learn", "Develop", "Evolve", "Improve", "Expand", "Challenge", "Adapt", "Persist", "Discover", "Advance", "Cultivate", "Mature", "Progress", "Ascend", "Elevate", "Enhance", "Educate", "Master", "Overcome", "Strive", "Transform", "Unfold", "Venture", "Seek", "Refine", "Flourish", "Attain", "Build", "Stretch", "Emerge"],
            financial: ["Wealth", "Abundance", "Invest", "Prosper", "Secure", "Value", "Wisdom", "Earn", "Save", "Grow", "Capital", "Assets", "Income", "Dividend", "Budget", "Fortune", "Lucrative", "Affluent", "Gain", "Profit", "Manage", "Economy", "Resource", "Fund", "Credit", "Equity", "Return", "Accumulate", "Finance", "Commerce"],
            mindfulness: ["Present", "Aware", "Breathe", "Focus", "Observe", "Still", "Centered", "Peaceful", "Grounded", "Clarity", "Meditate", "Reflect", "Introspect", "Calmness", "Serenity", "Acceptance", "Being", "Now", "Attentive", "Conscious", "Quiet", "Thoughtful", "Unwind", "Poise", "Equanimity", "Insight", "Perception", "Self-aware", "Composure", "Contemplate"],
            resilience: ["Overcome", "Persist", "Adapt", "Stronger", "Endure", "Recover", "Bounce", "Steady", "Courage", "Grit", "Fortitude", "Tenacity", "Toughness", "Strength", "Rebound", "Persevere", "Withstand", "Unbreakable", "Steadfast", "Robust", "Hardy", "Determined", "Unyielding", "Coping", "Flexible", "Survive", "Prevail", "Bounce-back", "Enduring", "Unshaken"]
        };

        let currentSelectedTheme = null; 
        let currentWordsForSequence = []; // To store words for replay

        function getRandomWords(wordArray, count) {
            const shuffled = [...wordArray].sort(() => 0.5 - Math.random()); // Create a shuffled copy
            return shuffled.slice(0, count);
        }

        function populatePrimingThemes() {
            const grid = document.getElementById('primingThemesGrid');
            if(!grid) return;
            grid.innerHTML = ''; 

            primingThemesData.forEach(theme => {
                const card = document.createElement('div');
                card.classList.add('priming-theme-card');
                card.dataset.themeId = theme.id;
                
                const iconElement = document.createElement('i');
                iconElement.className = `theme-icon ${theme.iconClass}`;
                iconElement.setAttribute('aria-hidden', 'true');

                const titleElement = document.createElement('h2');
                titleElement.textContent = theme.name;

                const descriptionElement = document.createElement('p');
                descriptionElement.textContent = theme.description;

                const beginPrimeButton = document.createElement('button');
                beginPrimeButton.classList.add('begin-prime-btn');
                beginPrimeButton.textContent = 'Begin prime';
                beginPrimeButton.addEventListener('click', (event) => {
                    event.stopPropagation(); 
                    startWordSequence(theme, true); // true to indicate fresh selection
                });

                card.appendChild(iconElement);
                card.appendChild(titleElement);
                card.appendChild(descriptionElement);
                card.appendChild(beginPrimeButton);
                
                card.addEventListener('click', () => handlePrimingThemeSelect(theme, card));
                grid.appendChild(card);
            });
        }
        
        let selectedPrimingThemeCardElement = null;
        function handlePrimingThemeSelect(themeObject, cardElement) {
            console.log("Priming theme selected:", themeObject.id);
            currentSelectedTheme = themeObject; 
            
            if (selectedPrimingThemeCardElement) {
                selectedPrimingThemeCardElement.classList.remove('selected');
            }
            cardElement.classList.add('selected');
            selectedPrimingThemeCardElement = cardElement;
            
            localStorage.setItem('selectedPrimingThemeId', themeObject.id);

            if (window.updateThreeJSBackground) {
                window.updateThreeJSBackground(themeObject.particleAccentColor, themeObject.particleSecondaryColor);
            }
        }

        // --- Three.js Background Code ---
        let scene, camera, renderer, particles;
        const particleCount = 600;
        const particleMaterial = new THREE.PointsMaterial({
            size: 0.12, vertexColors: true, sizeAttenuation: true
        });
        const defaultParticleColor1 = new THREE.Color("#CCCCCC");
        const defaultParticleColor2 = new THREE.Color("#B0B0B0");

        function initThreeJS() {
            const bgContainer = document.getElementById('three-bg');
            if (!bgContainer) return; 
            scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            try {
                renderer = new THREE.WebGLRenderer({ alpha: true });
            } catch (e) {
                console.error("WebGL not supported or error initializing renderer:", e);
                bgContainer.innerHTML = "<p style='color: white; text-align: center;'>WebGL is not supported. Animated background cannot be shown.</p>";
                return;
            }
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setClearColor(0x000000, 0);
            bgContainer.appendChild(renderer.domElement);

            const particleGeometry = new THREE.BufferGeometry();
            const positions = [];
            const colorsAttribute = [];

            for (let i = 0; i < particleCount; i++) {
                positions.push(
                    THREE.MathUtils.randFloatSpread(15),
                    THREE.MathUtils.randFloatSpread(15),
                    THREE.MathUtils.randFloatSpread(15)
                );
                const chosenColor = (i % 2 === 0) ? defaultParticleColor1 : defaultParticleColor2;
                colorsAttribute.push(chosenColor.r, chosenColor.g, chosenColor.b);
            }

            particleGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
            particleGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colorsAttribute, 3));
            particles = new THREE.Points(particleGeometry, particleMaterial);
            scene.add(particles);
            camera.position.z = 7;
            renderThreeJSScene();
        }
        
        function renderThreeJSScene(){
            if(renderer && scene && camera) {
                renderer.render(scene, camera);
            }
        }

        window.updateThreeJSBackground = (accentColorHex, secondaryColorHex) => {
            if (!particles || !particles.geometry) return; 
            
            const baseColor1 = new THREE.Color(accentColorHex || defaultParticleColor1.getHexString());
            const baseColor2 = new THREE.Color(secondaryColorHex || defaultParticleColor2.getHexString());
            
            const geometry = particles.geometry;
            const colors = geometry.attributes.color.array;

            for (let i = 0; i < particleCount; i++) {
                const chosenColor = (i % 2 === 0) ? baseColor1 : baseColor2;
                const particleColor = chosenColor.clone().offsetHSL(
                     (Math.random() - 0.5) * 0.05,
                     (Math.random() - 0.5) * 0.1,
                     (Math.random() - 0.5) * 0.1
                );
                
                colors[i * 3] = particleColor.r;
                colors[i * 3 + 1] = particleColor.g;
                colors[i * 3 + 2] = particleColor.b;
            }
            geometry.attributes.color.needsUpdate = true;
            renderThreeJSScene();
        };

        window.addEventListener('resize', () => {
            if (camera && renderer) {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
                renderThreeJSScene();
            }
        });
        // --- End Three.js Background Code ---

        // --- Word Sequence and UI Logic ---
        const mainContainer = document.querySelector('.container');
        const threeBg = document.getElementById('three-bg');
        const wordSequenceContainer = document.getElementById('word-sequence-container');
        const wordDisplay = document.getElementById('word-display');
        const postSequenceOptionsBox = document.getElementById('post-sequence-options');

        async function startWordSequence(theme, isFreshSelection = false) {
            if (!theme || !themeWords[theme.id]) {
                console.error("Theme or theme words not found for:", theme);
                return;
            }
            currentSelectedTheme = theme; 

            if (isFreshSelection) {
                const allWordsForTheme = themeWords[theme.id];
                currentWordsForSequence = getRandomWords(allWordsForTheme, 10); 
            }
            // If not a fresh selection (i.e., a replay), currentWordsForSequence is already set.


            document.body.classList.add('priming-active');
            if (mainContainer) {
                anime({
                    targets: mainContainer,
                    opacity: 0,
                    translateY: 20,
                    duration: 300,
                    easing: 'easeInExpo',
                    complete: () => mainContainer.classList.add('hidden')
                });
            }
             if (threeBg) {
                anime({
                    targets: threeBg,
                    opacity: 0,
                    duration: 300,
                    easing: 'easeInExpo',
                    complete: () => threeBg.classList.add('hidden')
                });
            }

            wordSequenceContainer.classList.remove('hidden');
            anime({
                targets: wordSequenceContainer,
                opacity: [0, 1],
                duration: 300,
                easing: 'easeOutExpo'
            });
            
            const wordsToDisplay = currentWordsForSequence;
            const wordDuration = 200; 

            for (let i = 0; i < wordsToDisplay.length; i++) {
                wordDisplay.textContent = wordsToDisplay[i];
                anime.remove(wordDisplay); 
                await anime({
                    targets: wordDisplay,
                    opacity: [0, 1],
                    scale: [0.95, 1],
                    duration: wordDuration / 2,
                    easing: 'easeOutSine',
                    direction: 'alternate', 
                }).finished;
                
                if (i < wordsToDisplay.length -1) { 
                     await new Promise(resolve => setTimeout(resolve, wordDuration / 2)); 
                } else { 
                    await new Promise(resolve => setTimeout(resolve, wordDuration * 1.5)); // Hold last word slightly longer
                     await anime({
                        targets: wordDisplay,
                        opacity: 0,
                        scale: 0.95,
                        duration: wordDuration / 2,
                        easing: 'easeInSine',
                    }).finished;
                }
            }
            
            anime({
                targets: wordSequenceContainer,
                opacity: 0,
                duration: 100, // Faster hide for word container
                easing: 'easeInExpo',
                complete: () => {
                    wordSequenceContainer.classList.add('hidden');
                    showPostSequenceOptions(); // Show options sooner
                }
            });
        }

        function showPostSequenceOptions() {
            postSequenceOptionsBox.classList.remove('hidden');
            anime({
                targets: postSequenceOptionsBox,
                opacity: [0, 1],
                translateY: ['20px', '0px'],
                duration: 300, // Can adjust this speed
                easing: 'easeOutExpo',
                begin: () => postSequenceOptionsBox.style.pointerEvents = 'auto'
            });
        }

        document.getElementById('replaySequenceBtn').addEventListener('click', () => {
            if (currentSelectedTheme && currentWordsForSequence.length > 0) {
                anime({
                    targets: postSequenceOptionsBox,
                    opacity: 0,
                    translateY: '20px',
                    duration: 300,
                    easing: 'easeInExpo',
                    complete: () => {
                        postSequenceOptionsBox.classList.add('hidden');
                        postSequenceOptionsBox.style.pointerEvents = 'none';
                        startWordSequence(currentSelectedTheme, false); // false for replay, uses existing words
                    }
                });
            }
        });

        document.getElementById('chooseAnotherThemeBtn').addEventListener('click', () => {
            anime({
                targets: postSequenceOptionsBox,
                opacity: 0,
                translateY: '20px',
                duration: 300,
                easing: 'easeInExpo',
                complete: () => {
                    postSequenceOptionsBox.classList.add('hidden');
                    postSequenceOptionsBox.style.pointerEvents = 'none';
                    
                    document.body.classList.remove('priming-active');
                    if(mainContainer) {
                        mainContainer.classList.remove('hidden');
                        anime({
                            targets: mainContainer,
                            opacity: [0, 1],
                            translateY: [20, 0],
                            duration: 500,
                            easing: 'easeOutExpo'
                        });
                    }
                    if(threeBg) {
                        threeBg.classList.remove('hidden');
                         anime({
                            targets: threeBg,
                            opacity: [0, 1],
                            duration: 500,
                            easing: 'easeOutExpo'
                        });
                    }
                    const savedThemeId = localStorage.getItem('selectedPrimingThemeId');
                    if (savedThemeId && window.updateThreeJSBackground) {
                        const theme = primingThemesData.find(t => t.id === savedThemeId);
                        if (theme) {
                            window.updateThreeJSBackground(theme.particleAccentColor, theme.particleSecondaryColor);
                        } else {
                             window.updateThreeJSBackground(null, null); 
                        }
                    } else if (window.updateThreeJSBackground) {
                        window.updateThreeJSBackground(null, null); 
                    }
                }
            });
        });

        document.getElementById('changePrimingMethodBtn').addEventListener('click', () => {
            window.location.href = './prime.html'; 
        });

        document.addEventListener('DOMContentLoaded', () => {
            initThreeJS(); 
            populatePrimingThemes(); 

            const savedPrimingThemeId = localStorage.getItem('selectedPrimingThemeId');
            if (savedPrimingThemeId) {
                const themeToSelect = primingThemesData.find(t => t.id === savedPrimingThemeId);
                const cardToSelect = document.querySelector(`.priming-theme-card[data-theme-id="${savedPrimingThemeId}"]`);
                if (themeToSelect && cardToSelect) {
                    handlePrimingThemeSelect(themeToSelect, cardToSelect); 
                } else {
                    if(window.updateThreeJSBackground) window.updateThreeJSBackground(null, null); 
                }
            } else {
                 if(window.updateThreeJSBackground) window.updateThreeJSBackground(null, null); 
            }

            if (mainContainer) {
                anime({
                    targets: mainContainer, 
                    opacity: [0, 1],
                    translateY: [30, 0],
                    duration: 800,
                    easing: 'easeOutExpo'
                });
            }
            
            anime({
                targets: '.priming-theme-card',
                opacity: [0, 1],
                translateY: [20, 0],
                delay: anime.stagger(100, {start: 200, from: 'first'}),
                duration: 600,
                easing: 'easeOutExpo'
            });
        });