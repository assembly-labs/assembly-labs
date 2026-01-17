'use strict';

/**
 * Assembly Labs - Main JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    // Cache DOM elements
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const heroGradient = document.querySelector('.hero-gradient');
    const revealElements = document.querySelectorAll('.reveal');
    const staggerElements = document.querySelectorAll('.reveal-stagger');
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    const navLinks = document.querySelectorAll('.nav-link');

    /**
     * Navbar scroll effect
     * Adds frosted glass effect when scrolled
     */
    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    /**
     * Mobile navigation toggle
     */
    function toggleMobileNav() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    }

    /**
     * Close mobile menu
     */
    function closeMobileNav() {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }

    /**
     * Smooth scroll to anchor
     */
    function smoothScrollToAnchor(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);

        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }

        // Close mobile menu if open
        closeMobileNav();
    }

    /**
     * Parallax effect for hero gradient
     */
    function handleParallax() {
        if (window.innerWidth > 768 && heroGradient) {
            const scrolled = window.scrollY;
            const rate = scrolled * 0.3;
            heroGradient.style.transform = `translateY(${rate}px)`;
        }
    }

    /**
     * Intersection Observer for reveal animations
     */
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    /**
     * Intersection Observer for staggered reveal animations
     */
    const staggerObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                const parent = entry.target.parentElement;
                const siblings = parent.querySelectorAll('.reveal-stagger');

                siblings.forEach(function(sibling, i) {
                    setTimeout(function() {
                        sibling.classList.add('visible');
                    }, i * 100);
                });

                // Stop observing all siblings
                siblings.forEach(function(sibling) {
                    staggerObserver.unobserve(sibling);
                });
            }
        });
    }, observerOptions);

    // Event Listeners
    window.addEventListener('scroll', handleNavbarScroll);
    window.addEventListener('scroll', handleParallax);

    if (navToggle) {
        navToggle.addEventListener('click', toggleMobileNav);
    }

    navLinks.forEach(function(link) {
        link.addEventListener('click', closeMobileNav);
    });

    anchorLinks.forEach(function(anchor) {
        anchor.addEventListener('click', smoothScrollToAnchor);
    });

    // Initialize observers
    revealElements.forEach(function(el) {
        revealObserver.observe(el);
    });

    staggerElements.forEach(function(el) {
        staggerObserver.observe(el);
    });

    // Initial navbar state check
    handleNavbarScroll();
});
