document.addEventListener('DOMContentLoaded', () => {
  const content = document.querySelector('.content');
  const topbar = document.querySelector('.topbar');
  const homePage = document.createElement('div');
  const slideTop = document.createElement('div');

  // Social
  const instagram = document.querySelector('.instagram');
  const steam = document.querySelector('.steam');
  const soundcluod = document.querySelector('.soundcloud');

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
              { y: '-120%', duration: 0.7, ease: Power2.easeInOut }
            );

            setTimeout(() => {
              slideTop.style.display = 'none';
              topbar.style.display = 'flex';
              homePage.style.display = 'block';

              tl.fromTo(
                '.missing',
                { opacity: '0' },
                { opacity: '1', duration: 0.3, ease: Power2.easeInOut }
              ).fromTo(
                '.topbar',
                { opacity: '0' },
                { opacity: '1', duration: 0.3, ease: Power2.easeInOut },
                '-=0.3'
              );
            }, 700);
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

      if (jam === null) {
        console.log('tes');
      }

      jam.innerHTML = tanggalJam;
      date.innerHTML = day;
    }, 100);
  }

  fetchHome();
});
