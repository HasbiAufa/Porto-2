// DOM Content Loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize all functionality
  initializeLoading()
  initializeNavigation()
  initializeScrollAnimations()
  initializePortfolioFilter()
  initializeContactForm()
  initializeSmoothScroll()
  initializeAutoSlide()
  initializeModals()
  initializeModalSliders()
})

// Loading Screen
function initializeLoading() {
  const loadingScreen = document.getElementById("loading-screen")

  window.addEventListener("load", () => {
    setTimeout(() => {
      loadingScreen.classList.add("fade-out")
      setTimeout(() => {
        loadingScreen.style.display = "none"
      }, 500)
    }, 1000)
  })
}

// Navigation
function initializeNavigation() {
  const navbar = document.getElementById("navbar")
  const hamburger = document.getElementById("hamburger")
  const navMenu = document.getElementById("nav-menu")
  const navLinks = document.querySelectorAll(".nav-link")

  // Navbar scroll effect
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled")
    } else {
      navbar.classList.remove("scrolled")
    }
  })

  // Mobile menu toggle
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active")
    navMenu.classList.toggle("active")
  })

  // Close mobile menu when clicking on a link
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active")
      navMenu.classList.remove("active")
    })
  })

  // Active navigation link
  window.addEventListener("scroll", () => {
    let current = ""
    const sections = document.querySelectorAll("section")

    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.clientHeight
      if (scrollY >= sectionTop - 200) {
        current = section.getAttribute("id")
      }
    })

    navLinks.forEach((link) => {
      link.classList.remove("active")
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active")
      }
    })
  })
}

// Scroll Animations
function initializeScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible")
      }
    })
  }, observerOptions)

  // Observe all elements with fade-in class
  const fadeElements = document.querySelectorAll(".fade-in")
  fadeElements.forEach((element) => {
    observer.observe(element)
  })
}

// Portfolio Filter
function initializePortfolioFilter() {
  const filterButtons = document.querySelectorAll(".filter-btn")
  const portfolioItems = document.querySelectorAll(".portfolio-item")

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const filter = this.getAttribute("data-filter")

      // Update active button
      filterButtons.forEach((btn) => btn.classList.remove("active"))
      this.classList.add("active")

      // Filter portfolio items
      portfolioItems.forEach((item) => {
        const category = item.getAttribute("data-category")

        if (filter === "all" || category === filter) {
          item.classList.remove("hidden")
          setTimeout(() => {
            item.style.display = "block"
          }, 10)
        } else {
          item.classList.add("hidden")
          setTimeout(() => {
            if (item.classList.contains("hidden")) {
              item.style.display = "none"
            }
          }, 300)
        }
      })
    })
  })
}

// Contact Form
function initializeContactForm() {
  const contactForm = document.getElementById("contact-form")

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault()

    // Get form data
    const formData = new FormData(this)
    const name = formData.get("name")
    const email = formData.get("email")
    const subject = formData.get("subject")
    const message = formData.get("message")

    // Basic validation
    if (!name || !email || !subject || !message) {
      showNotification("Please fill in all fields.", "error")
      return
    }

    if (!isValidEmail(email)) {
      showNotification("Please enter a valid email address.", "error")
      return
    }

    // Simulate form submission
    const submitButton = this.querySelector(".submit-button")
    const originalText = submitButton.textContent

    submitButton.textContent = "Sending..."
    submitButton.disabled = true

    setTimeout(() => {
      showNotification("Thank you! Your message has been sent successfully.", "success")
      contactForm.reset()
      submitButton.textContent = originalText
      submitButton.disabled = false
    }, 2000)
  })
}

// Smooth Scroll
function initializeSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]')

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetSection = document.querySelector(targetId)

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 70 // Account for fixed navbar

        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        })
      }
    })
  })
}

// Utility Functions
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

function showNotification(message, type) {
  // Create notification element
  const notification = document.createElement("div")
  notification.className = `notification ${type}`
  notification.textContent = message

  // Style the notification
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: ${type === "success" ? "#28a745" : "#dc3545"};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 5px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `

  document.body.appendChild(notification)

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)"
  }, 100)

  // Remove after 5 seconds
  setTimeout(() => {
    notification.style.transform = "translateX(100%)"
    setTimeout(() => {
      document.body.removeChild(notification)
    }, 300)
  }, 5000)
}

// Parallax Effect for Hero Section (Optional)
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const hero = document.querySelector(".hero")
  const rate = scrolled * -0.5

  if (hero) {
    hero.style.transform = `translateY(${rate}px)`
  }
})

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Apply throttling to scroll events
const throttledScrollHandler = throttle(() => {
  // Scroll-dependent functions can be called here
}, 16) // ~60fps

window.addEventListener("scroll", throttledScrollHandler)

// Keyboard navigation support
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    // Close mobile menu if open
    const hamburger = document.getElementById("hamburger")
    const navMenu = document.getElementById("nav-menu")

    if (navMenu.classList.contains("active")) {
      hamburger.classList.remove("active")
      navMenu.classList.remove("active")
    }
  }
})

// Focus management for accessibility
document.addEventListener("DOMContentLoaded", () => {
  const focusableElements = document.querySelectorAll(
    'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])',
  )

  focusableElements.forEach((element) => {
    element.addEventListener("focus", function () {
      this.style.outline = "2px solid #007BFF"
      this.style.outlineOffset = "2px"
    })

    element.addEventListener("blur", function () {
      this.style.outline = ""
      this.style.outlineOffset = ""
    })
  })
})

// Function 1: Auto Slide tiap 3 detik
function initializeAutoSlide() {
  const sliders = document.querySelectorAll('.ig-slides');
  
  sliders.forEach(slider => {
    let isHovered = false;

    // Kalau mouse lagi di atas gambar, berhentiin slide otomatisnya biar user gak keganggu
    slider.parentElement.addEventListener('mouseenter', () => isHovered = true);
    slider.parentElement.addEventListener('mouseleave', () => isHovered = false);

    setInterval(() => {
      if (!isHovered) {
        // Cek apakah udah mentok di gambar terakhir
        const maxScroll = slider.scrollWidth - slider.clientWidth;
        
        if (slider.scrollLeft >= maxScroll - 5) {
          // Kalau udah mentok, balikin ke awal (kiri)
          slider.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          // Geser sejauh 1 gambar (selebar container)
          slider.scrollBy({ left: slider.clientWidth, behavior: 'smooth' });
        }
      }
    }, 3000); // 3000 ms = 3 detik
  });
}

// Function 2: Logic Pop-up Modal
function initializeModals() {
  const showBtns = document.querySelectorAll('.show-modal-btn');
  const closeBtns = document.querySelectorAll('.close-modal');
  const modals = document.querySelectorAll('.custom-modal');

  // Logic buka modal
  showBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const modalId = btn.getAttribute('data-modal');
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.style.display = 'flex'; // Munculin ke layar
        document.body.style.overflow = 'hidden'; // Kunci background biar ga bisa discroll
      }
    });
  });

  // Logic tutup modal dari tombol "X"
  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      btn.closest('.custom-modal').style.display = 'none';
      document.body.style.overflow = 'auto'; // Buka lagi kunci scroll background
    });
  });

  // Logic tutup modal kalau nge-klik di area hitam luar kotak
  window.addEventListener('click', (e) => {
    modals.forEach(modal => {
      if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
      }
    });
  });
}

// Function 3: Manual Slider di dalam Modal Pop-up
function initializeModalSliders() {
  const modals = document.querySelectorAll('.custom-modal');
  
  modals.forEach(modal => {
    let currentSlide = 0;
    const slides = modal.querySelectorAll('.modal-slide');
    const prevBtn = modal.querySelector('.prev-slide');
    const nextBtn = modal.querySelector('.next-slide');
    
    // Pastikan ada gambar di dalam slidernya
    if(slides.length > 0) {
      // Tampilkan gambar pertama saat modal dibuka
      slides[0].style.display = 'block';
      
      // Logic Tombol Kiri (Prev)
      if(prevBtn) {
        prevBtn.addEventListener('click', () => {
          slides[currentSlide].style.display = 'none'; // Sembunyiin yg sekarang
          currentSlide = (currentSlide === 0) ? slides.length - 1 : currentSlide - 1;
          slides[currentSlide].style.display = 'block'; // Munculin yg baru
        });
      }
      
      // Logic Tombol Kanan (Next)
      if(nextBtn) {
        nextBtn.addEventListener('click', () => {
          slides[currentSlide].style.display = 'none'; // Sembunyiin yg sekarang
          currentSlide = (currentSlide === slides.length - 1) ? 0 : currentSlide + 1;
          slides[currentSlide].style.display = 'block'; // Munculin yg baru
        });
      }
    }
  });
}