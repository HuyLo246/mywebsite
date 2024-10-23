// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800, // Duration of animations
    easing: 'ease-in-out', // Easing function
    once: true, // Animation happens only once
  });
  
  // Copy to clipboard function
  function copyToClipboard(text) {
    navigator.clipboard.writeText(text)
      .then(() => {
        document.getElementById('copy-icon').classList.add('copied');
        setTimeout(() => {
          document.getElementById('copy-icon').classList.remove('copied');
        }, 1000);
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  }
  
  // Navigation link functionality
  function setupNavLinks() {
    document.querySelectorAll('.nav-items a').forEach(link => {
      link.addEventListener('click', () => {
        document.querySelectorAll('.nav-items a').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      });
    });
  }
  
  // Active link on scroll
  function setupScrollActiveLinks() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-items a');
  
    window.addEventListener('scroll', () => {
      let current = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - sectionHeight / 3) {
          current = section.getAttribute('id');
        }
      });
  
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
          link.classList.add('active');
        }
      });
    });
  }
  
  // Video toggle functionality
  function setupVideoToggle() {
    const videoItems = document.querySelectorAll('.video-item');
    const videoContainers = document.querySelectorAll('.video-container .video');
  
    videoItems.forEach(item => {
      item.addEventListener('click', () => {
        videoItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
  
        const platform = item.dataset.platform;
        videoContainers.forEach(container => {
          container.classList.toggle('active', container.classList.contains(platform + '-video'));
        });
      });
    });
  }
  
  // Sidebar functionality
  const menuHamburger = document.querySelector('.menuHamburger');
  const sidebarMenu = document.querySelector('.sidebarMenu');
  const closeSidebar = document.querySelector('.sidebarMenu .close');
  
  menuHamburger.addEventListener('click', () => {
    sidebarMenu.classList.add('active');
  });
  
  closeSidebar.addEventListener('click', () => {
    sidebarMenu.classList.remove('active');
  });
  
  // Close sidebar when clicking outside of it
  document.addEventListener('click', (e) => {
    if (!sidebarMenu.contains(e.target) && e.target !== menuHamburger) {
      sidebarMenu.classList.remove('active');
    }
  });
  
  // Close sidebar when a menu item is clicked
  sidebarMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      sidebarMenu.classList.remove('active');
    });
  });
  
  // Contact form submission
  const form = document.querySelector("#contact-form");
  if (form) {
    const statusTxt = form.querySelector(".button-area span");
  
    form.onsubmit = (e) => {
      e.preventDefault();
      const recaptchaResponse = grecaptcha.getResponse();
      if (recaptchaResponse.length === 0) {
        alert("Please complete the reCAPTCHA before sending your message.");
        return; // Stop form submission
      } else {
        form.submit(); // Allow form submission if reCAPTCHA is completed
      }
    };
  }
  
  // Count up
  function formatNumber(num) {
    if (num >= 1000000) {
      return `+${(num / 1000000).toFixed(1)}M`; // Format as millions
    } else if (num >= 1000) {
      return `+${(num / 1000).toFixed(1)}K`; // Format as thousands
    }
    return `+${num}`; // Return the number as is if less than 1000
  }
  
  function countup(el, target) {
    let data = { count: 0 };
    anime({
      targets: data,
      count: [0, target],
      duration: 3000, // Set duration to 3000 milliseconds (3 seconds)
      round: 1,
      delay: 200,
      easing: 'easeOutCubic',
      update() {
        el.innerText = formatNumber(data.count); // Format the number for display
      }
    });
  }
  
  function makeCountup(el) {
    const text = el.textContent.replace(/\+/g, ''); // Remove the '+' sign for parsing
    const target = parseInt(text.replace(/M/g, '000000').replace(/K/g, '000'), 10); // Convert to number
  
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.intersectionRatio > 0) {
          countup(el, target);
          io.unobserve(entry.target);
        }
      });
    });
  
    io.observe(el);
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    const els = document.querySelectorAll('[data-countup]');
    els.forEach(makeCountup);
  });
  
  // Initialize functions
  setupNavLinks();
  setupScrollActiveLinks();
  setupVideoToggle();