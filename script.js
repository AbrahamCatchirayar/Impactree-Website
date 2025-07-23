document.addEventListener('DOMContentLoaded', function() {
    const dropdownItems = document.querySelectorAll('.nav-item.dropdown');
    dropdownItems.forEach(function(dropdown) {
      const dropdownToggle = dropdown.querySelector('.dropdown-toggle');
      const megaMenu = dropdown.querySelector('.mega-menu');
      let hoverTimeout;
      dropdown.addEventListener('mouseenter', function() {
        clearTimeout(hoverTimeout);
        document.querySelectorAll('.mega-menu').forEach(menu => {
          if (menu !== megaMenu) {
            menu.classList.remove('show');
          }
        });
        if (megaMenu) {
          megaMenu.classList.add('show');
        }
      });
      dropdown.addEventListener('mouseleave', function() {
        hoverTimeout = setTimeout(() => {
          if (megaMenu) {
            megaMenu.classList.remove('show');
          }
        }, 150);
      });
      if (megaMenu) {
        megaMenu.addEventListener('mouseenter', function() {
          clearTimeout(hoverTimeout);
        });
        megaMenu.addEventListener('mouseleave', function() {
          megaMenu.classList.remove('show');
        });
      }
    });
    
    document.addEventListener('click', function(event) {
      if (!event.target.closest('.nav-item.dropdown')) {
        document.querySelectorAll('.mega-menu').forEach(menu => {
          menu.classList.remove('show');
        });
      }
    });
    
    if (window.innerWidth <= 991) {
      dropdownItems.forEach(function(dropdown) {
        const dropdownToggle = dropdown.querySelector('.nav-link');
        const megaMenu = dropdown.querySelector('.mega-menu');
        dropdownToggle.addEventListener('click', function(e) {
          e.preventDefault();
          // Toggle this menu
          const isOpen = dropdown.classList.contains('open');
          // Close all other menus
          document.querySelectorAll('.nav-item.dropdown').forEach(item => {
            item.classList.remove('open');
            const menu = item.querySelector('.mega-menu');
            if (menu) menu.classList.remove('show');
          });
          // Toggle this one
          if (!isOpen) {
            dropdown.classList.add('open');
            if (megaMenu) megaMenu.classList.add('show');
          }
        });
        // Sidebar accordion logic for mobile
        if (megaMenu) {
          const sidebarTitles = megaMenu.querySelectorAll('.sidebar-title');
          const contentSections = megaMenu.querySelectorAll('.content-section');
          sidebarTitles.forEach(function(title) {
            title.addEventListener('click', function(e) {
              e.preventDefault();
              const targetSection = this.dataset.section;
              const isActive = this.classList.contains('active');
              // Collapse all
              sidebarTitles.forEach(t => t.classList.remove('active'));
              contentSections.forEach(section => {
                section.style.display = 'none';
              });
              // Expand if not already active
              if (!isActive) {
                this.classList.add('active');
                const targetContent = megaMenu.querySelector('#' + targetSection + '-content');
                if (targetContent) {
                  targetContent.style.display = 'block';
                }
              }
            });
          });
        }
      });
    } else {
      // Desktop hover logic for sidebar
      dropdownItems.forEach(function(dropdown) {
        const megaMenu = dropdown.querySelector('.mega-menu');
        const sidebarTitles = megaMenu ? megaMenu.querySelectorAll('.sidebar-title') : [];
        const contentSections = megaMenu ? megaMenu.querySelectorAll('.content-section') : [];
        sidebarTitles.forEach(function(title) {
          title.addEventListener('mouseenter', function() {
            const targetSection = this.dataset.section;
            sidebarTitles.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            contentSections.forEach(section => {
              section.style.display = 'none';
            });
            const targetContent = megaMenu.querySelector('#' + targetSection + '-content');
            if (targetContent) {
              targetContent.style.display = 'block';
            }
          });
        });
      });
    }
    
    // Animate stats on scroll
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animationDelay = entry.target.dataset.delay || '0s';
          entry.target.style.animationPlayState = 'running';
        }
      });
    }, observerOptions);
    
    document.querySelectorAll('.stat-item').forEach((item, index) => {
      item.dataset.delay = `${index * 0.2}s`;
      observer.observe(item);
    });
    
    // Add smooth scroll behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
    
    // Add parallax effect to floating elements
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const parallaxElements = document.querySelectorAll('.floating-element');
      
      parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        element.style.transform = `translateY(${scrolled * speed}px)`;
      });
    });
  });