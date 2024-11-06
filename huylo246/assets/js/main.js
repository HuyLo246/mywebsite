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

// assets/js/lang-toggle.js
function switchLanguage(language) {
  const elements = document.querySelectorAll('.translatable');
  
  elements.forEach(element => {
      const translation = element.getAttribute(`data-${language}`);
      if (translation) {
          element.textContent = translation;
      }
  });
  
  // Update HTML lang attribute for better SEO
  document.documentElement.lang = language;
}

// Add this to your existing main.js file

document.addEventListener('DOMContentLoaded', function() {
  const qrCode = document.getElementById('qrCode');
  const bankInfoPopup = document.getElementById('bankInfoPopup');
  const closeBankInfo = document.getElementById('closeBankInfo');

  if (qrCode && bankInfoPopup && closeBankInfo) {
      qrCode.addEventListener('click', function() {
          bankInfoPopup.style.display = 'flex';
          anime({
              targets: '.bank-info-content',
              scale: [0.9, 1],
              opacity: [0, 1],
              easing: 'easeOutCubic',
              duration: 300
          });
      });

      closeBankInfo.addEventListener('click', function() {
          anime({
              targets: '.bank-info-content',
              scale: [1, 0.9],
              opacity: [1, 0],
              easing: 'easeInCubic',
              duration: 300,
              complete: function() {
                  bankInfoPopup.style.display = 'none';
              }
          });
      });

      bankInfoPopup.addEventListener('click', function(e) {
          if (e.target === bankInfoPopup) {
              anime({
                  targets: '.bank-info-content',
                  scale: [1, 0.9],
                  opacity: [1, 0],
                  easing: 'easeInCubic',
                  duration: 300,
                  complete: function() {
                      bankInfoPopup.style.display = 'none';
                  }
              });
          }
      });
  }
});

// Add this to your existing DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', function() {
  const qrToggleBtn = document.getElementById('qrToggleBtn');
  const qrCodeWrapper = document.getElementById('qrCodeWrapper');
  const chevronIcon = qrToggleBtn.querySelector('i');

  qrToggleBtn.addEventListener('click', function() {
      if (qrCodeWrapper.style.maxHeight) {
          qrCodeWrapper.style.maxHeight = null;
          chevronIcon.style.transform = 'rotate(0deg)';
      } else {
          qrCodeWrapper.style.maxHeight = qrCodeWrapper.scrollHeight + "px";
          chevronIcon.style.transform = 'rotate(180deg)';
      }
  });
});

function switchLanguage(lang) {
  if (isSwitchingLanguage) return;
  isSwitchingLanguage = true;

  showTransitionOverlay();

  // Capture detailed page state
  const pageState = capturePageState();
  localStorage.setItem('pageState', JSON.stringify(pageState));

  // Use relative paths without leading slash
  setTimeout(() => {
    const currentPath = window.location.pathname;
    const newPath = lang === 'en' ? 'index.html' : 'indexvn.html';
    window.location.href = newPath;
  }, 1000);
}

function capturePageState() {
  const sections = document.querySelectorAll('section');
  const viewportHeight = window.innerHeight;
  const scrollPosition = window.pageYOffset;

  let activeSection = null;
  let activeSectionProgress = 0;

  // Find the currently visible section
  for (let section of sections) {
    const rect = section.getBoundingClientRect();
    const sectionTop = rect.top + scrollPosition;
    const sectionBottom = sectionTop + rect.height;

    if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
      activeSection = section.id;
      // Calculate how far through the section we are (0-1)
      activeSectionProgress = (scrollPosition - sectionTop) / rect.height;
      break;
    }
  }

  return {
    scrollPosition,
    activeSection,
    activeSectionProgress
  };
}

function restorePageState() {
  const pageState = JSON.parse(localStorage.getItem('pageState'));
  if (!pageState) return;

  // Restore scroll position with section awareness
  if (pageState.activeSection) {
    const section = document.getElementById(pageState.activeSection);
    if (section) {
      const sectionRect = section.getBoundingClientRect();
      const targetScrollPosition = sectionRect.top + window.pageYOffset + 
        (sectionRect.height * pageState.activeSectionProgress);
      window.scrollTo({
        top: targetScrollPosition,
        behavior: 'instant' // Use instant to prevent smooth scrolling
      });
    }
  } else {
    window.scrollTo({
      top: pageState.scrollPosition,
      behavior: 'instant'
    });
  }

  // Clear stored state
  localStorage.removeItem('pageState');

  // Fade in content
  document.body.style.opacity = '1';
  hideTransitionOverlay();
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  createTransitionOverlay();
  document.body.style.opacity = '0';
  
  // Restore page state when the DOM is fully loaded
  restorePageState();

  // Re-enable language switching after navigation
  isSwitchingLanguage = false;
});

// Prevent scroll during initial load
document.body.style.overflow = 'hidden';

// Re-enable scrolling after a short delay
setTimeout(() => {
  document.body.style.overflow = '';
}, 100);

// Add smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Add this function to your existing main.js file

function setupTypingAnimation() {
  const typingText = document.querySelector('.about-me-text h3');
  if (!typingText) return;

  const originalText = typingText.textContent;
  typingText.textContent = '';

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        typeText(typingText, originalText);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  observer.observe(typingText);
}

function typeText(element, text, index = 0) {
  if (index < text.length) {
    element.textContent += text[index];
    setTimeout(() => typeText(element, text, index + 1), 50);
  } else {
    element.classList.add('typing-complete');
  }
}

// Call this function in your DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', () => {
  setupTypingAnimation();
});

document.addEventListener('DOMContentLoaded', function() {
    const menuHamburger = document.querySelector('.menuHamburger');
    const sidebarMenu = document.querySelector('.sidebarMenu');
    const body = document.body;

    // Create overlay element
    const overlay = document.createElement('div');
    overlay.classList.add('sidebar-overlay');
    document.body.appendChild(overlay);

    // Close sidebar when clicking outside
    overlay.addEventListener('click', function() {
        sidebarMenu.classList.remove('active');
        body.classList.remove('sidebar-open');
        overlay.classList.remove('active');
    });
});

// Update paths to be relative instead of absolute
document.querySelectorAll('a[href^="/"]').forEach(anchor => {
    // Remove the leading slash and 'huylo246/' if present
    anchor.href = anchor.href.replace(/^\/(?:huylo246\/)?/, '');
});

// Update language switcher paths
function switchLanguage(lang) {
    if (isSwitchingLanguage) return;
    isSwitchingLanguage = true;

    showTransitionOverlay();

    const pageState = capturePageState();
    localStorage.setItem('pageState', JSON.stringify(pageState));

    // Use relative paths without leading slash
    setTimeout(() => {
        const currentPath = window.location.pathname;
        const newPath = lang === 'en' ? 'index.html' : 'indexvn.html';
        window.location.href = newPath;
    }, 1000);
}

document.addEventListener('DOMContentLoaded', function() {
  // Bitcoin donation popup functionality
  const bitcoinButton = document.querySelector('.bitcoin-button');
  const donatePopup = document.getElementById('donateform');

  if (bitcoinButton && donatePopup) {
      bitcoinButton.addEventListener('click', function(e) {
          e.preventDefault();
          // Remove href navigation
          donatePopup.style.display = 'flex';
          anime({
              targets: donatePopup.querySelector('.popup'),
              scale: [0.9, 1],
              opacity: [0, 1],
              easing: 'easeOutCubic',
              duration: 300
          });
      });

      // Close button functionality
      const closeBtn = donatePopup.querySelector('.close');
      if (closeBtn) {
          closeBtn.addEventListener('click', function(e) {
              e.preventDefault();
              closePopup();
          });
      }

      // Close when clicking outside
      donatePopup.addEventListener('click', function(e) {
          if (e.target === donatePopup) {
              closePopup();
          }
      });

      function closePopup() {
          anime({
              targets: donatePopup.querySelector('.popup'),
              scale: [1, 0.9],
              opacity: [1, 0],
              easing: 'easeInCubic',
              duration: 300,
              complete: function() {
                  donatePopup.style.display = 'none';
              }
          });
      }
  }
});