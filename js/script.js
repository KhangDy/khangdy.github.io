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

    utils.openModal('projectModal');
    
    const docsSection = modalContent.querySelector('.docs-section');
    if (docsSection && project.docsUrl) {
        const documentViewer = createDocumentViewer(projectId, project.docsUrl, project.docsTitle || 'Project Documentation');
        docsSection.appendChild(documentViewer);
    }
}

function closeProjectModal() {
    utils.closeModal('projectModal');
}

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
            image.src = 'img/donate.jpg';
            image.alt = 'Thank you for your support!';
        }
        
        utils.openModal('donateModal');
    }
}

function closeDonateModal() {
    utils.closeModal('donateModal');
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
                window.open(link.href, link.target || '_blank');
            }
        });
        
        card.style.cursor = 'pointer';
    });
}

// CV Modal Functions
function openCvModal() {
    utils.openModal('cvModal');
}

function closeCvModal() {
    utils.closeModal('cvModal');
}

function downloadCv() {
    utils.downloadFile('docs/CV_TRUONGKHANGDY.pdf', 'CV_TRUONGKHANGDY.pdf');
}

function openCvInNewTab() {
    const cvUrl = 'docs/CV_TRUONGKHANGDY.pdf';
    window.open(cvUrl, '_blank');
}

// Academic Records Modal Functions
function openAcademicRecords() {
    utils.openModal('academicRecordsModal');
}

function closeAcademicRecordsModal() {
    utils.closeModal('academicRecordsModal');
}

function downloadAcademicRecordsFile() {
    utils.downloadFile('docs/Diem.pdf', 'Academic_Records_Diem.pdf');
}

function openAcademicRecordsInNewTab() {
    const recordsUrl = 'docs/Diem.pdf';
    window.open(recordsUrl, '_blank');
}

// Certificates Modal Functions
function openCertificates() {
    utils.openModal('certificatesModal');
}

function closeCertificatesModal() {
    utils.closeModal('certificatesModal');
}

function downloadCertificatesFile() {
    utils.downloadFile('docs/Diem.pdf', 'Certificates_Diem.pdf');
}

function openCertificatesInNewTab() {
    const certificatesUrl = 'docs/Diem.pdf';
    window.open(certificatesUrl, '_blank');
}

document.addEventListener('DOMContentLoaded', function() {
    initAudioPlayer();
    initContactCards();
    
    // Smooth scrolling for anchor links
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
});





