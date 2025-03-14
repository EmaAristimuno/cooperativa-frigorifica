/**
* Validación de formulario PHP - v3.0
* URL: https://bootstrapmade.com/php-email-form/
* Autor: BootstrapMade.com
*/
(function () {
    "use strict";
  
    let forms = document.querySelectorAll('.php-email-form');
  
    forms.forEach( function(form) {
      form.addEventListener('submit', function(event) {
        event.preventDefault();
  
        let thisForm = this;
        let action = thisForm.getAttribute('action');
        
        if( !action ) {
          displayError(thisForm, 'El atributo action del formulario no está configurado');
          return;
        }
        
        thisForm.querySelector('.loading').classList.add('d-block');
        thisForm.querySelector('.error-message').classList.remove('d-block');
        thisForm.querySelector('.sent-message').classList.remove('d-block');
  
        let formData = new FormData(thisForm);
  
        submitForm(thisForm, action, formData);
      });
    });
  
    function submitForm(thisForm, action, formData) {
      fetch(action, {
        method: 'POST',
        body: formData,
        headers: {'X-Requested-With': 'XMLHttpRequest'}
      })
      .then(response => {
        if(response.ok) {
          return response.json();
        } else {
          throw new Error(`${response.status} ${response.statusText} ${response.url}`); 
        }
      })
      .then(data => {
        thisForm.querySelector('.loading').classList.remove('d-block');
        
        if (data.success === true) {
          thisForm.querySelector('.sent-message').classList.add('d-block');
          thisForm.reset(); 
        } else {
          throw new Error(data.message ? data.message : 'El envío del formulario falló y no se recibió mensaje de error del servidor');
        }
      })
      .catch((error) => {
        displayError(thisForm, error);
      });
    }
  
    function displayError(thisForm, error) {
      thisForm.querySelector('.loading').classList.remove('d-block');
      thisForm.querySelector('.error-message').innerHTML = error;
      thisForm.querySelector('.error-message').classList.add('d-block');
    }
  
  })();