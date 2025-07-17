document.addEventListener('DOMContentLoaded', function() {
  const dropdownItems = document.querySelectorAll('.nav-item.dropdown');
  
  dropdownItems.forEach(function(dropdown) {
    const dropdownToggle = dropdown.querySelector('.dropdown-toggle');
    const megaMenu = dropdown.querySelector('.mega-menu');
    let hoverTimeout;
    
    // Show mega menu on hover
    dropdown.addEventListener('mouseenter', function() {
      clearTimeout(hoverTimeout);
      
      // Hide all other mega menus
      document.querySelectorAll('.mega-menu').forEach(menu => {
        if (menu !== megaMenu) {
          menu.classList.remove('show');
        }
      });
      
      // Show current mega menu
      if (megaMenu) {
        megaMenu.classList.add('show');
      }
    });
    
    // Hide mega menu on mouse leave with delay
    dropdown.addEventListener('mouseleave', function() {
      hoverTimeout = setTimeout(() => {
        if (megaMenu) {
          megaMenu.classList.remove('show');
        }
      }, 150);
    });
    
    // Keep mega menu open when hovering over it
    if (megaMenu) {
      megaMenu.addEventListener('mouseenter', function() {
        clearTimeout(hoverTimeout);
      });
      
      megaMenu.addEventListener('mouseleave', function() {
        megaMenu.classList.remove('show');
      });
    }

    // Sidebar navigation functionality (per mega menu)
    const sidebarTitles = megaMenu ? megaMenu.querySelectorAll('.sidebar-title') : [];
    const contentSections = megaMenu ? megaMenu.querySelectorAll('.content-section') : [];
    sidebarTitles.forEach(function(title) {
      title.addEventListener('mouseenter', function() {
        const targetSection = this.dataset.section;
        // Remove active class from all sidebar titles
        sidebarTitles.forEach(t => t.classList.remove('active'));
        // Add active class to hovered title
        this.classList.add('active');
        // Hide all content sections
        contentSections.forEach(section => {
          section.style.display = 'none';
        });
        // Show target content section
        const targetContent = megaMenu.querySelector('#' + targetSection + '-content');
        if (targetContent) {
          targetContent.style.display = 'block';
        }
      });
    });
  });
  
  // Close mega menus when clicking outside
  document.addEventListener('click', function(event) {
    if (!event.target.closest('.nav-item.dropdown')) {
      document.querySelectorAll('.mega-menu').forEach(menu => {
        menu.classList.remove('show');
      });
    }
  });
  
  // Mobile menu handling
  if (window.innerWidth <= 991) {
    dropdownItems.forEach(function(dropdown) {
      const dropdownToggle = dropdown.querySelector('.dropdown-toggle');
      const megaMenu = dropdown.querySelector('.mega-menu');
      
      dropdownToggle.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Toggle current mega menu
        if (megaMenu) {
          megaMenu.classList.toggle('show');
        }
        
        // Close other mega menus
        document.querySelectorAll('.mega-menu').forEach(menu => {
          if (menu !== megaMenu) {
            menu.classList.remove('show');
          }
        });
      });
    });
  }
}); 