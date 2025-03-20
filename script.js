document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Close mobile menu when clicking on a link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });
    
    // Animated Counter
    const counters = document.querySelectorAll('.counter');
    const speed = 200;
    
    function animateCounters() {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const increment = target / speed;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(animateCounters, 1);
            } else {
                counter.innerText = target;
            }
        });
    }
    
    // Initialize counters when they're visible
    const statsSection = document.querySelector('#stats');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                animateCounters();
                observer.unobserve(statsSection);
            }
        }, { threshold: 0.5 });
        
        observer.observe(statsSection);
    }
    
    // Nepali Date and Time
    function updateNepaliDateTime() {
        const now = new Date();
        
        // Nepali time
        const nepaliClock = document.getElementById('nepali-clock');
        if (nepaliClock) {
            const hours = now.getHours().toString().padStart(2, '0');
            const minutes = now.getMinutes().toString().padStart(2, '0');
            const seconds = now.getSeconds().toString().padStart(2, '0');
            nepaliClock.textContent = `${hours}:${minutes}:${seconds}`;
        }
        
        // Simple Nepali date conversion (approximation for demo purposes)
        // In a real application, you would use the nepali-date-picker library functions
        const nepaliDateElement = document.getElementById('nepali-date');
        if (nepaliDateElement) {
            const months = ['Baisakh', 'Jestha', 'Asadh', 'Shrawan', 'Bhadra', 'Ashwin', 
                           'Kartik', 'Mangsir', 'Poush', 'Magh', 'Falgun', 'Chaitra'];
            const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            
            // This is a simplified approximation - in a real app, use proper conversion
            const nepaliYear = now.getFullYear() + 56; // Rough conversion
            const nepaliMonth = months[now.getMonth()];
            const nepaliDay = now.getDate();
            const weekDay = days[now.getDay()];
            
            nepaliDateElement.textContent = `${weekDay}, ${nepaliDay} ${nepaliMonth} ${nepaliYear}`;
        }
    }
    
    // Update time every second
    updateNepaliDateTime();
    setInterval(updateNepaliDateTime, 1000);
    
    // Initialize Nepali Calendar if the library is loaded
    if (typeof NepaliFunctions !== 'undefined' && document.getElementById('nepaliCalendar')) {
        const calendarContainer = document.getElementById('nepaliCalendar');
        // Initialize the calendar with the library functions
        // This is a placeholder - you would use the actual library methods
        // NepaliFunctions.initializeCalendar(calendarContainer);
        
        // For demo purposes, just show a message that the calendar would be here
        calendarContainer.innerHTML = '<div style="padding: 20px; text-align: center;">Nepali Calendar would be displayed here using the nepali-datepicker library</div>';
    }
    
    // Form submission handler
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Show a success message (in a real app, you'd send this data to a server)
            alert('Thank you for contacting us! We will get back to you soon.');
            contactForm.reset();
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                
                window.scrollTo({
                    top: targetPosition - headerHeight,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Highlight active navigation item based on scroll position
    function highlightNavOnScroll() {
        const sections = document.querySelectorAll('section');
        const navItems = document.querySelectorAll('.nav-links a');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const headerHeight = document.querySelector('header').offsetHeight;
            
            if (window.pageYOffset >= sectionTop - headerHeight - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavOnScroll);
    highlightNavOnScroll(); // Initialize on page load
});
