(function() {
  "use strict";

  document.addEventListener('DOMContentLoaded', () => {
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

    if (mobileNavToggleBtn) {
      mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
    }

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

    if (scrollTop) {
      scrollTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }

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

    if (menuBtn && navItems) {
      menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('active');
        navItems.classList.toggle('active');
      });
    }

    const videoItems = document.querySelectorAll('.video-item');
    const videoContainers = document.querySelectorAll('.video-container .video');
    
    videoItems.forEach(item => {
      item.addEventListener('click', () => {
        videoItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
    
        const platform = item.dataset.platform;
    
        videoContainers.forEach(container => {
          if (container.classList.contains(platform + '-video')) {
            container.classList.add('active');
          } else {
            container.classList.remove('active');
          }
        });
      });
    });
    
    // Mobile Menu Toggle Functionality
    const mobileMenuBtn = document.querySelector('.menu-btn');
    const mobileNavItems = document.querySelector('.nav-items');
    
    if (mobileMenuBtn && mobileNavItems) {
      mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('open');
        mobileNavItems.classList.toggle('open');
      });
    }

    // Video Platform Toggle (YouTube <-> TikTok)
    const youtubeVideo = document.querySelector('.youtube-video');
    const tiktokVideo = document.querySelector('.tiktok-video');

    videoItems.forEach((item) => {
      item.addEventListener('click', () => {
        videoItems.forEach((el) => el.classList.remove('active'));
        item.classList.add('active');

        if (item.dataset.platform === 'youtube' && youtubeVideo && tiktokVideo) {
          youtubeVideo.classList.add('active');
          tiktokVideo.classList.remove('active');
        } else if (item.dataset.platform === 'tiktok' && youtubeVideo && tiktokVideo) {
          youtubeVideo.classList.remove('active');
          tiktokVideo.classList.add('active');
        }
      });
    });

    // Smooth Scroll Functionality for navigation links
    const navLinks = document.querySelectorAll('nav a');

    navLinks.forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });

    // Optional: Dark Mode Toggle
    const darkModeToggle = document.querySelector('#dark-mode-toggle');
    const body = document.body;

    if (darkModeToggle) {
      darkModeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const darkMode = body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', darkMode ? 'enabled' : 'disabled');
      });

      const darkModeSetting = localStorage.getItem('darkMode');
      if (darkModeSetting === 'enabled') {
        body.classList.add('dark-mode');
      }
    }

    // Contact Form Submission
    const form = document.querySelector("#contact form");
    if (form) {
      const statusTxt = form.querySelector(".button-area span");

      form.onsubmit = (e) => {
        e.preventDefault();
        statusTxt.style.color = "#0D6EFD";
        statusTxt.style.display = "block";
        statusTxt.innerText = "Sending your message...";
        form.classList.add("disabled");

        let xhr = new XMLHttpRequest();
        xhr.open("POST", "forms/contact.php", true);
        xhr.onload = () => {
          if(xhr.readyState == 4 && xhr.status == 200){
            let response = xhr.response;
            if(response.indexOf("required") != -1 || response.indexOf("valid") != -1 || response.indexOf("failed") != -1){
              statusTxt.style.color = "red";
            }else{
              form.reset();
              setTimeout(() => {
                statusTxt.style.display = "none";
              }, 3000);
            }
            statusTxt.innerText = response;
            form.classList.remove("disabled");
          }
        }
        let formData = new FormData(form);
        xhr.send(formData);
      }
    }
  });
// Contact Form Submission
const form = document.querySelector("#contact form");
if (form) {
  const statusTxt = form.querySelector(".button-area span");

  form.onsubmit = (e) => {
    e.preventDefault();

    // Check if reCAPTCHA is completed
    const recaptchaResponse = grecaptcha.getResponse();
    if (recaptchaResponse.length === 0) {
      alert("Please complete the reCAPTCHA before sending your message.");
      return; // Stop form submission
    }

    statusTxt.style.color = "#0D6EFD";
    statusTxt.style.display = "block";
    statusTxt.innerText = "Sending your message...";
    form.classList.add("disabled");

    let xhr = new XMLHttpRequest();
    xhr.open("POST", "forms/contact.php", true);
    xhr.onload = () => {
      if(xhr.readyState == 4 && xhr.status == 200){
        let response = xhr.response;
        if(response.indexOf("required") != -1 || response.indexOf("valid") != -1 || response.indexOf("failed") != -1){
          statusTxt.style.color = "red";
        }else{
          form.reset();
          setTimeout(() => {
            statusTxt.style.display = "none";
          }, 3000);
        }
        statusTxt.innerText = response;
        form.classList.remove("disabled");
      }
    }
    let formData = new FormData(form);
    xhr.send(formData);
  }
}
})();