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

// IMPORTANT: Replace these placeholder paths with your actual image paths.
// You should have around 10-30 images per theme.
const themeImages = {
    confidence: ["./img/confidence1.jpg","./img/confidence2.jpg", "./img/confidence3.jpg", "./img/confidence4.jpg","./img/confidence5.jpg", "./img/confidence6.jpg", "./img/confidence7.jpg", "./img/confidence8.jpg", "./img/confidence9.jpg", "./img/confidence10.jpg" ],
    productivity: ["./img/productivity1.jpg", "./img/productivity2.jpg", "./img/productivity3.jpg", "./img/productivity4.jpg", "./img/productivity5.jpg", "./img/productivity6.jpg", "./img/productivity7.jpg", "./img/productivity8.jpg", "./img/productivity9.jpg", "./img/productivity10.jpg"],
    relationships: ["./img/relationships1.jpg", "./img/relationships2.jpg", "./img/relationships3.jpg", "./img/relationships4.jpg", "./img/relationships5.jpg", "./img/relationships6.jpg", "./img/relationships7.jpg", "./img/relationships8.jpg", "./img/relationships9.jpg", "./img/relationships10.jpg"],
    business: ["./img/business1.jpg", "./img/business2.jpg","./img/business3.jpg","./img/business4.jpg","./img/business5.jpg","./img/business6.jpg","./img/business7.jpg","./img/business8.jpg","./img/business9.jpg","./img/business10.jpg"],
    creativity: ["./img/creativity1.jpg","./img/creativity2.jpg","./img/creativity3.jpg","./img/creativity4.jpg","./img/creativity5.jpg","./img/creativity6.jpg","./img/creativity7.jpg","./img/creativity8.jpg","./img/creativity9.jpg","./img/creativity10.jpg" ],
    wellbeing: ["./img/wellbeing1.jpg","./img/wellbeing2.jpg","./img/wellbeing3.jpg","./img/wellbeing4.jpg","./img/wellbeing5.jpg","./img/wellbeing6.jpg","./img/wellbeing7.jpg","./img/wellbeing8.jpg","./img/wellbeing9.jpg","./img/wellbeing10.jpg"],
    growth: ["./img/growth1.jpg","./img/growth2.jpg","./img/growth3.jpg","./img/growth4.jpg","./img/growth5.jpg","./img/growth6.jpg","./img/growth7.jpg","./img/growth8.jpg","./img/growth9.jpg","./img/growth10.jpg"],
    financial: ["./img/financial1.jpg","./img/financial2.jpg","./img/financial3.jpg","./img/financial4.jpg","./img/financial5.jpg","./img/financial6.jpg","./img/financial7.jpg","./img/financial8.jpg","./img/financial9.jpg","./img/financial10.jpg"],
    mindfulness: ["./img/mindfulness1.jpg","./img/mindfulness2.jpg","./img/mindfulness3.jpg","./img/mindfulness4.jpg","./img/mindfulness5.jpg","./img/mindfulness6.jpg","./img/mindfulness7.jpg","./img/mindfulness8.jpg","./img/mindfulness9.jpg","./img/mindfulness10.jpg"],
    resilience: ["./img/resilience1.jpg","./img/resilience2.jpg","./img/resilience3.jpg","./img/resilience4.jpg","./img/resilience5.jpg","./img/resilience6.jpg","./img/resilience7.jpg","./img/resilience8.jpg","./img/resilience9.jpg","./img/resilience10.jpg"]
};

let currentSelectedTheme = null;
let currentImagesForSequence = []; // Store images for replay

function getRandomItems(itemArray, count) {
    const shuffled = [...itemArray].sort(() => 0.5 - Math.random());
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
            startImageSequence(theme, true); // true for fresh selection
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

// --- Three.js Background Code (remains the same as your original) ---
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

// --- Image Sequence and UI Logic ---
const mainContainer = document.querySelector('.container');
const threeBg = document.getElementById('three-bg');
const imageSequenceContainer = document.getElementById('word-sequence-container'); // Re-using the same container
const imageDisplay = document.getElementById('word-display'); // Re-using the same display element
const postSequenceOptionsBox = document.getElementById('post-sequence-options');

async function startImageSequence(theme, isFreshSelection = false) {
    if (!theme || !themeImages[theme.id]) {
        console.error("Theme or theme images not found for:", theme);
        // Fallback or error message
        alert("Sorry, images for this theme are not available.");
        return;
    }
    currentSelectedTheme = theme;

    if (isFreshSelection) {
        const allImagesForTheme = themeImages[theme.id];
        if (!allImagesForTheme || allImagesForTheme.length === 0) {
            alert("No images found for this theme. Please add images.");
            return;
        }
        currentImagesForSequence = getRandomItems(allImagesForTheme, 10); // Display 10 images
    }
    // If not a fresh selection (i.e., a replay), currentImagesForSequence is already set.

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

    imageSequenceContainer.classList.remove('hidden');
    anime({
        targets: imageSequenceContainer,
        opacity: [0, 1],
        duration: 300,
        easing: 'easeOutExpo'
    });

    const imagesToDisplay = currentImagesForSequence;
    const imageDuration = 600; // Duration each image is shown (in ms)
    const animationSpeed = 400; // Speed of fade in/out animation

    for (let i = 0; i < imagesToDisplay.length; i++) {
        imageDisplay.innerHTML = ''; // Clear previous image
        const imgElement = document.createElement('img');
        imgElement.src = imagesToDisplay[i];
        // Style the image to fit and be centered
        imgElement.style.maxWidth = '90%';
        imgElement.style.maxHeight = '80vh'; // Ensure it fits vertically
        imgElement.style.objectFit = 'contain'; // Preserve aspect ratio, fit within bounds
        imgElement.style.display = 'block'; // Needed for auto margins if used
        imgElement.style.margin = 'auto';   // Center block element

        imageDisplay.appendChild(imgElement);
        
        // Error handling for broken image links
        imgElement.onerror = () => {
            console.error("Error loading image:", imagesToDisplay[i]);
            imageDisplay.innerHTML = '<p style="color: #ccc; font-size: 18px;">Error loading image</p>';
        };


        anime.remove(imageDisplay); // Remove previous animations on the container
        await anime({
            targets: imageDisplay, // Animate the container
            opacity: [0, 1],
            scale: [0.98, 1], // Subtle scale effect
            duration: animationSpeed,
            easing: 'easeOutSine',
        }).finished;

        // Hold the image
        await new Promise(resolve => setTimeout(resolve, imageDuration - (animationSpeed * 2) )); // Subtract animation time

        // Fade out
        await anime({
            targets: imageDisplay,
            opacity: 0,
            scale: 0.98,
            duration: animationSpeed,
            easing: 'easeInSine',
        }).finished;

        if (i < imagesToDisplay.length - 1) {
            // Brief pause before next image, if not the last one
            await new Promise(resolve => setTimeout(resolve, 100));
        }
    }

    // Hide sequence container and show options
    anime({
        targets: imageSequenceContainer,
        opacity: 0,
        duration: 100,
        easing: 'easeInExpo',
        complete: () => {
            imageSequenceContainer.classList.add('hidden');
            imageDisplay.innerHTML = ''; // Clear last image
            showPostSequenceOptions();
        }
    });
}

function showPostSequenceOptions() {
    postSequenceOptionsBox.classList.remove('hidden');
    anime({
        targets: postSequenceOptionsBox,
        opacity: [0, 1],
        translateY: ['20px', '0px'],
        duration: 300,
        easing: 'easeOutExpo',
        begin: () => postSequenceOptionsBox.style.pointerEvents = 'auto'
    });
}

document.getElementById('replaySequenceBtn').addEventListener('click', () => {
    if (currentSelectedTheme && currentImagesForSequence.length > 0) {
        anime({
            targets: postSequenceOptionsBox,
            opacity: 0,
            translateY: '20px',
            duration: 300,
            easing: 'easeInExpo',
            complete: () => {
                postSequenceOptionsBox.classList.add('hidden');
                postSequenceOptionsBox.style.pointerEvents = 'none';
                startImageSequence(currentSelectedTheme, false); // false for replay
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