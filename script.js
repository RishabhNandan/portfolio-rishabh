// ==========================================================================
// Rishabh Nandan Portfolio Interactive Script
// ==========================================================================

document.addEventListener("DOMContentLoaded", function () {
    // ----------------------------------------------------------------------
    // 1. Typewriter Effect for Hero Terminal
    // ----------------------------------------------------------------------
    const techSkills = [
        "Data Science & Machine Learning...",
        "Full-Stack Web Development...",
        "SQL & Relational Databases...",
        "Statistical Analytics & BI...",
        "Predictive Modeling & Scikit-Learn...",
        "Data Insights & Visual Storytelling..."
    ];

    let skillIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typeSpeed = 80;
    const deleteSpeed = 40;
    const delayBetweenSkills = 2200;

    function typeWriter() {
        const typedTextElement = document.getElementById("typewriter");
        if (!typedTextElement) return;

        const currentSkill = techSkills[skillIndex];

        if (isDeleting) {
            typedTextElement.textContent = currentSkill.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typedTextElement.textContent = currentSkill.substring(0, charIndex + 1);
            charIndex++;
        }

        let timeOut = isDeleting ? deleteSpeed : typeSpeed;

        if (!isDeleting && charIndex === currentSkill.length) {
            timeOut = delayBetweenSkills;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            skillIndex = (skillIndex + 1) % techSkills.length;
            timeOut = 400;
        }

        setTimeout(typeWriter, timeOut);
    }

    setTimeout(typeWriter, 1000);

    // ----------------------------------------------------------------------
    // 2. Mobile Navbar Toggle
    // ----------------------------------------------------------------------
    const mobileToggle = document.getElementById("mobileToggle");
    const navLinks = document.getElementById("navLinks");

    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener("click", () => {
            navLinks.classList.toggle("active");
            const icon = mobileToggle.querySelector("i");
            if (icon) {
                icon.classList.toggle("fa-bars");
                icon.classList.toggle("fa-times");
            }
        });

        // Close nav menu when clicking a link
        navLinks.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("active");
                const icon = mobileToggle.querySelector("i");
                if (icon) {
                    icon.classList.add("fa-bars");
                    icon.classList.remove("fa-times");
                }
            });
        });
    }

    // ----------------------------------------------------------------------
    // 3. Navbar Sticky & Scroll active highlight
    // ----------------------------------------------------------------------
    const navbar = document.getElementById("navbar");
    const sections = document.querySelectorAll("section");
    const navItems = document.querySelectorAll(".nav-links a");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }

        let currentSection = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute("id");
            }
        });

        navItems.forEach(item => {
            item.classList.remove("active");
            if (item.getAttribute("href") === `#${currentSection}`) {
                item.classList.add("active");
            }
        });
    });

    // ----------------------------------------------------------------------
    // 4. Project Filtering
    // ----------------------------------------------------------------------
    const filterBtns = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card");

    filterBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            filterBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const filter = btn.getAttribute("data-filter");

            projectCards.forEach(card => {
                const categories = card.getAttribute("data-category");
                if (filter === "all" || (categories && categories.includes(filter))) {
                    card.style.display = "flex";
                } else {
                    card.style.display = "none";
                }
            });
        });
    });

    // ----------------------------------------------------------------------
    // 5. Project Detail Modal Data & Logic
    // ----------------------------------------------------------------------
    const projectsData = {
        shanti: {
            title: "Shanti Neuro Clinic – Hospital & Patient Management System",
            category: "Full-Stack Web & Healthcare Management",
            desc: "Full-stack medical application built to streamline clinic operations, patient records, prescription management, and clinical recommendations.",
            features: [
                "Role-Based Access Control (RBAC) for Admin, Doctors, and Staff.",
                "Patient medical history tracking and visit documentation.",
                "AI-assisted clinical prescription & recommendation engine.",
                "PDF invoice and prescription generation using jsPDF & HTML2Canvas.",
                "Audit logs tracking system activities and database operations."
            ],
            tags: ["Next.js 16", "TypeScript", "Prisma ORM", "PostgreSQL", "Tailwind CSS", "BCrypt"],
            github: "https://github.com/RishabhNandan/shanti-neuro-clinic",
            demo: "#"
        },
        aadhaar: {
            title: "Aadhaar Accessibility & Inclusion Analytics",
            category: "Frontend & Data Visualization",
            desc: "Comprehensive web dashboard analyzing accessibility metrics and digital inclusion statistics across regional Aadhaar enrollment infrastructure.",
            features: [
                "Interactive regional demographic filters and accessibility scoring.",
                "Real-time visual charts representing biometric capture rates.",
                "Responsive mobile-first layout designed for field policy auditors."
            ],
            tags: ["React", "Data Visualization", "Frontend", "Tailwind CSS"],
            github: "https://github.com/rishabhnandan/aadhaar-accessibility-analytics",
            demo: "https://aadhaar-analytics-demo.vercel.app"
        },
        student: {
            title: "Predictive Analysis of Student Academic Performance",
            category: "Data Science & Machine Learning",
            desc: "Machine learning research project using Python to analyze student attendance, test scores, and socio-academic factors to forecast academic success.",
            features: [
                "Built predictive models using Random Forest & Logistic Regression algorithms.",
                "Achieved an overall predictive accuracy of 85% on validation dataset.",
                "Identified key attendance thresholds strongly correlated with pass rates."
            ],
            tags: ["Python", "Scikit-Learn", "Pandas", "NumPy", "Matplotlib"],
            github: "https://github.com/rishabhnandan/student-performance-predictor",
            demo: "#"
        },
        sales: {
            title: "Interactive Retail Sales Dashboard",
            category: "Business Intelligence & Tableau",
            desc: "Interactive business intelligence dashboard engineered in Tableau to analyze multi-region retail sales metrics and performance KPIs.",
            features: [
                "Cross-filtering by region, product category, and temporal trends.",
                "Sales forecasting and profit margin breakdown visuals.",
                "Automated data cleaning and SQL data modeling."
            ],
            tags: ["Tableau", "SQL", "Data Modeling", "Business Intelligence"],
            github: "#",
            demo: "https://public.tableau.com/app/profile/rishabh.nandan"
        },
        cmp: {
            title: "CMP Degree College ICT Admission & Data Portal",
            category: "Data Analytics & Campus Workflows",
            desc: "Automated student admission data workflow and administrative system managing ICT operations at CMP Degree College.",
            features: [
                "Validation and cleaning of student application records.",
                "Database workflow automation reducing manual admission processing time.",
                "Daily metrics generation for admission authority reporting."
            ],
            tags: ["Python", "SQL", "Data Processing", "Excel Automation"],
            github: "#",
            demo: "#"
        },
        portal: {
            title: "Data Visualization & Analysis Portal",
            category: "Analytics & Web Dashboard",
            desc: "Unified data portal integrating disparate data feeds into interactive dashboards with custom export capabilities.",
            features: [
                "Integrated multi-source data feeds.",
                "Dynamic interactive charts and metrics summary.",
                "Export options for executive summaries."
            ],
            tags: ["Python", "Power BI", "Tableau", "Data Analytics"],
            github: "https://github.com/rishabhnandan/data-insights-portal",
            demo: "#"
        }
    };

    const projectModal = document.getElementById("projectModal");
    const modalClose = document.getElementById("modalClose");
    const modalTitle = document.getElementById("modalTitle");
    const modalCategory = document.getElementById("modalCategory");
    const modalDesc = document.getElementById("modalDesc");
    const modalFeatures = document.getElementById("modalFeatures");
    const modalTags = document.getElementById("modalTags");
    const modalGithub = document.getElementById("modalGithub");
    const modalDemo = document.getElementById("modalDemo");

    document.querySelectorAll(".view-details-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            const projectId = btn.getAttribute("data-project");
            const data = projectsData[projectId];

            if (data && projectModal) {
                modalTitle.textContent = data.title;
                modalCategory.textContent = data.category;
                modalDesc.textContent = data.desc;

                modalFeatures.innerHTML = data.features.map(f => `<li>${f}</li>`).join("");
                modalTags.innerHTML = data.tags.map(t => `<span class="tech-tag">${t}</span>`).join("");

                modalGithub.href = data.github;
                if (data.github === "#") {
                    modalGithub.style.display = "none";
                } else {
                    modalGithub.style.display = "inline-flex";
                }

                modalDemo.href = data.demo;
                if (data.demo === "#") {
                    modalDemo.style.display = "none";
                } else {
                    modalDemo.style.display = "inline-flex";
                }

                projectModal.classList.add("open");
            }
        });
    });

    if (modalClose && projectModal) {
        modalClose.addEventListener("click", () => {
            projectModal.classList.remove("open");
        });

        projectModal.addEventListener("click", (e) => {
            if (e.target === projectModal) {
                projectModal.classList.remove("open");
            }
        });
    }
});
