const scrollEventClass = {
  fadeInLeft: 'animate__fadeInLeft',
  fadeInRight: 'animate__fadeInRight',
  fadeInDown: 'animate__fadeInDown',
  fadeInUp: 'animate__fadeInUp',
};

const sectionIds = [
  '#header',
  '#navbar',
  '#home',
  '#company-info',
  '#order-online',
  '#produce',
  '#contact',
  '#footer',
];
const sections = sectionIds.map((id) => document.querySelector(id));

const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.3,
};

const animationList = [
  '.fadeInLeft',
  '.fadeInDown',
  '.fadeInRight',
  '.fadeInUp',
];

// animate__

const observerCallback = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll(animationList).forEach((item) => {
        item.className = item.className.replace(
          /(fadeInUp|fadeInDown|fadeInLeft|fadeInRight)/g,
          'animate__$1'
        );
      });
    }
  });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);
sections.forEach((section) => observer.observe(section));
