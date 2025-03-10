document.addEventListener('DOMContentLoaded', function() {
  // Crear un elemento de estilo
  const styleElement = document.createElement('style');
  
  // Definir los colores principales basados en el logo
  // Color celeste principal del logo
  const primaryColor = '#1EAAE7';
  // Verde del logo para acentos secundarios
  const secondaryColor = '#4CAF50'; 
  
  // Agregar las reglas CSS
  styleElement.textContent = `
  :root { 
    /* Colores primarios basados en el logo */
    --accent-color: ${primaryColor};
    --secondary-accent: ${secondaryColor};
    
    /* Variaciones del color primario */
    --accent-light: #7fd4ff;
    --accent-dark: #0d8bc5;
  }
  
  /* Botones y elementos de acción */
  .btn-book-a-table,
  .php-email-form button[type="submit"],
  .cta-btn,
  .footer-newsletter input[type="submit"],
  .scroll-top,
  .pulsating-play-btn,
  .contact .info-item i {
    background-color: var(--accent-color) !important;
    border-color: var(--accent-color) !important;
    color: #ffffff !important;
  }
  
  .btn-book-a-table:hover,
  .php-email-form button[type="submit"]:hover,
  .cta-btn:hover,
  .footer-newsletter input[type="submit"]:hover,
  .scroll-top:hover {
    background-color: var(--accent-dark) !important;
    border-color: var(--accent-dark) !important;
  }
  
  /* Menú de navegación */
  .navmenu a:hover,
  .navmenu .active,
  .navmenu li:hover>a {
    color: var(--accent-color) !important;
  }
  
  /* Textos destacados */
  a:hover,
  .sitename,
  .section-title p,
  .hero h2 span,
  .events .price span,
  .footer-links a:hover,
  .readmore {
    color: var(--accent-color) !important;
  }
  
  /* Elementos secundarios verdes */
  .about .content ul i,
  .events .event-item ul i {
    color: var(--secondary-accent) !important;
  }
  
  /* Barras superior e inferior */
  .topbar {
    background-color: var(--accent-color) !important;
  }
  
  /* Paginación y elementos interactivos */
  .swiper-pagination .swiper-pagination-bullet-active,
  .news .pagination a.active,
  .news .pagination a:hover {
    background-color: var(--accent-color) !important;
  }
  
  /* Eventos hover en imágenes y cards */
  .news .news-item:hover .news-date,
  .gallery .gallery-item::before {
    background-color: rgba(30, 170, 231, 0.8) !important;
  }
  
  /* Ajustes para mejor contraste */
  .hero .cta-btn {
    border-color: #ffffff;
    background-color: rgba(30, 170, 231, 0.8) !important;
  }
  
  /* Barra de preloader */
  #preloader:before {
    border-color: var(--accent-color) transparent var(--accent-color) transparent !important;
  }
 


    /* Asegurar que los iconos de Bootstrap sean visibles en la barra superior */
    .topbar .contact-info i.bi {
      display: flex !important;
      align-items: center !important;
      color: white !important;
      font-size: 16px !important;
      margin-right: 8px !important;
    }
    
    /* Estilo para los enlaces de correo electrónico */
    .topbar .contact-info i.bi a {
      color: white !important;
      font-size: 14px !important;
      margin-left: 5px !important;
      font-style: normal !important;
      font-weight: normal !important;
    }
    
    /* Estilo para el número de teléfono */
    .topbar .contact-info i.bi span {
      color: white !important;
      font-size: 14px !important;
      margin-left: 5px !important;
      font-style: normal !important;
      font-weight: normal !important;
    }
    
    /* Asegurar que la barra superior tenga un color de fondo adecuado y un padding para mejor visualización */
    /*.topbar {
      background-color: #1EAAE7 !important;
      padding: 8px 0 !important;
    }*/
    
    /* Ajustar espaciado entre los elementos de contacto */
    .topbar .contact-info > i.bi + i.bi {
      margin-left: 20px !important;
    }
 
     `;
  
  
  // Agregar el elemento de estilo al head del documento
  document.head.appendChild(styleElement);
});