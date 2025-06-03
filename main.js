document.addEventListener("DOMContentLoaded", function() {
    // Custom cursor
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        setTimeout(function() {
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        }, 100);
    });
    
    document.addEventListener('mouseenter', function() {
        cursor.style.opacity = 1;
        cursorFollower.style.opacity = 1;
    });
    
    document.addEventListener('mouseleave', function() {
        cursor.style.opacity = 0;
        cursorFollower.style.opacity = 0;
    });
    
    // Sticky navbar
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('click', function() {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Typewriter effect
    const typedTextElement = document.getElementById('typed-text');
    const textArray = [
        "Web and Software Developer",
        "Python and Django Developer",
        "AI and Machine Learning Enthusiast"
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingDelay = 200;
    
    function type() {
        const currentText = textArray[textIndex];
        
        if (isDeleting) {
            typedTextElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typedTextElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            typingDelay = 1000; // Pause at end of word
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % textArray.length;
            typingDelay = 200;
        }
        
        setTimeout(type, isDeleting ? 100 : typingDelay);
    }
    
    setTimeout(type, 1000);
    
    // Scroll reveal animation
    function revealOnScroll() {
        const elements = document.querySelectorAll('.section');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('fade-in');
            }
        });
    }
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check
    

    
    console.log("Portfolio loaded successfully!");
});
// Dark Mode Toggle Functionality
document.addEventListener("DOMContentLoaded", function() {
    // Add dark mode toggle to the navigation
    const navLinks = document.querySelector('.nav-links');
    const themeSwitch = document.createElement('div');
    themeSwitch.className = 'theme-switch-wrapper';
    themeSwitch.innerHTML = `
        <i class="fas fa-moon theme-icon"></i>
        <label class="theme-switch">
            <input type="checkbox" id="theme-toggle">
            <span class="slider"></span>
        </label>
    `;
    
    // Insert the toggle before the first nav link
    navLinks.insertBefore(themeSwitch, navLinks.firstChild);
    
    const themeToggle = document.getElementById('theme-toggle');
    
    // Check for saved theme preference or use preferred color scheme
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
    const currentTheme = localStorage.getItem("theme");
    
    if (currentTheme === "dark") {
        document.documentElement.setAttribute("data-theme", "dark");
        themeToggle.checked = true;
        updateThemeIcon(true);
    } else if (currentTheme === "light") {
        document.documentElement.setAttribute("data-theme", "light");
        themeToggle.checked = false;
        updateThemeIcon(false);
    } else if (prefersDarkScheme.matches) {
        document.documentElement.setAttribute("data-theme", "dark");
        themeToggle.checked = true;
        updateThemeIcon(true);
    }
    
    // Listen for toggle changes
    themeToggle.addEventListener("change", function(e) {
        if (e.target.checked) {
            document.documentElement.setAttribute("data-theme", "dark");
            localStorage.setItem("theme", "dark");
            updateThemeIcon(true);
        } else {
            document.documentElement.setAttribute("data-theme", "light");
            localStorage.setItem("theme", "light");
            updateThemeIcon(false);
        }
    });
    
    // Update moon/sun icon based on theme
    function updateThemeIcon(isDark) {
        const themeIcon = document.querySelector('.theme-icon');
        if (isDark) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
    }
    
    // Add toggle for mobile view
    const mobileThemeSwitch = themeSwitch.cloneNode(true);
    mobileThemeSwitch.classList.add('mobile-theme-switch');
    
    // Style for mobile theme switch
    const style = document.createElement('style');
    style.textContent = `
        .mobile-theme-switch {
            display: none;
        }
        
        @media screen and (max-width: 768px) {
            .nav-links .theme-switch-wrapper {
                display: none;
            }
            
            .mobile-theme-switch {
                display: flex;
                position: absolute;
                top: 15px;
                right: 70px;
            }
        }
    `;
    document.head.appendChild(style);
    
    document.querySelector('.navbar .container').appendChild(mobileThemeSwitch);
    
    // Sync both toggles
    const mobileToggle = mobileThemeSwitch.querySelector('input');
    mobileToggle.checked = themeToggle.checked;
    
    mobileToggle.addEventListener("change", function(e) {
        themeToggle.checked = e.target.checked;
        themeToggle.dispatchEvent(new Event('change'));
    });
    
    themeToggle.addEventListener("change", function(e) {
        mobileToggle.checked = e.target.checked;
    });
});