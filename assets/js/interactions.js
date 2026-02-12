/**
 * General Interactions
 * Handles card animations and other UI enhancements
 */

(function() {
  'use strict';

  // Add loading class removal after page load
  window.addEventListener('load', function() {
    document.body.classList.add('loaded');
  });

  // Lazy load images
  function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');

    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            observer.unobserve(img);
          }
        });
      });

      images.forEach(img => imageObserver.observe(img));
    } else {
      // Fallback for browsers without IntersectionObserver
      images.forEach(img => {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
      });
    }
  }

  // Add animation to elements when they enter viewport
  function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in-up');

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      });

      animatedElements.forEach(el => observer.observe(el));
    }
  }

  // Handle external links (open in new tab with security)
  function initExternalLinks() {
    const links = document.querySelectorAll('a[href^="http"]');

    links.forEach(link => {
      if (link.hostname !== window.location.hostname) {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
      }
    });
  }

  // Copy code blocks (if any)
  function initCodeCopy() {
    const codeBlocks = document.querySelectorAll('pre code');

    codeBlocks.forEach(block => {
      const button = document.createElement('button');
      button.className = 'copy-code-btn';
      button.textContent = 'Copiar';
      button.setAttribute('aria-label', 'Copiar código');

      button.addEventListener('click', function() {
        const code = block.textContent;
        navigator.clipboard.writeText(code).then(() => {
          button.textContent = '¡Copiado!';
          setTimeout(() => {
            button.textContent = 'Copiar';
          }, 2000);
        });
      });

      block.parentElement.style.position = 'relative';
      block.parentElement.appendChild(button);
    });
  }

  // Add focus visible class for keyboard navigation
  function initFocusVisible() {
    let isUsingKeyboard = false;

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Tab') {
        isUsingKeyboard = true;
        document.body.classList.add('keyboard-nav');
      }
    });

    document.addEventListener('mousedown', function() {
      isUsingKeyboard = false;
      document.body.classList.remove('keyboard-nav');
    });
  }

  // Initialize all interactions when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      initLazyLoading();
      initScrollAnimations();
      initExternalLinks();
      initCodeCopy();
      initFocusVisible();
    });
  } else {
    initLazyLoading();
    initScrollAnimations();
    initExternalLinks();
    initCodeCopy();
    initFocusVisible();
  }
})();
