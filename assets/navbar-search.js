/**
 * Inline Navbar Search - Horizontal Expansion Functionality
 * Handles the expanding search animation within the navbar
 */

class NavbarSearch extends HTMLElement {
    constructor() {
      super();
      this.wrapper = this;
      this.input = this.querySelector('.navbar-search-input');
      this.toggle = this.querySelector('.navbar-search-toggle');
      this.form = this.querySelector('.navbar-search-form-inner');
      this.searchForm = this.querySelector('predictive-search, search-form');
      this.isExpanded = false;
      
      this.init();
    }
  
    init() {
      if (!this.wrapper || !this.input || !this.toggle) return;
      
      // Toggle button click handler
      this.toggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.toggleSearch();
      });
      
      // Form submission - don't interfere with search form
      this.form.addEventListener('submit', (e) => {
        if (!this.isExpanded) {
          e.preventDefault();
          this.expandSearch();
          this.input.focus();
        }
        // Let the form submit naturally if expanded and has input
      });
      
      // Input focus/blur handlers
      this.input.addEventListener('focus', () => {
        this.expandSearch();
      });
      
      // Input event to trigger expansion and let predictive search handle the rest
      this.input.addEventListener('input', (e) => {
        if (!this.isExpanded) {
          this.expandSearch();
        }
        // Don't interfere with predictive search - let it handle search naturally
      });
      
      // Click outside to close
      document.addEventListener('click', (e) => {
        if (!this.contains(e.target) && this.isExpanded) {
          this.collapseSearch();
        }
      });
      
      // Escape key to close
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.isExpanded) {
          this.collapseSearch();
        }
      });
      
      // Enter key in input
      this.input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && this.input.value.trim()) {
          this.form.submit();
        }
      });
    }
  
    toggleSearch() {
      if (this.isExpanded) {
        this.collapseSearch();
      } else {
        this.expandSearch();
      }
    }
  
    expandSearch() {
      if (this.isExpanded) return;
      
      this.isExpanded = true;
      this.wrapper.classList.add('expanding');
      this.wrapper.classList.add('expanded');
      this.wrapper.classList.remove('collapsing');
      
      // Focus input after animation starts
      setTimeout(() => {
        this.input.focus();
        this.wrapper.classList.remove('expanding');
      }, 100);
      
      // Update ARIA states for accessibility
      this.toggle.setAttribute('aria-expanded', 'true');
      this.input.setAttribute('aria-expanded', 'true');
    }
  
    collapseSearch() {
      if (!this.isExpanded) return;
      
      this.isExpanded = false;
      this.wrapper.classList.add('collapsing');
      this.wrapper.classList.remove('expanded');
      this.wrapper.classList.remove('expanding');
      
      // Clear input if no search was performed
      if (!this.input.value.trim()) {
        this.input.value = '';
      }
      
      // Remove collapsing class after animation
      setTimeout(() => {
        this.wrapper.classList.remove('collapsing');
      }, 300);
      
      // Update ARIA states
      this.toggle.setAttribute('aria-expanded', 'false');
      this.input.setAttribute('aria-expanded', 'false');
      
      // Remove focus
      this.input.blur();
    }
    
    // Removed triggerPredictiveSearch - let the native predictive search system handle it
  }
  
  // Initialize when DOM is loaded
  if (customElements.get('navbar-search') === undefined) {
    customElements.define('navbar-search', NavbarSearch);
  }
  
  // Fallback for older browsers or if custom elements aren't supported
  document.addEventListener('DOMContentLoaded', function() {
    const navbarSearchElements = document.querySelectorAll('.navbar-search-wrapper');
    
    navbarSearchElements.forEach(element => {
      if (!element.hasAttribute('data-initialized')) {
        const wrapper = element;
        const input = wrapper.querySelector('.navbar-search-input');
        const toggle = wrapper.querySelector('.navbar-search-toggle');
        const form = wrapper.querySelector('.navbar-search-form-inner');
        let isExpanded = false;
        
        if (!input || !toggle || !form) return;
        
        // Mark as initialized
        wrapper.setAttribute('data-initialized', 'true');
        
        // Toggle functionality
        const toggleSearch = () => {
          if (isExpanded) {
            collapseSearch();
          } else {
            expandSearch();
          }
        };
        
        const expandSearch = () => {
          if (isExpanded) return;
          isExpanded = true;
          wrapper.classList.add('expanding', 'expanded');
          wrapper.classList.remove('collapsing');
          
          setTimeout(() => {
            input.focus();
            wrapper.classList.remove('expanding');
          }, 100);
          
          toggle.setAttribute('aria-expanded', 'true');
          input.setAttribute('aria-expanded', 'true');
        };
        
        const collapseSearch = () => {
          if (!isExpanded) return;
          isExpanded = false;
          wrapper.classList.add('collapsing');
          wrapper.classList.remove('expanded', 'expanding');
          
          if (!input.value.trim()) {
            input.value = '';
          }
          
          setTimeout(() => {
            wrapper.classList.remove('collapsing');
          }, 300);
          
          toggle.setAttribute('aria-expanded', 'false');
          input.setAttribute('aria-expanded', 'false');
          input.blur();
        };
        
        // Event listeners
        toggle.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleSearch();
        });
        
        form.addEventListener('submit', (e) => {
          if (!isExpanded || !input.value.trim()) {
            e.preventDefault();
            expandSearch();
            input.focus();
          }
        });
        
        input.addEventListener('focus', expandSearch);
        
        input.addEventListener('input', (e) => {
          if (!isExpanded) {
            expandSearch();
          }
          // Let predictive search handle search functionality naturally
        });
        
        document.addEventListener('click', (e) => {
          if (!wrapper.contains(e.target) && isExpanded) {
            collapseSearch();
          }
        });
        
        document.addEventListener('keydown', (e) => {
          if (e.key === 'Escape' && isExpanded) {
            collapseSearch();
          }
        });
        
        input.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' && input.value.trim()) {
            form.submit();
          }
        });
      }
    });
  });