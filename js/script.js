// 1. Призначаємо глобальний обробник подій
window.addEventListener("DOMContentLoaded", () => {
  //. Витягуємо класи
  const tabs = document.querySelectorAll(".tabheader__item"),
    tabsContent = document.querySelectorAll(".tabcontent"),
    tabsParanth = document.querySelector(".tabheader__items");

  // Приховуємо всі непотрібні таби
  function hideTabContent() {
    tabsContent.forEach((item) => {
      item.style.display = "none";
    });
    tabs.forEach((item) => {
      item.classList.remove("tabheader__item_active");
    });
  }

  function showTabContent(i = 0) {
    tabsContent[i].style.display = "block"; // показуємо таб
    tabs[i].classList.add("tabheader__item_active"); // додаємо клас active
  }

  hideTabContent(); // приховуємо
  showTabContent(); // показуємо

  // якщо функція визветься без аргумента то по замовч. буде i = 0)
  // 0 перший слайд . i - аргумент який передається в функцію showTabContent();

  // 3. Назначаємо обробник подій на таби (меню) за допомогою делегування подій

  tabsParanth.addEventListener("click", (event) => {
    const target = event.target;

    if (target && target.classList.contains("tabheader__item")) {
      // по синтакс. forEach - item - елемент  , i - номер попордку

      tabs.forEach((item, i) => {
        if (target == item) {
          hideTabContent(); // приховуємо
          showTabContent(i); // показуємо
        }
      });
    }
  });

  // якщо ми часто використовуємо event target то ми його можемо перевизначити в змінну

  // ------------------------------------------------------------
  /*
 Коли ми клікнули в визначений пункт меню ми повинні визнасити його номер в списку всіх табів 
 і по цьому номеру викликати функцію  showTabContent() . Ми використаємо метод перебору 
 Ми переберемо всі таби які лежать в змінній tabs - псевдомасив . Будемо порівнювати 
 Якщо елемент псевдомасиву співпадає із елементом на корий клікнув користувач тоді ми беремо 
 його номер та показуємо на сторінці .


*/

  // 1. Нам потрібна функція котра буде приховувати не потрібні таби
  // 2. Показати потрібний таб
  // 3. Назначити обробник подій на таби (меню)

  //-----------------------------------------------------------------------------------------------

  // Робота із датами . Timer

  // 1. У нас повинна бути функція яка буде встановлювати наш  таймер
  // 2. Друга функція буде визначати різницю між датою коритстувача та дедлайном
  // 3. Обновлення нашого таймера

  // Є два типи таймерів
  /*

    Перший запускається коли користувач заходить на сайт і орієнтується тльки на нього
    Другий чесний таймер . Відраховує реальний дедлайн 

 */

  const deadline = "2022-11-11";

  function getTimeRemaining(endtime) {
    const t = Date.parse(endtime) - Date.parse(new Date()),
      days = Math.floor(t / (1000 * 60 * 60 * 24)),
      seconds = Math.floor((t / 1000) % 60),
      minutes = Math.floor((t / 1000 / 60) % 60),
      hours = Math.floor((t / (1000 * 60 * 60)) % 24);

    return {
      total: t,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  }

  function getZero(num) {
    if (num >= 0 && num < 10) {
      return "0" + num;
    } else {
      return num;
    }
  }

  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector("#days"),
      hours = timer.querySelector("#hours"),
      minutes = timer.querySelector("#minutes"),
      seconds = timer.querySelector("#seconds"),
      timeInterval = setInterval(updateClock, 1000);

    updateClock();

    function updateClock() {
      const t = getTimeRemaining(endtime);

      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);

      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }

  setClock(".timer", deadline);

  //

  class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector) {
      this.src = src;
      this.alt = alt;
      this.descr = descr;
      this.title = title;
      this.price = price;
      this.parent = document.querySelector(parentSelector);
      this.transfer = 27;
      this.changeToUAH();
    }

    changeToUAH() {
      this.price = this.price * this.transfer;
    }

    render() {
      const element = document.createElement("div");
      element.innerHTML = `
        <div class="menu__item">
        <img src= ${this.src} alt= ${this.alt}>
        <h3 class="menu__item-subtitle">${this.title}</h3>
        <div class="menu__item-descr">${this.descr}</div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
            <div class="menu__item-cost">Цена:</div>
            <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
        </div>
    </div>`;

      this.parent.append(element);
    }
  }

  new MenuCard(
    "img/tabs/vegy.jpg",
    "vegy",
    'Меню "Фитнес"',
    'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    9,
    ".menu .container"
  ).render();

  new MenuCard(
    "img/tabs/post.jpg",
    "post",
    'Меню "Постное"',
    "Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.",
    14,
    ".menu .container"
  ).render();

  new MenuCard(
    "img/tabs/elite.jpg",
    "elite",
    "Меню “Премиум”",
    "В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!",
    21,
    ".menu .container"
  ).render();

  // slider

  const slides = document.querySelectorAll(".offer__slide"),
    // зберігаємо кожен слайд в зміннуp
    prev = document.querySelector(".offer__slider-prev"),
    next = document.querySelector(".offer__slider-next");

  let slideIndex = 1;

  showSlides(slideIndex);

  function showSlides(n) {
    if (n > slides.length) {
      slideIndex = 1;
    }

    if (n < 1) {
      slideIndex = slides.length;
    }

    slides.forEach(item => item.style.display = "none");

    slides[slideIndex - 1].style.display = "block";
  }

  function plusSlides(n) {
    showSlides(slideIndex += n);
  }

  prev.addEventListener("click", () => {
    plusSlides(-1);
  });

  next.addEventListener("click", () => {
    plusSlides(1);
  });
});
