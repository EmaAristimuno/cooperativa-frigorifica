// Script para actualizar los colores dorados por celeste

document.addEventListener('DOMContentLoaded', function() {
    // Crear un elemento de estilo
    const styleElement = document.createElement('style');
    
    // Agregar las reglas CSS
    styleElement.textContent = `
    :root {
      --primary-color: #1EAAE7;
      --primary-color-rgb: 30, 170, 231;
      --primary-color-light: #7fd4ff;
      --primary-color-dark: #0d8bc5;
    }
  
    .btn-book-a-table,
    button[type="submit"],
    .cta-btn,
    .newsletter-form input[type="submit"] {
      background-color: var(--primary-color) !important;
      border-color: var(--primary-color) !important;
    }
  
    .btn-book-a-table:hover,
    button[type="submit"]:hover,
    .cta-btn:hover,
    .newsletter-form input[type="submit"]:hover {
      background-color: var(--primary-color-dark) !important;
      border-color: var(--primary-color-dark) !important;
    }
  
    a:hover,
    .sitename,
    .navmenu .active,
    .navmenu a:hover,
    .mobile-nav-active .mobile-nav-toggle,
    .section-title p,
    .breadcrumbs a:hover,
    .hero h2 span,
    .menu .menu-item-price,
    .events .price span,
    .testimonials-swiper .testimonial-item .stars,
    .contact .info-item i,
    .contact .info-item h3,
    .footer-newsletter h4,
    .events .price span,
    .menu .menu-item-price,
    .hero h2 span {
      color: var(--primary-color) !important;
    }
  
    .navmenu a:hover:before,
    .navmenu li:hover>a:before,
    .navmenu .active:before,
    .scroll-top,
    .swiper-pagination .swiper-pagination-bullet-active,
    .pulsating-play-btn:before {
      background-color: var(--primary-color) !important;
    }
  
    .social-links a {
      background-color: var(--primary-color) !important;
      border-color: var(--primary-color) !important;
    }
  
    .topbar,
    .scroll-top:hover {
      background-color: var(--primary-color) !important;
    }
    `;
    
    // Agregar el elemento de estilo al head del documento
    document.head.appendChild(styleElement);
  });