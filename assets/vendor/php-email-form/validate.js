/**
 * PHP Email Form Validation - v3.10
 * Mejorado con validaciones adicionales
 */
(function() {
  "use strict";

  // Función para validar formato de email
  function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  // Función para validar formato de teléfono (acepta formatos internacionales)
  function isValidPhone(phone) {
    // Permite números, espacios, guiones, paréntesis y el signo +
    const re = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;
    return phone === '' || re.test(phone); // El teléfono es opcional
  }

  let forms = document.querySelectorAll('.php-email-form');

  forms.forEach(function(e) {
    e.addEventListener('submit', function(event) {
      event.preventDefault();

      let thisForm = this;
      let formIsValid = true;
      let errorMessage = '';

      // Validar el email
      const emailInput = thisForm.querySelector('input[name="email"]');
      if (emailInput && !isValidEmail(emailInput.value)) {
        formIsValid = false;
        errorMessage = 'Por favor, ingrese un email válido';
        emailInput.classList.add('is-invalid');
      } else if (emailInput) {
        emailInput.classList.remove('is-invalid');
      }

      // Validar el teléfono (si existe)
      const phoneInput = thisForm.querySelector('input[name="phone"]');
      if (phoneInput && !isValidPhone(phoneInput.value)) {
        formIsValid = false;
        errorMessage = 'Por favor, ingrese un número de teléfono válido';
        phoneInput.classList.add('is-invalid');
      } else if (phoneInput) {
        phoneInput.classList.remove('is-invalid');
      }

      // Verificar que el mensaje tenga un mínimo de caracteres
      const messageInput = thisForm.querySelector('textarea[name="message"]');
      if (messageInput && messageInput.value.length < 10) {
        formIsValid = false;
        errorMessage = 'El mensaje debe tener al menos 10 caracteres';
        messageInput.classList.add('is-invalid');
      } else if (messageInput) {
        messageInput.classList.remove('is-invalid');
      }

      // Si hay errores, mostrarlos y detener el envío
      if (!formIsValid) {
        displayError(thisForm, errorMessage);
        return;
      }

      let action = thisForm.getAttribute('action');
      let recaptcha = thisForm.getAttribute('data-recaptcha-site-key');

      if (!action) {
        displayError(thisForm, 'The form action property is not set!');
        return;
      }

      thisForm.querySelector('.loading').classList.add('d-block');
      thisForm.querySelector('.error-message').classList.remove('d-block');
      thisForm.querySelector('.sent-message').classList.remove('d-block');

      let formData = new FormData(thisForm);

      // Añadir fecha y hora de envío
      formData.append('sent_date', new Date().toISOString());

      if (recaptcha) {
        if (typeof grecaptcha !== "undefined") {
          grecaptcha.ready(function() {
            try {
              grecaptcha.execute(recaptcha, {
                  action: 'php_email_form_submit'
                })
                .then(token => {
                  formData.set('recaptcha-response', token);
                  php_email_form_submit(thisForm, action, formData);
                })
            } catch (error) {
              displayError(thisForm, error);
            }
          });
        } else {
          displayError(thisForm, 'The reCaptcha javascript API url is not loaded!')
        }
      } else {
        php_email_form_submit(thisForm, action, formData);
      }
    });
  });

  function php_email_form_submit(thisForm, action, formData) {
    fetch(action, {
        method: 'POST',
        body: formData,
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
        }
      })
      .then(response => {
        if (response.ok) {
          return response.text();
        } else {
          throw new Error(`${response.status} ${response.statusText} ${response.url}`);
        }
      })
      .then(data => {
        thisForm.querySelector('.loading').classList.remove('d-block');
        if (data.trim() == 'OK') {
          thisForm.querySelector('.sent-message').classList.add('d-block');
          thisForm.reset();
          
          // Redireccionar después de 3 segundos (opcional)
          // setTimeout(() => {
          //   window.location.href = 'gracias.html';
          // }, 3000);
          
        } else {
          throw new Error(data ? data : 'Form submission failed and no error message returned from: ' + action);
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
    
    // Ocultar el mensaje de error después de 5 segundos
    setTimeout(() => {
      thisForm.querySelector('.error-message').classList.remove('d-block');
    }, 5000);
  }
})();