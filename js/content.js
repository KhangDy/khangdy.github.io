let siteContent = null;

async function loadContent() {
    try {
        const response = await fetch('data/content.json');
        siteContent = await response.json();
        window.siteContent = siteContent;
        populateContent();
    } catch (error) {
        console.error('Error loading content:', error);
        siteContent = getFallbackContent();
        window.siteContent = siteContent;
        populateContent();
    }
}

function getFallbackContent() {
    return {
        site: {
            title: "Truong Khang Dy - Java Developer",
            language: "en"
        },
        navigation: {
            home: "Home",
            projects: "Projects",
            about: "About",
            contact: "Contact",
            donate: "Donate"
        },
        hero: {
            greeting: "Hi, I'm",
            name: "Khang Dy",
            title: "A Java Developer.",
            description: "Passionate about building robust and scalable applications with modern Java technologies. I specialize in Spring Boot, microservices, and full-stack development.",
            avatar: {
                url: "img/avata.jpg",
                alt: "Khang Dy - Java Developer"
            },
            buttons: {
                viewWork: "View My Work",
                github: "GitHub"
            }
        },
        projects: {
            title: "Featured Projects",
            subtitle: "A selection of my recent work",
            items: [
                {
                    id: "project1",
                    title: "Industrial Catering System",
                    description: "Complete catering management system with contract management, meal ordering, and payment integration",
                    technologies: ["Spring Boot", "Java 21", "VNPay"],
                    duration: "Oct 2024 – Feb 2025"
                },
                {
                    id: "project2",
                    title: "Web Ice Cream Shop",
                    description: "E-commerce platform for ice cream shops with inventory management and user authentication",
                    technologies: ["C# .NET", "ASP.NET", "SQL Server"],
                    duration: "Aug 2022 - June 2023"
                }
            ]
        },
        skills: {
            title: "Technical Skills",
            
            categories: [
                {
                    name: "Client-Side",
                    skills: ["HTML", "CSS", "JavaScript", "React", "TypeScript", "Bootstrap"]
                },
                {
                    name: "Server-Side",
                    skills: ["Java Spring Boot", "JWT", "Hibernate", "Microservice", "OOP", "SQL Server"]
                },
                {
                    name: "Development & Operations",
                    skills: ["Git", "Maven", "Visual Studio", "Spring DevTools"]
                }
            ]
        },
        about: {
            title: "About Me",
            sections: [
                {
                    name: "About Me",
                    content: [
                        "As a dedicated Java Developer, I specialize in building robust and scalable applications using modern technologies.",
                        "My expertise spans across Spring Boot, microservices architecture, and full-stack development.",
                        "I have hands-on experience with enterprise-level projects, including payment integration, security implementation, and database optimization. I'm passionate about writing clean, maintainable code and following best practices."
                    ]
                },
                {
                    name: "Education",
                    degree: "Software Engineering Graduate",
                    school: "Aptech Computer Education",
                    period: "8/2022 - Now",
                    description: "Completed comprehensive software engineering program with focus on Java development, web technologies, and software project management."
                }
            ],
            sidebar: {
                skills: {
                    title: "Skills",
                    items: [
                        { name: "Teamwork", level: 100 },
                        { name: "Time & Task Management", level: 100 },
                        { name: "Self Learning & Research", level: 100 }
                    ]
                },
                language: {
                    title: "Language",
                    items: [
                        { name: "English (Basic)", level: 50 }
                    ]
                },
                certificates: {
                    title: "Certificates",
                    items: [
                        { name: "Data Analysis Fundamentals", issuer: "Aptech Computer Education" },
                        { name: "English for Information Technology", issuer: "Aptech Computer Education" }
                    ]
                }
            }
        },
        contact: {
            title: "Let's Connect",
            subtitle: "Ready to work together? Let's start a conversation.",
            methods: [
                { type: "Email", value: "khangdy38@gmail.com" },
                { type: "Phone", value: "0865257858" },
                { type: "GitHub", value: "github.com/KhangDy", url: "https://github.com/KhangDy" },
                { type: "Facebook", value: "duatrebenho", url: "https://www.facebook.com/duatrebenho" }
            ],
            cv: {
                title: "Download CV",
                url: "docs/CV_TRUONGKHANGDY.pdf",
                description: "Download my resume"
            }
        },
        footer: {
            copyright: "© 2025 Truong Khang Dy. Built with passion for technology."
        },
        donate: {
            title: "Support My Work",
            description: "If you find my work valuable, consider supporting me!",
            image: {
                url: "img/donate.jpg",
                alt: "Thank you for your support!"
            }
        },
        projectDetails: {
            project1: {
                title: "Industrial Catering System",
                description: "A comprehensive catering management system designed for industrial environments with contract management, meal ordering, and integrated payment processing.",
                challenge: "Industrial catering requires complex management of contracts, daily meal requests, menu planning, and payment processing. The system needed to handle multiple user roles and provide real-time updates.",
                solution: "Developed a full-stack web application using Spring Boot with microservice architecture, integrated VNPay for payments, and implemented role-based access control for different user types.",
                results: [
                    "Complete contract and menu management system",
                    "Integrated online payment processing",
                    "Real-time meal ordering and tracking",
                    "Automated invoice generation and PDF export",
                    "Email notification system",
                    "Statistical reporting dashboard"
                ],
                technologies: ["Spring Boot", "Java 21", "Spring Security", "Spring Data JPA", "Thymeleaf", "Microsoft SQL Server", "Bootstrap", "jQuery", "Chart.js", "VNPay", "iText PDF", "Maven"],
                duration: "Oct 2024 – Feb 2025",
                role: "Full-Stack Developer",
                github: "https://github.com/HoangDucLuong/final_exam",
                docsTitle: "Industrial Catering System Documentation",
                docsUrl: "docs/IndustrialCatering.pdf",
                docsDescription: "Complete technical documentation and user guide",
                docsType: "pdf",
                images: [
                    {
                        url: "img/avata.jpg",
                        alt: "Industrial Catering System - Main Interface"
                    },
                    {
                        url: "img/donate.jpg",
                        alt: "Industrial Catering System - Dashboard"
                    }
                ]
            },
            project2: {
                title: "Web Ice Cream Shop",
                description: "An e-commerce platform for ice cream shops with comprehensive inventory management, user authentication, and administrative controls.",
                challenge: "Creating a user-friendly e-commerce platform that could handle product management, order processing, and provide different access levels for administrators and customers.",
                solution: "Built using C# .NET with ASP.NET framework, implemented Entity Framework for database operations, and created a responsive frontend with modern web technologies.",
                results: [
                    "Complete product and inventory management",
                    "Secure user authentication and registration",
                    "Order processing and tracking system",
                    "Role-based access control",
                    "Sales performance analytics",
                    "Responsive design for all devices"
                ],
                technologies: ["C# .NET", "ASP.NET", "Microsoft SQL Server", "Entity Framework", "JavaScript", "SCSS", "CSS", "HTML", "Visual Studio", "Git"],
                duration: "Aug 2022 - June 2023",
                role: "Full-Stack Developer",
                github: "https://github.com/HoangDucLuong/WebIcecream",
                docsTitle: "Ice Cream Shop Documentation",
                docsUrl: "docs/Ice_cream.pdf",
                docsDescription: "System architecture and deployment guide",
                docsType: "pdf",
                images: [
                    {
                        url: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop",
                        alt: "Ice Cream Shop - Product Page"
                    },
                    {
                        url: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
                        alt: "Ice Cream Shop - Shopping Cart"
                    }
                ]
            }
        }
    };
}

function populateContent() {
    if (!siteContent) return;
    
    document.title = siteContent.site.title;
    
    updateNavigation();
    
    updateHeroSection();
    
    updateProjectsSection();
    
    updateSkillsSection();
    
    updateAboutSection();
    
    updateContactSection();
    
    updateFooter();
}

function updateNavigation() {
    const nav = siteContent.navigation;
    
    document.querySelectorAll('a[href="#home"]').forEach(link => {
        link.textContent = nav.home;
    });
    
    document.querySelectorAll('a[href="#projects"]').forEach(link => {
        link.textContent = nav.projects;
    });
    
    document.querySelectorAll('a[href="#about"]').forEach(link => {
        link.textContent = nav.about;
    });
    
    document.querySelectorAll('a[href="#contact"]').forEach(link => {
        link.textContent = nav.contact;
    });
    
    document.querySelectorAll('button.bg-coral').forEach(button => {
        if (button.textContent.trim() === 'Hire Me') {
            button.textContent = nav.donate;
            button.onclick = openDonateModal;
        }
    });
    
    // Update CV button if contact.cv exists
    if (siteContent.contact && siteContent.contact.cv) {
        document.querySelectorAll('button[onclick="openCvModal()"]').forEach(button => {
            button.title = siteContent.contact.cv.description;
        });
    }
    
    const logoContainer = document.querySelector('.w-10.h-10.bg-teal-custom.rounded-lg');
    if (logoContainer && siteContent.hero && siteContent.hero.avatar) {
        logoContainer.innerHTML = `
            <img src="${siteContent.hero.avatar.url}" alt="${siteContent.hero.avatar.alt}" 
                 class="w-full h-full object-cover rounded-lg">
        `;
    }
}

function updateHeroSection() {
    const hero = siteContent.hero;
    
    const heroTitle = document.querySelector('#home h1');
    if (heroTitle) {
        heroTitle.innerHTML = `${hero.greeting} <span class="text-teal-custom">${hero.name}</span>.<br>${hero.title}`;
    }
    
    const heroDesc = document.querySelector('#heroDescription');
    if (heroDesc) {
        heroDesc.textContent = hero.description;
    }
    
    const avatarContainer = document.querySelector('#home .relative.z-10');
    if (avatarContainer && hero.avatar) {
        avatarContainer.innerHTML = `
            <div class="w-80 h-80 mx-auto rounded-full overflow-hidden border-4 border-white dark:border-gray-700 shadow-lg">
                <img src="${hero.avatar.url}" alt="${hero.avatar.alt}" class="w-full h-full object-cover">
            </div>
        `;
    }
    
    const viewWorkBtn = document.querySelector('#home button.bg-sunny');
    if (viewWorkBtn) {
        viewWorkBtn.innerHTML = `${hero.buttons.viewWork}<svg class="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>`;
    }
    
    const githubBtn = document.querySelector('#home a[href*="github"]');
    if (githubBtn) {
        githubBtn.innerHTML = `<svg class="mr-2 w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>${hero.buttons.github}`;
    }
}

function updateProjectsSection() {
    const projects = siteContent.projects;
    
    // Update section title
    const sectionTitle = document.querySelector('#projects h2');
    if (sectionTitle) {
        sectionTitle.textContent = projects.title;
    }
    
    // Update section subtitle
    const sectionSubtitle = document.querySelector('#projects p.text-xl');
    if (sectionSubtitle) {
        sectionSubtitle.textContent = projects.subtitle;
    }
    
    // Update project items
    projects.items.forEach((project, index) => {
        const projectCard = document.querySelectorAll('#projects .card-hover')[index];
        if (projectCard) {
            const title = projectCard.querySelector('h3');
            const description = projectCard.querySelector('p.text-gray-600');
            const duration = projectCard.querySelector('p.text-sm');
            
            if (title) title.textContent = project.title;
            if (description) description.textContent = project.description;
            if (duration) duration.textContent = project.duration;
            
            // Update technologies
            const techContainer = projectCard.querySelector('.flex.flex-wrap.gap-2');
            if (techContainer) {
                techContainer.innerHTML = project.technologies.map(tech => 
                    `<span class="bg-teal-custom/10 text-teal-custom px-3 py-1 rounded-full text-sm">${tech}</span>`
                ).join('');
            }
        }
    });
}

// Update skills section content
function updateSkillsSection() {
    const skills = siteContent.skills;

}

// Update about section content
function updateAboutSection() {
    const about = siteContent.about;
    
    // Update section title
    const sectionTitle = document.querySelector('#about h2');
    if (sectionTitle) {
        sectionTitle.textContent = about.title;
    }
    
    // Update about me content
    const aboutMeContent = document.querySelector('#aboutMeContent');
    if (aboutMeContent) {
        aboutMeContent.innerHTML = about.sections[0].content.map(paragraph => 
            `<p>${paragraph}</p>`
        ).join('');
    }
    
    // Update education content
    const educationSections = document.querySelectorAll('#about .bg-white\\/80, #about .bg-white\\/80.dark\\:bg-gray-800\\/80');
    if (educationSections.length > 1) {
        const educationSection = educationSections[1];
        const title = educationSection.querySelector('h3');
        if (title) title.textContent = about.sections[1].name;
        
        const degree = educationSection.querySelector('h4');
        if (degree) degree.textContent = about.sections[1].degree;
        
        const school = educationSection.querySelector('p.font-medium');
        if (school) school.textContent = about.sections[1].school;
        
        const period = educationSection.querySelector('p.text-sm');
        if (period) period.textContent = about.sections[1].period;
        
        const description = educationSection.querySelector('p.text-gray-600.dark\\:text-gray-300:last-child');
        if (description) description.textContent = about.sections[1].description;
    }
}

// Update contact section content
function updateContactSection() {
    const contact = siteContent.contact;
    
    // Update section title
    const sectionTitle = document.querySelector('#contact h2');
    if (sectionTitle) {
        sectionTitle.textContent = contact.title;
    }
    
    // Update section subtitle
    const sectionSubtitle = document.querySelector('#contact p.text-xl');
    if (sectionSubtitle) {
        sectionSubtitle.textContent = contact.subtitle;
    }
    
    // Update contact methods
    contact.methods.forEach((method, index) => {
        const contactCard = document.querySelectorAll('#contact .bg-white')[index];
        if (contactCard) {
            const type = contactCard.querySelector('h3');
            const value = contactCard.querySelector('p, a');
            
            if (type) type.textContent = method.type;
            if (value) {
                if (method.url) {
                    value.href = method.url;
                    value.textContent = method.value;
                } else {
                    value.textContent = method.value;
                }
            }
        }
    });
    

}

// Update footer content
function updateFooter() {
    const footer = siteContent.footer;
    
    const copyright = document.querySelector('footer p');
    if (copyright) {
        copyright.textContent = footer.copyright;
    }
}

// Initialize content loading when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    loadContent();
});  