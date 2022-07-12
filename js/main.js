window.addEventListener('DOMContentLoaded', () => {

  //Menu
  const hamburger = document.querySelector('.hamburger');
  const menu = document.querySelector('.menu');
  const closeElem = document.querySelector('.menu__close');
  let scroll = calcScroll();

  hamburger.addEventListener('click', () => {
    menu.classList.add('active');
    document.body.classList.add('fixed-page');
    document.body.style.marginRight = `${scroll}px`;
  });

  closeElem.addEventListener('click', () => {
    menu.classList.remove('active');
    document.body.classList.remove('fixed-page');
    document.body.style.marginRight = '0';
  });

  //Progress items

  const progressItems = document.querySelectorAll('.progress__item');
  progressItems.forEach((item) => {
    let counter = item.querySelector('.progress__item-percent');
    let line = item.querySelector('.progress__item-line');
    line.style.width = counter.innerHTML;
  });

  //Modal

  const triggers = document.querySelectorAll('[data-modal]');
  const modal = document.querySelector('.modal');
  const modalImg = document.querySelector('.modal__content');
  const closeModal = document.querySelector('.modal__close');



  triggers.forEach(trigger => {
    trigger.addEventListener('click', showModal);
  });

  closeModal.addEventListener('click', modalClose);

  //Закрытие модального окна по нажатию клавиши esc
  document.addEventListener('keydown', (e) => {
    if (e.code === "Escape" && modal.style.display == "block") {
      modalClose();
    }
  });

  function showModal() {
    modal.style.display = "block";
    modalImg.src = this.src;
    document.body.style.overflow = 'hidden';
    document.body.style.marginRight = `${scroll}px`;
  }

  function modalClose() {
    modal.style.display = "none";
    document.body.style.overflow = '';
    document.body.style.marginRight = `0px`;
  }

  //Высчитывает размер полосы прокрутки
  function calcScroll() {
    let div = document.createElement('div');

    div.style.width = '50px';
    div.style.height = '50px';
    div.style.overflowY = 'scroll';
    div.style.visibility = 'hidden';

    document.body.appendChild(div);
    let scrollWidth = div.offsetWidth - div.clientWidth;
    div.remove();

    return scrollWidth;
  }
    //Реализация плавного скролла вверх
  $(window).scroll(function () {
    if ($(this).scrollTop() > 1000) {
      $('.pageup').fadeIn('slow');
    } else {
      $('.pageup').fadeOut('slow');
    }
  });
  $('.pageup').click( function(e) {

    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== '') {
      // Prevent default anchor click behavior
      e.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 250, function(){

        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    } // End if
  });
  //Валидация форм при помощи плагина jquery validator
  function validateForms(form) {
    $(form).validate({
      rules: {
        name: {
          required: true,
          minlength: 2,
        },
        email: {
          required: true,
          email: true,
        },
        policy: {
          required: true
        }
      },
      messages: {
        name: {
          required: 'Пожалуйста, введите свое имя',
          minlength: jQuery.validator.format('Введите минимум {0} символа'),
        },
        email: {
          required: 'Пожалуйста, введите свою почту',
          email: 'Неверно введен адрес почты',
        },
        policy: {
          required: 'Пожалуйста, подтвердите свое согласие',
        }
      },
    });
  }
  validateForms('#contacts form');

// Отправка данных на сервер
function send(event, php){
console.log("Отправка запроса");
event.preventDefault ? event.preventDefault() : event.returnValue = false;
var req = new XMLHttpRequest();
req.open('POST', php, true);
req.onload = function() {
	if (req.status >= 200 && req.status < 400) {
	json = JSON.parse(this.response); // Ебанный internet explorer 11
    	console.log(json);
        
    	// ЗДЕСЬ УКАЗЫВАЕМ ДЕЙСТВИЯ В СЛУЧАЕ УСПЕХА ИЛИ НЕУДАЧИ
    	if (json.result == "success") {
    		// Если сообщение отправлено
    		alert("Сообщение отправлено");
    	} else {
    		// Если произошла ошибка
    		alert("Ошибка. Сообщение не отправлено");
    	}
    // Если не удалось связаться с php файлом
    } else {alert("Ошибка сервера. Номер: "+req.status);}}; 

// Если не удалось отправить запрос. Стоит блок на хостинге
req.onerror = function() {alert("Ошибка отправки запроса");};
req.send(new FormData(event.target));
}
  });




