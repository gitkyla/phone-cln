document.addEventListener('DOMContentLoaded', () => {
  const content = document.querySelector('.content');
  const topbar = document.querySelector('.topbar');
  const homePage = document.createElement('div');
  const slideTop = document.createElement('div');

  function topBar() {
    topbar.addEventListener('click', () => {
      topbar.style.display = 'none';
      homePage.style.display = 'none';

      fetch('content/navtop.html')
        .then((res) => {
          return res.text();
        })
        .then((data) => {
          // Style
          slideTop.innerHTML = data;
          homePage.style.display = 'none';
          slideTop.style.display = 'block';

          // Appenchild
          content.appendChild(slideTop);

          // Show Clock & Date
          nowDate();

          let tl = gsap.timeline();

          const close = document.querySelector('.close');

          close.addEventListener('click', () => {
            tl.fromTo(
              '.slidetop',
              { y: '0%' },
              { y: '-120%', duration: 0.5, ease: Power2.easeInOut }
            );

            setTimeout(() => {
              slideTop.style.display = 'none';
              topbar.style.display = 'flex';
              homePage.style.display = 'block';
            }, 500);
          });

          tl.fromTo(
            '.slidetop',
            { y: '-100%' },
            { y: '0%', duration: 0.5, ease: Power2.easeInOut }
          );
        });
    });
  }

  function fetchHome() {
    fetch('content/homepage.html')
      .then((res) => {
        return res.text();
      })
      .then((data) => {
        //Style

        homePage.innerHTML = data;
        homePage.classList.add('missing');

        content.appendChild(homePage);
        nowTime();
        topBar();
      });
  }

  function nowTime() {
    setInterval(() => {
      let momentNow = moment();

      let tanggalJam = momentNow.format('HH mm');
      const clocks = document.querySelector('.clock');

      clocks.innerHTML = tanggalJam;
    }, 100);
  }

  function nowDate() {
    setInterval(() => {
      let momentNow = moment();

      let day = momentNow.format('MMMM Do');
      let tanggalJam = momentNow.format('HH mm');

      const jam = document.querySelector('.jam');
      const date = document.querySelector('.date');

      jam.innerHTML = tanggalJam;
      date.innerHTML = day;
    }, 100);
  }

  fetchHome();
});
