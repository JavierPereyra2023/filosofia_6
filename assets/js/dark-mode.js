/**
 * Dark Mode Toggle
 * Handles theme switching and persistence
 */

(function() {
  'use strict';

  // Get DOM elements
  const toggleButton = document.getElementById('dark-mode-toggle');
  const html = document.documentElement;

  // Icons (SVG paths)
  const sunIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  `;

  const moonIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
  `;

  // Get saved theme from localStorage or system preference
  function getSavedTheme() {
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme) {
      return savedTheme;
    }

    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }

    return 'light';
  }

  // Apply theme
  function applyTheme(theme) {
    if (theme === 'dark') {
      html.setAttribute('data-theme', 'dark');
      if (toggleButton) {
        toggleButton.innerHTML = sunIcon;
        toggleButton.setAttribute('aria-label', 'Cambiar a modo claro');
      }
    } else {
      html.removeAttribute('data-theme');
      if (toggleButton) {
        toggleButton.innerHTML = moonIcon;
        toggleButton.setAttribute('aria-label', 'Cambiar a modo oscuro');
      }
    }
  }

  // Toggle theme
  function toggleTheme() {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    applyTheme(newTheme);
    localStorage.setItem('theme', newTheme);

    // Dispatch custom event for other scripts
    window.dispatchEvent(new CustomEvent('themechange', {
      detail: { theme: newTheme }
    }));
  }

  // Initialize theme on page load (before content renders to avoid flash)
  const initialTheme = getSavedTheme();
  applyTheme(initialTheme);

  // Set up toggle button event listener when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      const button = document.getElementById('dark-mode-toggle');
      if (button) {
        button.addEventListener('click', toggleTheme);
      }
    });
  } else {
    if (toggleButton) {
      toggleButton.addEventListener('click', toggleTheme);
    }
  }

  // Listen for system theme changes
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
      // Only auto-switch if user hasn't manually set a preference
      if (!localStorage.getItem('theme')) {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    });
  }

  // Keyboard accessibility (Space or Enter to toggle)
  if (toggleButton) {
    toggleButton.addEventListener('keydown', function(e) {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        toggleTheme();
      }
    });
  }
})();
