/**
 * Navigation Scripts
 * Handles smooth scrolling and active section detection
 */

(function() {
  'use strict';

  // Smooth scroll to sections
  function initSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');

        // Skip if href is just "#"
        if (href === '#') return;

        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();

          // Calculate offset for sticky headers
          const headerHeight = document.querySelector('.main-header')?.offsetHeight || 0;
          const sectionNavHeight = document.querySelector('.section-nav')?.offsetHeight || 0;
          const offset = headerHeight + sectionNavHeight + 20; // 20px extra padding

          const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  // Active section detection for unit pages
  function initActiveSectionDetection() {
    const sections = document.querySelectorAll('.unit-section');
    const navLinks = document.querySelectorAll('.section-nav-link');

    if (sections.length === 0 || navLinks.length === 0) return;

    const options = {
      root: null,
      rootMargin: '-100px 0px -70% 0px', // Trigger when section is near top
      threshold: 0
    };

    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute('id');

          // Remove active class from all links
          navLinks.forEach(link => link.classList.remove('active'));

          // Add active class to corresponding link
          const activeLink = document.querySelector(`.section-nav-link[href="#${sectionId}"]`);
          if (activeLink) {
            activeLink.classList.add('active');

            // Scroll nav into view if needed (for mobile horizontal scroll)
            activeLink.scrollIntoView({
              behavior: 'smooth',
              block: 'nearest',
              inline: 'center'
            });
          }
        }
      });
    }, options);

    sections.forEach(section => observer.observe(section));
  }

  // Add scroll effect to header
  function initHeaderScroll() {
    const header = document.querySelector('.main-header');
    if (!header) return;

    let lastScroll = 0;

    window.addEventListener('scroll', function() {
      const currentScroll = window.pageYOffset;

      // Add shadow when scrolled
      if (currentScroll > 10) {
        header.style.boxShadow = '0 4px 12px var(--color-shadow)';
      } else {
        header.style.boxShadow = 'var(--shadow-sm)';
      }

      lastScroll = currentScroll;
    });
  }

  // Initialize all navigation features when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      initSmoothScroll();
      initActiveSectionDetection();
      initHeaderScroll();
    });
  } else {
    initSmoothScroll();
    initActiveSectionDetection();
    initHeaderScroll();
  }
})();
