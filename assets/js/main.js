(function() {
  "use strict";

  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  new PureCounter();

  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

  const menuBtn = document.querySelector('.menu-btn');
  const navItems = document.querySelector('.nav-items');

  menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('active');
    navItems.classList.toggle('active');
  });
  const videoItems = document.querySelectorAll('.video-item');
  const videoContainers = document.querySelectorAll('.video-container .video');
  
  videoItems.forEach(item => {
      item.addEventListener('click', () => {
          // Remove active class from all video items
          videoItems.forEach(i => i.classList.remove('active'));
          // Add active class to the clicked video item
          item.classList.add('active');
  
          // Get the platform of the clicked video item
          const platform = item.dataset.platform;
  
          // Show the corresponding video container
          videoContainers.forEach(container => {
              if (container.classList.contains(platform + '-video')) {
                  container.classList.add('active');
              } else {
                  container.classList.remove('active');
              }
          });
      });
  });
  
  // Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', () => {
    
  // 1. Mobile Menu Toggle Functionality
  const menuBtn = document.querySelector('.menu-btn');
  const navItems = document.querySelector('.nav-items');
  
  menuBtn.addEventListener('click', () => {
      menuBtn.classList.toggle('open');
      navItems.classList.toggle('open');
  });

  // 2. Video Platform Toggle (YouTube <-> TikTok)
  const videoItems = document.querySelectorAll('.video-item');
  const youtubeVideo = document.querySelector('.youtube-video');
  const tiktokVideo = document.querySelector('.tiktok-video');

  videoItems.forEach((item) => {
      item.addEventListener('click', () => {
          // Remove active class from all video items
          videoItems.forEach((el) => el.classList.remove('active'));

          // Add active class to clicked item
          item.classList.add('active');

          // Switch between YouTube and TikTok videos
          if (item.dataset.platform === 'youtube') {
              youtubeVideo.classList.add('active');
              tiktokVideo.classList.remove('active');
          } else if (item.dataset.platform === 'tiktok') {
              youtubeVideo.classList.remove('active');
              tiktokVideo.classList.add('active');
          }
      });
  });

  // 3. Smooth Scroll Functionality for navigation links
  const navLinks = document.querySelectorAll('nav a');

  navLinks.forEach((link) => {
      link.addEventListener('click', (e) => {
          e.preventDefault();
          const targetId = link.getAttribute('href');
          const targetElement = document.querySelector(targetId);

          // Scroll smoothly to the target section
          targetElement.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
          });
      });
  });

  // 4. Optional: Dark Mode Toggle (if needed)
  const darkModeToggle = document.querySelector('#dark-mode-toggle');
  const body = document.body;

  if (darkModeToggle) {
      darkModeToggle.addEventListener('click', () => {
          body.classList.toggle('dark-mode');

          // Save dark mode preference in localStorage
          const darkMode = body.classList.contains('dark-mode');
          localStorage.setItem('darkMode', darkMode ? 'enabled' : 'disabled');
      });

      // Load dark mode preference from localStorage
      const darkModeSetting = localStorage.getItem('darkMode');
      if (darkModeSetting === 'enabled') {
          body.classList.add('dark-mode');
      }
  }
});
})();
