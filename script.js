document.addEventListener('DOMContentLoaded', () => {
    // === Typing Effect for Hero Subtitle ===
    // This creates a dynamic typing and deleting animation for a list of phrases.
    const phrases = [
        "intelligent systems.",
        "Artificial Intelligence.",
        "Machine Learning.",
        "Python Development.",
        "Data Engineering.",
        "Neural Networks."
    ];

    const typingElement = document.querySelector('.hero__subtitle');
    let cursorElement = document.querySelector('.typing-cursor');

    // Ensure the cursor element exists and is appended only once.
    // This prevents issues if the script runs multiple times (e.g., during live server reloads).
    if (!cursorElement) {
        cursorElement = document.createElement('span');
        cursorElement.className = 'typing-cursor';
    }

    // Clear any initial text and append the cursor to ensure a clean start for the animation.
    typingElement.textContent = '';
    typingElement.appendChild(cursorElement);

    let currentPhraseIndex = 0; // Index of the current phrase in the 'phrases' array
    let currentLetterIndex = 0; // Index of the current letter being typed/deleted
    let isDeleting = false;     // Flag to determine if the animation is typing or deleting

    function typeWriter() {
        const fullPhrase = phrases[currentPhraseIndex];
        let currentDisplayedText = '';

        if (isDeleting) {
            // If deleting, reduce the letter index and get a substring.
            currentLetterIndex--;
            currentDisplayedText = fullPhrase.substring(0, currentLetterIndex);
        } else {
            // If typing, increase the letter index and get a substring.
            currentLetterIndex++;
            currentDisplayedText = fullPhrase.substring(0, currentLetterIndex);
        }

        // Update the text content of the element.
        typingElement.textContent = currentDisplayedText;

        // Re-append the cursor after updating text content. This is crucial
        // to ensure the cursor stays at the end of the text and prevents layout jumps.
        if (!typingElement.contains(cursorElement)) {
            typingElement.appendChild(cursorElement);
        }

        let delayTime = 100; // Default speed for typing

        if (!isDeleting && currentLetterIndex === fullPhrase.length) {
            // If finished typing a phrase, pause, then switch to deleting mode.
            isDeleting = true;
            delayTime = 1500; // Pause duration after typing a full phrase
        } else if (isDeleting && currentLetterIndex < 0) {
            // If finished deleting a phrase, switch to typing mode for the next phrase.
            isDeleting = false;
            currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length; // Cycle to the next phrase
            delayTime = 500; // Pause duration after deleting a full phrase
            currentLetterIndex = 0; // Reset letter index for the new phrase
        } else if (isDeleting) {
            // Faster speed for deleting characters.
            delayTime = 40;
        }

        // Schedule the next iteration of the typeWriter function.
        setTimeout(typeWriter, delayTime);
    }

    // Start the typing effect after an initial delay to allow page load.
    setTimeout(typeWriter, 1000);

    // === Mobile Menu Toggle ===
    // Handles the click event for the hamburger icon to open/close the mobile navigation menu.
    const hamburger = document.querySelector('.navbar__hamburger');
    const menu = document.querySelector('.navbar__menu');
    // Select all clickable links within the mobile menu.
    const navLinks = document.querySelectorAll('.navbar__menu .navbar__link, .navbar__menu .navbar__resume');

    hamburger.addEventListener('click', () => {
        // Toggle 'active' class on both hamburger and menu for animation and visibility.
        hamburger.classList.toggle('active');
        menu.classList.toggle('active');
    });

    // Close the mobile menu when any navigation link is clicked.
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            menu.classList.remove('active');
        });
    });

    // === Smooth Scrolling for Anchor Links ===
    // Implements smooth scrolling behavior when clicking on internal navigation links.
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default jump behavior.
            const targetId = this.getAttribute('href'); // Get the target section ID.
            const targetElement = document.querySelector(targetId);
            
            // Calculate offset for fixed navbar to ensure content isn't hidden behind it.
            const headerOffset = document.querySelector('.navbar').offsetHeight;
            const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - headerOffset;

            // Scroll smoothly to the calculated position.
            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        });
    });

    // === Navbar Appearance Change on Scroll ===
    // Adds a 'scrolled' class to the navbar when the user scrolls down,
    // allowing CSS to apply different styles (e.g., background opacity, shadow).
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        // Add 'scrolled' class if scroll position is beyond 80px from the top.
        if (window.scrollY > 80) {
            navbar.classList.add('scrolled');
        } else {
            // Remove 'scrolled' class if scrolled back to the top.
            navbar.classList.remove('scrolled');
        }
    });

    // === Scroll Reveal Animations ===
    // Uses Intersection Observer API to detect when elements enter the viewport
    // and applies an 'is-visible' class to trigger CSS animations.
    const scrollElements = document.querySelectorAll('.section, .content__box, .project__card, .hero__image-container, .about__image');

    const observerOptions = {
        root: null,      // The viewport is the root.
        rootMargin: '0px', // No margin around the root.
        threshold: 0.1   // Trigger when 10% of the element is visible.
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // If the element is intersecting the viewport, add 'is-visible' class.
                entry.target.classList.add('is-visible');
                // Stop observing the element once it's visible to prevent re-triggering.
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply the 'scroll-reveal' class to all observed elements
    // and start observing them.
    scrollElements.forEach(el => {
        el.classList.add('scroll-reveal'); // Base class for initial hidden state.
        scrollObserver.observe(el);
    });

    // === Staggered Animation for Skill List Items ===
    // Adds a custom CSS variable '--delay' to each skill list item,
    // allowing for a staggered animation effect using CSS.
    const skillListItems = document.querySelectorAll('.skills__column li');
    skillListItems.forEach((item, index) => {
        // Set a CSS custom property for animation-delay, creating a staggered effect.
        item.style.setProperty('--delay', `${index * 0.05}s`);
        // Add a base class that CSS can use to apply the staggered animation.
        item.classList.add('skill-item-reveal');
    });
});
