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
});

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
