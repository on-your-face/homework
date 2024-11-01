(function () {
    document.addEventListener('click', burgerInit)
    function burgerInit(e) {
        const burgerIcon = e.target.closest('.burger__icon');
        const burgerNavLink = e.target.closest('.nav__link');

        if (!burgerIcon && !burgerNavLink) return
        if (document.documentElement.clientWidth > 900) return

        if (!document.body.classList.contains('body--opened-menu')) {
            document.body.classList.add('body--opened-menu')
        } else {
            document.body.classList.remove('body--opened-menu')
        }
    }

    // modal

    // Объявляем переменные, записываем в них нужные элементы.

    const modal = document.querySelector('.modal')
    const modalButton = document.querySelector('.about__img-button')

    // Задаём переменным слушатель событий. В данном случае — клик.

    modalButton.addEventListener('click', openModal)
    modal.addEventListener('click', clouseModal)

    // Задаём функции при событии.

    function openModal(e) {
        e.preventDefault() // Отменяем дефолтное поведение.
        document.body.classList.toggle('body--modal-opened') // Добавляем к тегу body нужный класс.
    }

    function clouseModal(e) {
        e.preventDefault() // Отменяем дефолтное поведение.

        const target = e.target // Объявляем новую переменную, в которую добавляем само модальное окно, на которое мы будем кликать.

        // Задаём нужные условия для закрытия модального окна. В данном случае должно сработать одно из них.
        {
            // Здесь должен быть либо сам заданный класс, либо его родитель.
            if (target.closest('.modal__cancel')
                ||
                // Здесь мы выбираем нужные класс, по которому нужно кликнуть для выполнения того же условия. Здесь имеется в виду именно сам класс modal. Дочерние элементы в счёт не идут.
                target.classList.contains('modal')) {
                document.body.classList.remove('body--modal-opened')
            }
        }

    }

    // Tabs

    const tabControls = document.querySelector('.tab-controls')

    tabControls.addEventListener('click', toggleTab)

    function toggleTab(e) {

        const tabControl = e.target.closest('.tab-controls__link')

        if (!tabControl) return
        e.preventDefault()
        if (tabControl.classList.contains('tab-controls__link--active')) return

        const tabContentID = tabControl.getAttribute('href')
        const tabContent = document.querySelector(tabContentID)
        const activeControl = document.querySelector('.tab-controls__link--active')
        const activeContent = document.querySelector('.tab-content--show')

        if (activeControl) {
            activeControl.classList.remove('tab-controls__link--active')
        }
        if (activeContent) {
            activeContent.classList.remove('tab-content--show')
        }

        tabControl.classList.add('tab-controls__link--active')
        tabContent.classList.add('tab-content--show')


    }

    // Аккордеон

    const accordionLists = document.querySelectorAll('.accordion-list');

    accordionLists.forEach((accordionList) => {
        accordionList.addEventListener('click', (e) => {
            const accordionControl = e.target.closest('.accordion-list__control');
            if (!accordionControl) return;

            // Закрываем все аккордеоны, кроме текущего
            accordionLists.forEach((otherList) => {
                if (otherList !== accordionList) {
                    const openedItem = otherList.querySelector('.accordion-list__item--opened');
                    if (openedItem) {
                        openedItem.classList.remove('accordion-list__item--opened');
                        openedItem.querySelector('.accordion-list__control').nextElementSibling.style.maxHeight = null;
                    }
                }
            });

            const accordionItem = accordionControl.parentElement;
            const accordionContent = accordionControl.nextElementSibling;

            // Переключаем состояние текущего аккордеона
            const isOpen = accordionItem.classList.toggle('accordion-list__item--opened');
            accordionContent.style.maxHeight = isOpen ? accordionContent.scrollHeight + 'px' : null;
        });
    });

    // Слайдер-галерея

    new Swiper('.gallery__slider', {
        spaceBetween: 15,
        slidesPerView: 1.5,
      
        // If we need pagination
        pagination: {
          el: '.gallery__pagination',
          type: 'fraction'
        },
      
        // Navigation arrows
        navigation: {
          nextEl: '.gallery__next',
          prevEl: '.gallery__prev',
        },

        breakpoints: {
            
            601 : {
                slidesPerView: 3,
            },

            801 : {
                spaceBetween: 32,
            },
            
            1101: {
              slidesPerView: 4,
            }
          }
      });

      // Слайдер-отзывы

    new Swiper('.testimonials__slider', {
        spaceBetween: 0,
        slidesPerView: 1,
        centeredSlides: true,

        // Navigation arrows
        navigation: {
            nextEl: '.testimonials__next',
            prevEl: '.testimonials__prev',
        },

        scrollbar: {
            el: '.swiper-scrollbar',
            draggable: true,
        },

        breakpoints: {

            

            901: {
                slidesPerView: 1.5,
            },

            1201: {
                slidesPerView: 2.1,
            }
        }
    });

    // Маска для телефона

    const telInputs = document.querySelectorAll('input[type="tel"]')

    const im = new Inputmask('+7 (999) 999-99-99')
    im.mask(telInputs)

})()

