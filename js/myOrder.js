export function myOrder() {
  const form = document.querySelector('.order');
  const template = document.querySelector('.overlay');

  form.querySelector('.order__btn--sumbit').addEventListener('click', function (event) {
    event.preventDefault();
    const data = {
      name: form.elements.name.value,
      phone: form.elements.phone.value,
      street: form.elements.street.value,
      house: form.elements.house.value,
      corpus: form.elements.corpus.value,
      floor: form.elements.floor.value,
      apartment: form.elements.apartment.value,
      comment: form.elements.comment.value,
      payment: form.elements.payment.value,
      call: form.elements.toCall.checked ? "Отправить СМС" : "Позвонить",
    }
    let overlay;
    if (validateForm(form)) {
      //   const xhr = new XMLHttpRequest();
      //   xhr.open('POST', 'http://localhost:8080/data')
      //   xhr.send(JSON.stringify(data));
      //   xhr.addEventListener('load', () => {
      //     console.log(xhr.response);
      // });

      console.log(JSON.stringify(data))

      overlay = createOverlay(template, `Уважаемый, ${form.elements.name.value}! Спасибо за обращение! В ближайшее время наш оператор свяжется с Вами.`);

    } else {
      overlay = createOverlay(template, 'Заполните все поля отмеченные красным цветом.');
    }
    overlay.open();
  })

  function validateForm(form) {
    let valid = true;

    if (!validateField(form.elements.name)) {
      valid = false;
    }

    if (!validateField(form.elements.phone)) {
      valid = false;
    }

    return valid;
  }

  function validateField(field) {
    if (field.checkValidity()) {
      field.style.borderColor = 'transparent';
    } else {
      field.style.borderColor = 'firebrick'
    }
    return field.checkValidity();
  }

  function createOverlay(template, message) {
    const overlay = template;
    overlay.querySelector('.overlay__text').textContent = message;
    const closeBtn = template.querySelector('.closebtn');

    overlay.addEventListener('click', (event) => {
      if (event.target == overlay) closeBtn.click();
    })

    closeBtn.addEventListener('click', (event) => {
      event.preventDefault();
      document.body.style.overflow = '';
      document.body.classList.remove('overlay--active');
      overlay.style.display = 'none';
    })

    return {
      open() {
        overlay.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        document.body.classList.add('overlay--active');
      },
      close() {
        closeBtn.click();
      },
    }
  }

}