window.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector('.tabheader__items');


    function hideTabContent() {
        tabsContent.forEach(item => {
            item.style.display = 'none'
        });

        tabs.forEach(elem => {
            elem.classList.remove('tabheader__item_active')
        });
    }
    function showTabContent(i = 0) {
        tabsContent[i].style.display = 'block';
        tabs[i].classList.add('tabheader__item_active')
    }
    
    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
          const target = event.target;  

        if (target && target.classList.contains('tabheader__item')) {

            tabs.forEach((item, i) => {
                if(target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            })
        }
    })

    const deadline = '2023-02-06'

    function getTimeRemaining(finalTime) {
        const t = Date.parse(finalTime) - Date.parse(new Date()),
              days = Math.floor(t / (1000 * 60 * 60 * 24)),
              hours = Math.floor((t / (1000 * 60 * 60) % 24)),
              minutes = Math.floor((t / 1000 /60) % 60),
              seconds = Math.floor((t / 1000) % 60);
        return {
            'total' : t, 
            'days' : days,
            'hours' : hours,
            'minutes' : minutes,
            'seconds' : seconds
        }      
    }

    function setClock(selector, finalTime) {
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds');
              timeInterval = setInterval(updateClock, 1000);
        updateClock();
        function updateClock() {
            const t = getTimeRemaining(finalTime)
            days.innerHTML = t.days;
            hours.innerHTML = t.hours;
            minutes.innerHTML = t.minutes;
            seconds.innerHTML = t.seconds;

            
            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }

    }
    setClock('.timer', deadline);
    
    //Modal

    const modalTrigger = document.querySelectorAll('[data-modal]'),
          modal = document.querySelector('.modal'),
          modalCloseBtn = document.querySelector('[data-close]');
     
    modalTrigger.forEach(btn => {
        btn.addEventListener('click', () => {
            modal.classList.add('show');
            modal.classList.remove('hide');

            document.body.style.overflow = 'hidden';
        })
    })
    
    modalCloseBtn.addEventListener('click', () => {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    })

    //Using classes for carts
    class MenuCard {
        constructor (src, alt, title, descr, price, parentSelector) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.parent = document.querySelector(parentSelector);
        }
        rendor() {
            const element = document.createElement('div');
            element.innerHTML = `
            <div class="menu__item">
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Price:</div>
                    <div class="menu__item-total"><span>${this.price}</span> PLN/day</div>
                </div>
            </div>
            `
            this.parent.append(element);
        }
    }
    
    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'The "Fitness" menu',
        'The Fitness menu is a new approach to cooking: more fresh vegetables and fruits. The product of active and healthy people. This is a brand new product with an optimal price and high quality!',
        229,
        '.menu .container'
    ).rendor();

    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        'The "Premium" Menu',
        'In the Premium menu, we use not only beautiful packaging design, but also high-quality execution of dishes. Red fish, seafood, fruits - restaurant menu without going to a restaurant!',
        550,
        '.menu .container'
    ).rendor();

    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        'The "Lean" menu',
        'The “Lean” menu is a careful selection of ingredients: complete absence of animal products, milk from almonds, oats, coconut or buckwheat, the right amount of protein due to tofu and imported vegetarian steaks.',
        430,
        '.menu .container'
    ).rendor();
    

    //Collection Data from Forms

    const forms = document.querySelectorAll('form')

    const messages = {
        loading: 'Loading',
        success: 'Thank you! We will contact you soon',
        failure: 'Something wrong!'
    }

    forms.forEach(item => {
        postData(item);
    })

    function postData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('div');
            statusMessage.textContent = messages.loading;
            form.append(statusMessage);

            const request = new XMLHttpRequest();
            request.open('POST', 'server.php');


            request.setRequestHeader('Content-type', 'application/json')

            const formData = new FormData(form);

            const object = {};
            formData.forEach(function(value, key) {
                object[key] = value;
            })

            const json = JSON.stringify(object);


            request.send(json);
            request.addEventListener('load', () => {
                if (request.status === 200) {
                    console.log(request.response);
                    statusMessage.textContent = messages.success
                    form.reset();
                    setTimeout(() => {
                        statusMessage.remove();
                    }, 2000)
                } else {
                    statusMessage.textContent = messages.failure;
                }
            })
        })
    }
})