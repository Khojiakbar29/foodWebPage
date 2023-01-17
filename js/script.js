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
})