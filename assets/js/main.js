/**
* Template Name: Restaurantly
* Template URL: https://bootstrapmade.com/restaurantly-restaurant-template/
* Updated: Aug 07 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
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

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
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

  /**
   * Init swiper sliders
   */
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

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
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

  /**
   * Navmenu Scrollspy
   */
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


  // Script para paginación responsiva de noticias
document.addEventListener('DOMContentLoaded', function() {
  // Elementos que necesitamos
  const newsContainer = document.getElementById('news-container');
  const paginationContainer = document.getElementById('pagination-container');
  const newsItems = document.querySelectorAll('.news-item');
  const paginationArrows = document.querySelectorAll('.pagination-arrow');
  
  // Variables para la paginación
  let currentPage = 1;
  let itemsPerPage = window.innerWidth < 768 ? 3 : 6; // Móvil: 3 items, Desktop: 6 items
  let totalPages = Math.ceil(newsItems.length / itemsPerPage);
  
  // Inicializar la paginación
  initPagination();
  
  // Actualizar paginación cuando cambia el tamaño de la ventana
  window.addEventListener('resize', function() {
    const newItemsPerPage = window.innerWidth < 768 ? 3 : 6;
    
    // Solo actualizamos si cambia la cantidad de items por página
    if (newItemsPerPage !== itemsPerPage) {
      itemsPerPage = newItemsPerPage;
      totalPages = Math.ceil(newsItems.length / itemsPerPage);
      
      // Si la página actual ahora es mayor que el total de páginas, ajustamos
      if (currentPage > totalPages) {
        currentPage = totalPages;
      }
      
      // Actualizar la paginación y los items visibles
      updatePaginationButtons();
      showItems();
    }
  });
  
  // Función para inicializar la paginación
  function initPagination() {
    // Generar botones de paginación
    updatePaginationButtons();
    
    // Mostrar los items de la página actual
    showItems();
    
    // Agregar event listeners a los botones de paginación
    paginationArrows.forEach(arrow => {
      arrow.addEventListener('click', function(e) {
        e.preventDefault();
        
        const action = this.getAttribute('data-page');
        
        if (action === 'prev' && currentPage > 1) {
          currentPage--;
          showItems();
          updatePaginationButtons();
        } else if (action === 'next' && currentPage < totalPages) {
          currentPage++;
          showItems();
          updatePaginationButtons();
        }
        
        // Desplazar al inicio de la sección de noticias
        document.querySelector('#news').scrollIntoView({ behavior: 'smooth' });
      });
    });
  }
  
  // Función para mostrar los items de la página actual
  function showItems() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    
    newsItems.forEach((item, index) => {
      if (index >= startIndex && index < endIndex) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  }
  
  // Función para actualizar los botones de paginación
  function updatePaginationButtons() {
    // Limpiar botones de número de página existentes
    const pageButtons = document.querySelectorAll('.page-number');
    pageButtons.forEach(button => button.parentNode.remove());
    
    // Obtenemos la flecha izquierda y derecha
    const prevArrow = paginationContainer.querySelector('[data-page="prev"]').parentNode;
    const nextArrow = paginationContainer.querySelector('[data-page="next"]').parentNode;
    
    // Deshabilitar flechas si estamos en la primera o última página
    prevArrow.querySelector('a').classList.toggle('disabled', currentPage === 1);
    nextArrow.querySelector('a').classList.toggle('disabled', currentPage === totalPages);
    
    // Crear nuevos botones de número de página
    for (let i = 1; i <= totalPages; i++) {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = '#';
      a.textContent = i;
      a.classList.add('page-number');
      
      if (i === currentPage) {
        a.classList.add('active');
      }
      
      a.addEventListener('click', function(e) {
        e.preventDefault();
        currentPage = i;
        showItems();
        updatePaginationButtons();
        
        // Desplazar al inicio de la sección de noticias
        document.querySelector('#news').scrollIntoView({ behavior: 'smooth' });
      });
      
      li.appendChild(a);
      // Insertamos antes de la flecha derecha
      paginationContainer.insertBefore(li, nextArrow);
    }
  }
});

})();

