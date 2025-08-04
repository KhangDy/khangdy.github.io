let isDarkMode = false;
let cloudInterval;
let stormInterval;
let rainInterval;
let starInterval;
let shootingStarInterval;
let snowInterval;

function toggleTheme() {
    isDarkMode = !isDarkMode;
    const html = document.documentElement;
    const themeIcon = document.getElementById('themeIcon');
    
    if (isDarkMode) {
        html.classList.add('dark');
        themeIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>';
        startDarkModeEffects();
        stopLightModeEffects();
    } else {
        html.classList.remove('dark');
        themeIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>';
        startLightModeEffects();
        stopDarkModeEffects();
    }
}

function createCloud() {
    const heroSection = document.getElementById('home');
    if (!heroSection) return;
    
    const cloud = document.createElement('div');
    const isStorm = Math.random() < 0.2; // 20% chance of storm cloud
    const cloudType = Math.random() < 0.5 ? 'type-1' : 'type-2';
    
    cloud.className = isStorm ? `cloud storm-cloud ${cloudType}` : `cloud ${cloudType}`;
    cloud.style.top = Math.random() * 40 + 20 + '%';
    cloud.style.animationDuration = Math.random() * 8 + 12 + 's';
    
    heroSection.appendChild(cloud);

    if (isStorm) {
        setTimeout(() => {
            createRain(cloud, heroSection);
        }, 2000);
    }

    setTimeout(() => {
        if (cloud.parentNode) {
            cloud.parentNode.removeChild(cloud);
        }
    }, 20000);
}

function createRain(stormCloud, container) {
    const rainDuration = 3000; // 3 seconds of rain
    const rainInterval = setInterval(() => {
        if (!stormCloud.parentNode) {
            clearInterval(rainInterval);
            return;
        }
        
        for (let i = 0; i < 3; i++) {
            const rainDrop = document.createElement('div');
            rainDrop.className = 'rain-drop';
            
            const cloudRect = stormCloud.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();
            
            rainDrop.style.left = (cloudRect.left - containerRect.left) + Math.random() * cloudRect.width + 'px';
            rainDrop.style.top = (cloudRect.bottom - containerRect.top) + 'px';
            rainDrop.style.animationDuration = Math.random() * 0.3 + 0.4 + 's';
            
            container.appendChild(rainDrop);

            setTimeout(() => {
                if (rainDrop.parentNode) {
                    rainDrop.parentNode.removeChild(rainDrop);
                }
            }, 800);
        }
    }, 120);

    setTimeout(() => {
        clearInterval(rainInterval);
    }, rainDuration);
}

function startLightModeEffects() {
    if (cloudInterval) clearInterval(cloudInterval);
    cloudInterval = setInterval(createCloud, 3000);
}

function stopLightModeEffects() {
    if (cloudInterval) {
        clearInterval(cloudInterval);
        cloudInterval = null;
    }
    // Remove existing clouds and rain
    document.querySelectorAll('.cloud, .rain-drop').forEach(element => element.remove());
}

function createStar() {
    const heroSection = document.getElementById('home');
    if (!heroSection) return;
    
    const star = document.createElement('div');
    star.className = 'star';
    star.innerHTML = '★';
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 60 + 10 + '%';
    star.style.fontSize = Math.random() * 6 + 10 + 'px';
    star.style.animationDelay = Math.random() * 2 + 's';
    star.style.animationDuration = Math.random() * 2 + 2 + 's';
    
    heroSection.appendChild(star);

    setTimeout(() => {
        if (star.parentNode) {
            star.parentNode.removeChild(star);
        }
    }, 8000);
}

function createSnowflake() {
    const heroSection = document.getElementById('home');
    if (!heroSection) return;
    
    const snowflake = document.createElement('div');
    snowflake.className = 'snowflake';
    snowflake.innerHTML = '❄';
    snowflake.style.left = Math.random() * 100 + '%';
    snowflake.style.fontSize = Math.random() * 6 + 8 + 'px';
    snowflake.style.animationDuration = Math.random() * 2 + 4 + 's';
    snowflake.style.opacity = Math.random() * 0.6 + 0.3;
    
    heroSection.appendChild(snowflake);

    setTimeout(() => {
        if (snowflake.parentNode) {
            snowflake.parentNode.removeChild(snowflake);
        }
    }, 6000);
}

function startDarkModeEffects() {
    if (starInterval) clearInterval(starInterval);
    starInterval = setInterval(createStar, 800);
    
    if (snowInterval) clearInterval(snowInterval);
    snowInterval = setInterval(createSnowflake, 400);
}

function stopDarkModeEffects() {
    if (starInterval) {
        clearInterval(starInterval);
        starInterval = null;
    }
    if (snowInterval) {
        clearInterval(snowInterval);
        snowInterval = null;
    }
    // Remove existing effects
    document.querySelectorAll('.star, .snowflake').forEach(element => element.remove());
}

document.addEventListener('DOMContentLoaded', function() {
    startLightModeEffects();
});

function toggleMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    menu.classList.toggle('hidden');
}

function handleSubmit(event) {
    event.preventDefault();
    alert('Thank you for your message! This is a demo form - in a real website, this would send your message.');
}

const projectData = {
    project1: {
        title: "Industrial Catering System",
        description: "A comprehensive catering management system designed for industrial environments with contract management, meal ordering, and integrated payment processing.",
        challenge: "Industrial catering requires complex management of contracts, daily meal requests, menu planning, and payment processing. The system needed to handle multiple user roles and provide real-time updates.",
        solution: "Developed a full-stack web application using Spring Boot with microservice architecture, integrated VNPay for payments, and implemented role-based access control for different user types.",
        results: "• Complete contract and menu management system\n• Integrated online payment processing\n• Real-time meal ordering and tracking\n• Automated invoice generation and PDF export\n• Email notification system\n• Statistical reporting dashboard",
        technologies: ["Spring Boot", "Java 21", "Spring Security", "Spring Data JPA", "Thymeleaf", "Microsoft SQL Server", "Bootstrap", "jQuery", "Chart.js", "VNPay", "iText PDF", "Maven"],
        duration: "Oct 2024 – Feb 2025",
        role: "Full-Stack Developer",
        github: "https://github.com/HoangDucLuong/final_exam",
        images: [
            { type: "gradient", from: "teal-custom", to: "blue-400", icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" },
            { type: "gradient", from: "blue-400", to: "indigo-500", icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" }
        ]
    },
    project2: {
        title: "Web Ice Cream Shop",
        description: "An e-commerce platform for ice cream shops with comprehensive inventory management, user authentication, and administrative controls.",
        challenge: "Creating a user-friendly e-commerce platform that could handle product management, order processing, and provide different access levels for administrators and customers.",
        solution: "Built using C# .NET with ASP.NET framework, implemented Entity Framework for database operations, and created a responsive frontend with modern web technologies.",
        results: "• Complete product and inventory management\n• Secure user authentication and registration\n• Order processing and tracking system\n• Role-based access control\n• Sales performance analytics\n• Responsive design for all devices",
        technologies: ["C# .NET", "ASP.NET", "Microsoft SQL Server", "Entity Framework", "JavaScript", "SCSS", "CSS", "HTML", "Visual Studio", "Git"],
        duration: "Aug 2022 - June 2023",
        role: "Full-Stack Developer",
        github: "https://github.com/HoangDucLuong/WebIcecream",
        images: [
            { type: "gradient", from: "coral", to: "pink-400", icon: "M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" },
            { type: "gradient", from: "pink-400", to: "rose-500", icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" }
        ]
    }
};

function openProjectModal(projectId) {
    const project = siteContent && siteContent.projectDetails && siteContent.projectDetails[projectId] 
        ? siteContent.projectDetails[projectId] 
        : projectData[projectId];
    
    const modal = document.getElementById('projectModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.getElementById('modalContent');

    modalTitle.textContent = project.title;
    
    let images = [];
    if (project.images && project.images.length > 0) {
        images = project.images.map(img => ({
            type: "image",
            url: img.url,
            alt: img.alt
        }));
    } else {
        images = [
            { type: "gradient", from: "teal-custom", to: "blue-400", icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" },
            { type: "gradient", from: "blue-400", to: "indigo-500", icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" }
        ];
        
        if (projectId === 'project2') {
            images[0] = { type: "gradient", from: "coral", to: "pink-400", icon: "M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" };
            images[1] = { type: "gradient", from: "pink-400", to: "rose-500", icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" };
        }
    }
    
                modalContent.innerHTML = `
                <div class="space-y-8">

            <!-- Project Info -->
            <div class="grid md:grid-cols-2 gap-6 bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                <div>
                    <h4 class="font-semibold text-gray-800 dark:text-gray-200 mb-2">Duration</h4>
                    <p class="text-gray-600 dark:text-gray-300">${project.duration}</p>
                </div>
                <div>
                    <h4 class="font-semibold text-gray-800 dark:text-gray-200 mb-2">GitHub</h4>
                    <a href="${project.github}" target="_blank" class="text-teal-custom hover:text-teal-600 transition-colors">
                        View Repository
                    </a>
                </div>
            </div>

            <!-- Technologies -->
            <div>
                <h3 class="text-xl font-semibold mb-4">Technologies Used</h3>
                <div class="flex flex-wrap gap-2">
                    ${project.technologies.map(tech => `
                        <span class="bg-teal-custom/10 text-teal-custom px-3 py-1 rounded-full text-sm">${tech}</span>
                    `).join('')}
                </div>
            </div>

            <!-- Project Description -->
            <div>
                <h3 class="text-xl font-semibold mb-3">Overview</h3>
                <p class="text-gray-600 dark:text-gray-300 leading-relaxed">${project.description}</p>
            </div>

            <!-- Challenge -->
            <div>
                <h3 class="text-xl font-semibold mb-3">Challenge</h3>
                <p class="text-gray-600 dark:text-gray-300 leading-relaxed">${project.challenge}</p>
            </div>

            <!-- Solution -->
            <div>
                <h3 class="text-xl font-semibold mb-3">Solution</h3>
                <p class="text-gray-600 dark:text-gray-300 leading-relaxed">${project.solution}</p>
            </div>

            <!-- Results -->
            <div>
                <h3 class="text-xl font-semibold mb-3">Key Features & Results</h3>
                <div class="bg-teal-custom/5 dark:bg-teal-custom/10 rounded-xl p-6">
                    <pre class="text-gray-700 dark:text-gray-300 whitespace-pre-line font-medium">${Array.isArray(project.results) ? project.results.map(r => `• ${r}`).join('\n') : project.results}</pre>
                </div>
            </div>

            <!-- Project Documentation Section -->
            <div>
                <h3 class="text-xl font-semibold mb-4">Project Documentation</h3>
                <div class="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                    <div class="flex items-center justify-between mb-4">
                        <div class="flex items-center space-x-3">
                            <div class="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center">
                                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                </svg>
                            </div>
                            <div>
                                <h4 class="font-semibold text-gray-800 dark:text-gray-200">${project.docsTitle || 'Project Documentation'}</h4>
                                <p class="text-sm text-gray-600 dark:text-gray-400">${project.docsDescription || 'Project documentation and technical details'}</p>
                            </div>
                        </div>
                        <div class="flex space-x-2">
                            <button onclick="downloadDocument('${project.docsUrl}')" class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors inline-flex items-center">
                                <svg class="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                </svg>
                                Download
                            </button>
                        </div>
                    </div>
                    
                    <!-- PDF Viewer Container -->
                    <div class="docs-section mt-6">
                        <!-- PDF viewer will be dynamically created here -->
                    </div>
                </div>
            </div>

            <!-- CTA -->
            <div class="text-center pt-6 border-t border-gray-200 dark:border-gray-700">
                <div class="flex flex-wrap justify-center gap-4">
                    <a href="${project.github}" target="_blank" class="bg-charcoal text-white px-8 py-3 rounded-lg hover:bg-gray-700 transition-colors inline-flex items-center">
                        <svg class="mr-2 w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                        View on GitHub
                    </a>
                    <button onclick="closeProjectModal()" class="bg-teal-custom text-white px-8 py-3 rounded-lg hover:bg-teal-600 transition-colors">
                        Close Details
                    </button>
                </div>
            </div>
        </div>
    `;

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    
    const docsSection = modalContent.querySelector('.docs-section');
    if (docsSection && project.docsUrl) {
        const documentViewer = createDocumentViewer(projectId, project.docsUrl, project.docsTitle || 'Project Documentation');
        docsSection.appendChild(documentViewer);
    }
}

function closeProjectModal() {
    const modal = document.getElementById('projectModal');
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

document.getElementById('projectModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeProjectModal();
    }
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeProjectModal();
    }
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
        document.getElementById('mobileMenu').classList.add('hidden');
    });
});

let currentLightboxImages = [];
let currentLightboxIndex = 0;

function openLightbox(imageUrl, imageAlt, imageIndex, totalImages) {
    currentLightboxImages = [];
    currentLightboxIndex = imageIndex - 1;
    
    const project = getCurrentProject();
    if (project && project.images) {
        currentLightboxImages = project.images.filter(img => img.type === "image" || img.url);
    }
    
    const lightboxHTML = `
        <div class="lightbox" id="lightbox">
            <div class="lightbox-content">
                <button class="lightbox-close" onclick="closeLightbox()">×</button>
                
                ${currentLightboxImages.length > 1 ? `
                    <button class="lightbox-nav lightbox-prev" onclick="previousLightboxImage()">
                        <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                        </svg>
                    </button>
                    <button class="lightbox-nav lightbox-next" onclick="nextLightboxImage()">
                        <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                        </svg>
                    </button>
                ` : ''}
                
                <img src="${imageUrl}" alt="${imageAlt}" class="lightbox-image" id="lightboxImage">
                
                ${currentLightboxImages.length > 1 ? `
                    <div class="lightbox-counter" id="lightboxCounter">
                        ${imageIndex} / ${currentLightboxImages.length}
                    </div>
                ` : ''}
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', lightboxHTML);
    
    setTimeout(() => {
        document.getElementById('lightbox').classList.add('active');
    }, 10);
    
    document.addEventListener('keydown', handleLightboxKeydown);
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.classList.remove('active');
        setTimeout(() => {
            lightbox.remove();
        }, 300);
    }
    document.removeEventListener('keydown', handleLightboxKeydown);
}

function handleLightboxKeydown(e) {
    if (e.key === 'Escape') {
        closeLightbox();
    } else if (e.key === 'ArrowLeft') {
        previousLightboxImage();
    } else if (e.key === 'ArrowRight') {
        nextLightboxImage();
    }
}

function previousLightboxImage() {
    if (currentLightboxImages.length > 1) {
        currentLightboxIndex = (currentLightboxIndex - 1 + currentLightboxImages.length) % currentLightboxImages.length;
        updateLightboxImage();
    }
}

function nextLightboxImage() {
    if (currentLightboxImages.length > 1) {
        currentLightboxIndex = (currentLightboxIndex + 1) % currentLightboxImages.length;
        updateLightboxImage();
    }
}

function updateLightboxImage() {
    if (currentLightboxImages[currentLightboxIndex]) {
        const image = currentLightboxImages[currentLightboxIndex];
        const lightboxImg = document.getElementById('lightboxImage');
        const counter = document.getElementById('lightboxCounter');
        
        if (lightboxImg) {
            lightboxImg.src = image.url;
            lightboxImg.alt = image.alt;
        }
        
        if (counter) {
            counter.textContent = `${currentLightboxIndex + 1} / ${currentLightboxImages.length}`;
        }
    }
}

function getCurrentProject() {
    // Get current project from modal title
    const modalTitle = document.getElementById('modalTitle');
    if (modalTitle) {
        const title = modalTitle.textContent;
        if (siteContent && siteContent.projectDetails) {
            return Object.values(siteContent.projectDetails).find(p => p.title === title);
        }
    }
    return null;
}

let isAudioPlaying = false;
let isAudioMuted = false;
let audioVolume = 0.3;

function initAudioPlayer() {
    const audio = document.getElementById('backgroundMusic');
    const muteBtn = document.getElementById('audioMute');
    const volumeIcon = document.getElementById('volumeIcon');
    const muteIcon = document.getElementById('muteIcon');
    
    if (!audio || !muteBtn) return;
    
    audio.volume = audioVolume;
    audio.loop = true;
    audio.muted = false;
    
    const attemptAutoplay = () => {
        if (audio.readyState < 2) {
            audio.addEventListener('canplaythrough', () => {
                audio.play().then(() => {
                    isAudioPlaying = true;
                    console.log('Audio autoplay successful');
                }).catch(error => {
                    console.log('Audio autoplay blocked by browser:', error);
                    document.addEventListener('click', function startAudioOnInteraction() {
                        if (!isAudioPlaying && audio.paused) {
                            audio.play().then(() => {
                                isAudioPlaying = true;
                            }).catch(error => {
                                console.log('Audio play failed:', error);
                            });
                        }
                        document.removeEventListener('click', startAudioOnInteraction);
                    }, { once: true });
                });
            }, { once: true });
        } else {
            audio.play().then(() => {
                isAudioPlaying = true;
                console.log('Audio autoplay successful');
            }).catch(error => {
                console.log('Audio autoplay blocked by browser:', error);
                document.addEventListener('click', function startAudioOnInteraction() {
                    if (!isAudioPlaying && audio.paused) {
                        audio.play().then(() => {
                            isAudioPlaying = true;
                        }).catch(error => {
                            console.log('Audio play failed:', error);
                        });
                    }
                    document.removeEventListener('click', startAudioOnInteraction);
                }, { once: true });
            });
        }
    };
    
    // Attempt autoplay when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', attemptAutoplay);
    } else {
        attemptAutoplay();
    }
    
    window.addEventListener('load', () => {
        if (!isAudioPlaying && audio.paused) {
            attemptAutoplay();
        }
    });
    
    muteBtn.addEventListener('click', () => {
        if (isAudioMuted) {
            audio.muted = false;
            isAudioMuted = false;
            volumeIcon.classList.remove('hidden');
            muteIcon.classList.add('hidden');
        } else {
            audio.muted = true;
            isAudioMuted = true;
            volumeIcon.classList.add('hidden');
            muteIcon.classList.remove('hidden');
        }
    });
    
    audio.addEventListener('play', () => {
        isAudioPlaying = true;
    });
    
    audio.addEventListener('pause', () => {
        isAudioPlaying = false;
    });
    
    audio.addEventListener('ended', () => {
        isAudioPlaying = false;
    });
}

let audioContext = null;
let soundVolume = 0.3;

function initAudioContext() {
    try {
        if (typeof AudioContext !== 'undefined' || typeof webkitAudioContext !== 'undefined') {
            audioContext = new (AudioContext || webkitAudioContext)();
        }
    } catch (error) {
        console.log('Web Audio API not supported:', error);
    }
}

function playClickSound() {
    if (!audioContext) return;
    
    try {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
        
        gainNode.gain.setValueAtTime(soundVolume * 0.5, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    } catch (error) {
        console.log('Click sound failed:', error);
    }
}

function playHoverSound() {
    if (!audioContext) return;
    
    try {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
        
        gainNode.gain.setValueAtTime(soundVolume * 0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.05);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.05);
    } catch (error) {
        console.log('Hover sound failed:', error);
    }
}

function playSuccessMelody() {
    if (!audioContext) return;
    
    try {
        const frequencies = [261.63, 329.63, 392.00];
        const duration = 0.15;
        
        frequencies.forEach((freq, index) => {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(freq, audioContext.currentTime);
            
            gainNode.gain.setValueAtTime(soundVolume * 0.4, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
            
            oscillator.start(audioContext.currentTime + (index * 0.1));
            oscillator.stop(audioContext.currentTime + (index * 0.1) + duration);
        });
    } catch (error) {
        console.log('Success melody failed:', error);
    }
}

function playThemeToggleSound() {
    if (!audioContext) return;
    
    try {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(800, audioContext.currentTime + 0.1);
        oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.2);
        
        gainNode.gain.setValueAtTime(soundVolume * 0.6, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.2);
    } catch (error) {
        console.log('Theme toggle sound failed:', error);
    }
}

function addSoundEffects() {
    const clickableElements = document.querySelectorAll('button, a, [role="button"], .clickable');
    
    clickableElements.forEach(element => {
        element.addEventListener('click', (e) => {
            if (!element.closest('#audioPlayer')) {
                playClickSound();
            }
        });
        
        element.addEventListener('mouseenter', () => {
            playHoverSound();
        });
    });
    
    const themeToggle = document.querySelector('[data-theme-toggle]');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            playThemeToggleSound();
        });
    }
    
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', () => {
            playSuccessMelody();
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    initAudioPlayer();
    initAudioContext();
    addSoundEffects();
    initContactCards();
});

function openDonateModal() {
    const modal = document.getElementById('donateModal');
    const title = document.getElementById('donateModalTitle');
    const description = document.getElementById('donateModalDescription');
    const image = document.getElementById('donateModalImage');
    
    if (modal && title && description && image) {
        if (window.siteContent && window.siteContent.donate) {
            const donate = window.siteContent.donate;
            title.textContent = donate.title;
            description.textContent = donate.description;
            image.src = donate.image.url;
            image.alt = donate.image.alt;
        } else {
            title.textContent = 'Support My Work';
            description.textContent = 'If you find my work valuable, consider supporting me!';
            image.src = 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop';
            image.alt = 'Thank you for your support!';
        }
        
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}

function closeDonateModal() {
    const modal = document.getElementById('donateModal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    }
}

function initContactCards() {
    const contactCards = document.querySelectorAll('#contact .group');
    
    contactCards.forEach(card => {
        card.addEventListener('click', function(e) {
            if (e.target.tagName === 'A' || e.target.closest('a')) {
                return;
            }
            
            const link = card.querySelector('a');
            if (link) {
                try {
                    playClickSound();
                } catch (error) {
                    console.log('Click sound failed:', error);
                }
                
                window.open(link.href, link.target || '_blank');
            }
        });
        
        card.style.cursor = 'pointer';
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const donateModal = document.getElementById('donateModal');
    if (donateModal) {
        donateModal.addEventListener('click', function(e) {
            if (e.target === donateModal) {
                closeDonateModal();
            }
        });
    }
});

function downloadDocument(docUrl) {
    if (!docUrl) {
        console.error('No document URL provided');
        return;
    }
    
    const link = document.createElement('a');
    link.href = docUrl;
    link.download = docUrl.split('/').pop() || 'document.pdf';
    link.target = '_blank';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    try {
        playSuccessMelody();
    } catch (error) {
        console.log('Success sound failed:', error);
    }
}

// CV Modal Functions
function openCvModal() {
    const modal = document.getElementById('cvModal');
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        
        try {
            playClickSound();
        } catch (error) {
            console.log('Click sound failed:', error);
        }
    }
}

function closeCvModal() {
    const modal = document.getElementById('cvModal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
        
        try {
            playClickSound();
        } catch (error) {
            console.log('Click sound failed:', error);
        }
    }
}

function downloadCv() {
    const cvUrl = 'docs/CV_TRUONGKHANGDY.pdf';
    const link = document.createElement('a');
    link.href = cvUrl;
    link.download = 'CV_TRUONGKHANGDY.pdf';
    link.target = '_blank';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    try {
        playSuccessMelody();
    } catch (error) {
        console.log('Success sound failed:', error);
    }
}

function openCvInNewTab() {
    const cvUrl = 'docs/CV_TRUONGKHANGDY.pdf';
    window.open(cvUrl, '_blank');
    
    try {
        playClickSound();
    } catch (error) {
        console.log('Click sound failed:', error);
    }
}

// Add event listeners for CV modal
document.addEventListener('DOMContentLoaded', function() {
    const cvModal = document.getElementById('cvModal');
    if (cvModal) {
        cvModal.addEventListener('click', function(e) {
            if (e.target === cvModal) {
                closeCvModal();
            }
        });
    }
    
    // Add keyboard event listener for CV modal
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const cvModal = document.getElementById('cvModal');
            if (cvModal && !cvModal.classList.contains('hidden')) {
                closeCvModal();
            }
        }
    });
});

// Contact Form Validation and Handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const messageTextarea = document.getElementById('message');
    const charCount = document.getElementById('charCount');
    
    if (contactForm) {
        // Character counter for message
        messageTextarea.addEventListener('input', function() {
            const length = this.value.length;
            charCount.textContent = length;
            
            if (length > 900) {
                charCount.classList.add('text-red-500');
            } else {
                charCount.classList.remove('text-red-500');
            }
        });
        
        // Form validation
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm()) {
                submitForm();
            }
        });
        
        // Real-time validation
        const inputs = contactForm.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                clearFieldError(this);
            });
        });
    }
});

function validateForm() {
    const form = document.getElementById('contactForm');
    const inputs = form.querySelectorAll('input, select, textarea');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });
    
    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    const errorElement = field.parentNode.querySelector('.validation-message');
    
    // Clear previous error
    clearFieldError(field);
    
    // Required field validation
    if (field.hasAttribute('required') && !value) {
        showFieldError(field, 'This field is required');
        return false;
    }
    
    // Email validation
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showFieldError(field, 'Please enter a valid email address');
            return false;
        }
    }
    
    // Name validation
    if (field.id === 'firstName' || field.id === 'lastName') {
        if (value.length < 2) {
            showFieldError(field, 'Name must be at least 2 characters long');
            return false;
        }
    }
    
    // Message validation
    if (field.id === 'message') {
        if (value.length < 10) {
            showFieldError(field, 'Message must be at least 10 characters long');
            return false;
        }
        if (value.length > 1000) {
            showFieldError(field, 'Message cannot exceed 1000 characters');
            return false;
        }
    }
    
    return true;
}

function showFieldError(field, message) {
    const errorElement = field.parentNode.querySelector('.validation-message');
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.remove('hidden');
        field.classList.add('border-red-500');
    }
}

function clearFieldError(field) {
    const errorElement = field.parentNode.querySelector('.validation-message');
    if (errorElement) {
        errorElement.classList.add('hidden');
        field.classList.remove('border-red-500');
    }
}

function submitForm() {
    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const originalText = submitBtn.innerHTML;
    
    // Get form data
    const formData = {
        firstName: document.getElementById('firstName').value.trim(),
        lastName: document.getElementById('lastName').value.trim(),
        email: document.getElementById('email').value.trim(),
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value.trim()
    };

    // Show loading state
    submitBtn.innerHTML = `
        <svg class="animate-spin w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Sending...
    `;
    submitBtn.disabled = true;

    // Prepare email parameters
    const templateParams = {
        to_email: 'khangdy38@gmail.com',
        from_name: `${formData.firstName} ${formData.lastName}`,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        reply_to: formData.email,
        timestamp: new Date().toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            timeZoneName: 'short'
        })
    };

    // Send email to you
    emailjs.send('service_72v62sb', 'template_abiempv', templateParams)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            
            // Send auto-reply
            emailjs.send("service_72v62sb", "template_gu3piyx", {
                to_name: formData.firstName,
                email: formData.email,
                from_name: "Khang Dy",
                from_email: "khangdy38@gmail.com",
                subject: formData.subject,
                message: formData.message,
                timestamp: new Date().toLocaleString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    timeZoneName: 'short'
                }),
                name: `${formData.firstName} ${formData.lastName}`
            })
                .then(function(autoReplyResponse) {
                    console.log('Auto-reply sent successfully!');
                    showSuccessMessage();
                    resetForm();
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, function(autoReplyError) {
                    console.log('Auto-reply failed, but main email sent');
                    showSuccessMessage();
                    resetForm();
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                });
                
        }, function(error) {
            console.log('FAILED...', error);
            showErrorMessage();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        });
}

function showSuccessMessage() {
    const form = document.getElementById('contactForm');
    const successDiv = document.createElement('div');
    successDiv.className = 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6 mb-6';
    successDiv.innerHTML = `
        <div class="flex items-center">
            <svg class="w-6 h-6 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <div>
                <h4 class="text-lg font-semibold text-green-800 dark:text-green-200">Message Sent Successfully!</h4>
                <p class="text-green-600 dark:text-green-300">Thank you for your message. I'll get back to you soon!</p>
            </div>
        </div>
    `;
    
    form.parentNode.insertBefore(successDiv, form);
    
    // Remove success message after 5 seconds
    setTimeout(() => {
        successDiv.remove();
    }, 5000);
}

function showErrorMessage() {
    const form = document.getElementById('contactForm');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6 mb-6';
    errorDiv.innerHTML = `
        <div class="flex items-center">
            <svg class="w-6 h-6 text-red-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
            <div>
                <h4 class="text-lg font-semibold text-red-800 dark:text-red-200">Message Failed to Send</h4>
                <p class="text-red-600 dark:text-red-300">Sorry, there was an error sending your message. Please try again or contact me directly at khangdy38@gmail.com</p>
            </div>
        </div>
    `;
    
    form.parentNode.insertBefore(errorDiv, form);
    
    // Remove error message after 5 seconds
    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
}

function resetForm() {
    const form = document.getElementById('contactForm');
    form.reset();
    
    // Clear all validation messages
    const errorElements = form.querySelectorAll('.validation-message');
    errorElements.forEach(element => {
        element.classList.add('hidden');
    });
    
    // Reset character count
    document.getElementById('charCount').textContent = '0';
    
    // Remove error styling
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.classList.remove('border-red-500');
    });
}

// Skills Assessment - Quiz System
let currentQuestionIndex = 0;
let score = 0;
let questions = [
    {
        question: "What is the main advantage of using Spring Boot?",
        options: [
            "It's free and open source",
            "Auto-configuration and embedded servers",
            "Better performance than other frameworks",
            "More secure than traditional Java EE"
        ],
        correct: 1,
        explanation: "Spring Boot provides auto-configuration and embedded servers, making it easier to create standalone applications."
    },
    {
        question: "Which annotation is used to create a REST controller in Spring Boot?",
        options: [
            "@Controller",
            "@RestController", 
            "@Service",
            "@Repository"
        ],
        correct: 1,
        explanation: "@RestController is a convenience annotation that combines @Controller and @ResponseBody."
    },
    {
        question: "What is the purpose of @Autowired annotation?",
        options: [
            "To create new objects",
            "To inject dependencies automatically",
            "To mark methods as public",
            "To handle exceptions"
        ],
        correct: 1,
        explanation: "@Autowired is used for dependency injection, allowing Spring to automatically wire beans."
    },
    {
        question: "Which HTTP method is typically used for creating new resources?",
        options: [
            "GET",
            "POST",
            "PUT",
            "DELETE"
        ],
        correct: 1,
        explanation: "POST is used for creating new resources, while GET is for retrieving, PUT for updating, and DELETE for removing."
    },
    {
        question: "What is JPA in the context of Spring Boot?",
        options: [
            "Java Persistence API - a specification for object-relational mapping",
            "Java Programming Application",
            "Java Performance Analyzer",
            "Java Package Architecture"
        ],
        correct: 0,
        explanation: "JPA (Java Persistence API) is a specification for object-relational mapping in Java."
    }
];

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById('quizQuestions').classList.remove('hidden');
    document.getElementById('quizResults').classList.add('hidden');
    showQuestion();
}

function showQuestion() {
    const question = questions[currentQuestionIndex];
    document.getElementById('currentQuestion').textContent = currentQuestionIndex + 1;
    document.getElementById('score').textContent = score;
    document.getElementById('questionText').textContent = question.question;
    
    const optionsContainer = document.getElementById('optionsContainer');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'w-full text-left p-4 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200';
        button.textContent = option;
        button.onclick = () => selectAnswer(index);
        optionsContainer.appendChild(button);
    });
}

function selectAnswer(selectedIndex) {
    const question = questions[currentQuestionIndex];
    const buttons = document.querySelectorAll('#optionsContainer button');
    
    // Disable all buttons
    buttons.forEach(button => {
        button.disabled = true;
        button.classList.remove('hover:bg-gray-50', 'dark:hover:bg-gray-600');
    });
    
    // Show correct/incorrect styling
    buttons.forEach((button, index) => {
        if (index === question.correct) {
            button.classList.add('bg-green-100', 'border-green-500', 'text-green-800');
        } else if (index === selectedIndex && index !== question.correct) {
            button.classList.add('bg-red-100', 'border-red-500', 'text-red-800');
        }
    });
    
    // Update score
    if (selectedIndex === question.correct) {
        score++;
    }
    
    // Show explanation
    setTimeout(() => {
        showExplanation();
    }, 1000);
}

function showExplanation() {
    const question = questions[currentQuestionIndex];
    const explanationDiv = document.createElement('div');
    explanationDiv.className = 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 mt-4';
    explanationDiv.innerHTML = `
        <h5 class="font-semibold text-blue-800 dark:text-blue-200 mb-2">Explanation:</h5>
        <p class="text-blue-600 dark:text-blue-300">${question.explanation}</p>
    `;
    
    document.getElementById('questionContainer').appendChild(explanationDiv);
    
    // Show next button
    const nextButton = document.createElement('button');
    nextButton.className = 'mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors';
    nextButton.textContent = currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz';
    nextButton.onclick = () => {
        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            document.getElementById('questionContainer').innerHTML = `
                <div class="flex items-center justify-between mb-4">
                    <span class="text-sm text-gray-500 dark:text-gray-400">Question <span id="currentQuestion">${currentQuestionIndex + 1}</span> of 5</span>
                    <span class="text-sm text-gray-500 dark:text-gray-400">Score: <span id="score">${score}</span>/5</span>
                </div>
                <h4 id="questionText" class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4"></h4>
                <div id="optionsContainer" class="space-y-3"></div>
            `;
            showQuestion();
        } else {
            showQuizResults();
        }
    };
    
    document.getElementById('questionContainer').appendChild(nextButton);
}

function showQuizResults() {
    document.getElementById('quizQuestions').classList.add('hidden');
    document.getElementById('quizResults').classList.remove('hidden');
    document.getElementById('finalScore').textContent = `${score}/5`;
    
    const scoreMessage = document.getElementById('scoreMessage');
    if (score === 5) {
        scoreMessage.innerHTML = '<p class="text-green-600 dark:text-green-400 font-semibold">Perfect! You have excellent Java knowledge! 🎉</p>';
    } else if (score >= 3) {
        scoreMessage.innerHTML = '<p class="text-blue-600 dark:text-blue-400 font-semibold">Good job! You have solid Java fundamentals! 👍</p>';
    } else {
        scoreMessage.innerHTML = '<p class="text-orange-600 dark:text-orange-400 font-semibold">Keep learning! Practice makes perfect! 📚</p>';
    }
}

function restartQuiz() {
    document.getElementById('quizResults').classList.add('hidden');
    startQuiz();
}

// Coding Challenges
let currentChallengeIndex = 0;
const challenges = [
    {
        title: "Reverse String",
        description: "Write a method that reverses a given string. The method should return the reversed string.",
        template: `public String reverseString(String str) {
    // Your code here
    return "";
}`,
        solution: `public String reverseString(String str) {
    if (str == null || str.isEmpty()) {
        return str;
    }
    return new StringBuilder(str).reverse().toString();
}`,
        testCases: [
            { input: "hello", expected: "olleh" },
            { input: "world", expected: "dlrow" },
            { input: "", expected: "" }
        ]
    },
    {
        title: "Find Maximum",
        description: "Write a method that finds the maximum value in an array of integers.",
        template: `public int findMax(int[] numbers) {
    // Your code here
    return 0;
}`,
        solution: `public int findMax(int[] numbers) {
    if (numbers == null || numbers.length == 0) {
        throw new IllegalArgumentException("Array cannot be null or empty");
    }
    int max = numbers[0];
    for (int i = 1; i < numbers.length; i++) {
        if (numbers[i] > max) {
            max = numbers[i];
        }
    }
    return max;
}`,
        testCases: [
            { input: [1, 5, 3, 9, 2], expected: 9 },
            { input: [-1, -5, -3], expected: -1 },
            { input: [42], expected: 42 }
        ]
    }
];

function startCodingChallenge() {
    currentChallengeIndex = 0;
    document.getElementById('codingChallenge').querySelector('.bg-gradient-to-r').classList.add('hidden');
    document.getElementById('challengeContainer').classList.remove('hidden');
    showChallenge();
}

function showChallenge() {
    const challenge = challenges[currentChallengeIndex];
    document.getElementById('challengeTitle').textContent = challenge.title;
    document.getElementById('challengeDescription').textContent = challenge.description;
    document.getElementById('codeTemplate').textContent = challenge.template;
    document.getElementById('userCode').value = challenge.template;
    document.getElementById('challengeResults').classList.add('hidden');
}

function testCode() {
    const userCode = document.getElementById('userCode').value;
    const challenge = challenges[currentChallengeIndex];
    
    // Simple validation (in a real app, you'd use a proper code execution environment)
    let isValid = true;
    let feedback = '';
    
    // Check if method signature is correct
    if (!userCode.includes('public') || !userCode.includes('{') || !userCode.includes('}')) {
        isValid = false;
        feedback = 'Please ensure your method has the correct signature and structure.';
    }
    
    // Check if return statement exists
    if (!userCode.includes('return')) {
        isValid = false;
        feedback = 'Your method should include a return statement.';
    }
    
    if (isValid) {
        feedback = 'Code structure looks good! This is a simplified test - in a real environment, your code would be executed with test cases.';
    }
    
    showChallengeResults(isValid, feedback);
}

function showChallengeResults(isValid, feedback) {
    document.getElementById('challengeResults').classList.remove('hidden');
    const resultMessage = document.getElementById('resultMessage');
    
    if (isValid) {
        resultMessage.innerHTML = `
            <div class="flex items-center text-green-600 dark:text-green-400">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span class="font-semibold">Code validation passed!</span>
            </div>
            <p class="text-gray-600 dark:text-gray-300 mt-2">${feedback}</p>
        `;
    } else {
        resultMessage.innerHTML = `
            <div class="flex items-center text-red-600 dark:text-red-400">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
                <span class="font-semibold">Code validation failed</span>
            </div>
            <p class="text-gray-600 dark:text-gray-300 mt-2">${feedback}</p>
        `;
    }
}

function showSolution() {
    const challenge = challenges[currentChallengeIndex];
    document.getElementById('userCode').value = challenge.solution;
    
    const resultMessage = document.getElementById('resultMessage');
    resultMessage.innerHTML = `
        <div class="flex items-center text-blue-600 dark:text-blue-400">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span class="font-semibold">Solution displayed</span>
        </div>
        <p class="text-gray-600 dark:text-gray-300 mt-2">This is one possible solution. There might be other valid approaches!</p>
    `;
    
    document.getElementById('challengeResults').classList.remove('hidden');
}

function nextChallenge() {
    currentChallengeIndex++;
    if (currentChallengeIndex >= challenges.length) {
        // All challenges completed
        document.getElementById('challengeContainer').innerHTML = `
            <div class="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800 text-center">
                <h4 class="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">All Challenges Complete!</h4>
                <p class="text-gray-600 dark:text-gray-300 mb-4">Great job completing all the coding challenges!</p>
                <button onclick="restartCodingChallenge()" class="bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
                    Start Over
                </button>
            </div>
        `;
    } else {
        showChallenge();
    }
}

function restartCodingChallenge() {
    currentChallengeIndex = 0;
    document.getElementById('challengeContainer').innerHTML = `
        <div class="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 border border-gray-200 dark:border-gray-600">
            <h4 id="challengeTitle" class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4"></h4>
            <p id="challengeDescription" class="text-gray-600 dark:text-gray-300 mb-4"></p>
            <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <pre id="codeTemplate"></pre>
            </div>
            <div class="mt-4">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Your Answer:</label>
                <textarea id="userCode" rows="4" class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-teal-custom focus:border-transparent dark:bg-gray-700 dark:text-white font-mono text-sm resize-none" placeholder="Write your code here..."></textarea>
            </div>
            <div class="flex space-x-4 mt-4">
                <button onclick="testCode()" class="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
                    Test Code
                </button>
                <button onclick="showSolution()" class="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
                    Show Solution
                </button>
            </div>
        </div>
        
        <div id="challengeResults" class="hidden bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
            <h4 class="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">Challenge Results</h4>
            <div id="resultMessage" class="mb-4"></div>
            <button onclick="nextChallenge()" class="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
                Next Challenge
            </button>
        </div>
    `;
    showChallenge();
}