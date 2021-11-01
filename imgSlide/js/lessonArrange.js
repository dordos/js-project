(() => {
  window.LESSON_ARRANGE = window.LESSON_ARRANGE || {};

  function getEl(target, parent = document) {
    return Array.prototype.map.call(parent.querySelectorAll(target), (dom) => dom);
  }

  const isMobile = () => {
    return navigator.userAgent.match(/iPad|iPhone|iPod|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i) != null;
  }

  function next(__container) {
    const tabButtons = getEl('.tabTitle > li', __container);
    const tabPages = getEl('.tabContent > div', __container);
    let currentIndex;

    tabButtons.forEach((button, index) => {
      if (button.classList.contains(TEXT_SELECTED)) currentIndex = button.getAttribute('data-tab') - 0;
    });
    
    tabButtons[currentIndex-1].classList.remove(TEXT_SELECTED);
    tabPages[currentIndex-1].classList.remove(TEXT_SELECTED);
    tabPages[currentIndex-1].style.display = 'none';

    tabButtons[currentIndex].classList.add(TEXT_SELECTED);
    tabPages[currentIndex].classList.add(TEXT_SELECTED);
    tabPages[currentIndex].style.display = 'block';

    /* window.assessmentItem.forEach((quiz) => {
      if (quiz.type === 'drawLine') quiz.drawAnsweredLine();
    }) */
  }

  function retryInput(__container) {
    const elements = getEl('textarea', __container).concat(getEl('input', __container));
    elements.forEach((__el) => {
      if (__el.hasAttribute(ATTR_NO_TRY)) return;
      else {
        __el.value = '';
        __el.checked = false;
        // delete user input data
        if (parent.API_ANNOTATION_INPUT_DELETE) parent.API_ANNOTATION_INPUT_DELETE(__el.id);
      }
    });
  }

  function retryCheckText(__container) {
    const elements = getEl('.checkText', __container);
    elements.forEach((__el) => {
      __el.classList.remove('borderD');
    });
  }

  function retryElements({button, page}) {
    // 퀴즈 타입 여러개 제어 할 수 있도록 수정 
    const typeArray = button.dataset.retryBtn 
      ? button.dataset.retryBtn.replace(/ /g, '').split(',') 
      : ['input'];
      
    typeArray.forEach((type) => {
      switch(type) {
        case 'input':
          retryInput(page);
          break;
        case 'checkText':
          retryCheckText(page);
          break;
      }

      window.LESSON_ARRANGE[type] && window.LESSON_ARRANGE[type]();
    });
  }

  const detectMobile = (event, callback) => {
    // 모바일 환경에서 마우스 이벤트가 실행되는 경우 return 
    if (isMobile() && event.type.indexOf('touch') < 0) return;
    callback(event);
  }

  class LessonArrange {
    constructor({container, page}) {
      this.binding();

      this.container = container;
      this.page = page;
      this.exampleBox = page.querySelector(`.${CLASS_ANSWERBOX}`);
      this.examButton = page.querySelector(`.${CLASS_EXANSWER_BUTTON}`);
      this.retryButton = page.querySelector(`.${CLASS_EXANSWER_BUTTON}.retry`);
      this.nextButton = page.querySelector(`.${CLASS_NEXT_BUTTON}`);

      this.init();
    }

    binding() {
      this.showExample = this.showExample.bind(this);
      this.retry = this.retry.bind(this);
    }

    showExample() {
      this.page.classList.add(TEXT_BLOCKED);
      this.examButton.classList.add(TEXT_HIDE);
      this.retryButton.classList.add(TEXT_SHOW);
      this.exampleBox.classList.add(TEXT_SHOW);
      this.nextButton && this.nextButton.classList.add(TEXT_SHOW);
    }

    retry() {
      this.page.classList.remove(TEXT_BLOCKED);
      this.examButton.classList.remove(TEXT_HIDE);
      this.retryButton.classList.remove(TEXT_SHOW);
      this.exampleBox.classList.remove(TEXT_SHOW);
      this.nextButton && this.nextButton.classList.remove(TEXT_SHOW);

      retryElements({
        button: this.retryButton,
        page: this.page
      });
    }

    init() {
      this.examButton.addEventListener('click', (event) => {
        detectMobile(event, this.showExample);
      });
      this.examButton.addEventListener('touchstart', (event) => {
        detectMobile(event, this.showExample);
      });
      this.retryButton.addEventListener('click', (event) => {
        detectMobile(event, this.retry);
      });
      this.retryButton.addEventListener('touchstart', (event) => {
        detectMobile(event, this.retry);
      });
    }
  }

  const ATTR_LESSON_ARRANGE = 'data-lesson-arrange';
  const ATTR_NO_TRY = 'data-no-retry';

  const CLASS_POPUP_LIST = 'popupList';
  const CLASS_ANSWERBOX = 'answerBox';
  const CLASS_EXANSWER_BUTTON = 'exanswerBtn';
  const CLASS_NEXT_BUTTON = 'nextBtn';

  const TEXT_HIDE = 'hide';
  const TEXT_SHOW = 'show';
  const TEXT_SELECTED = 'selected';
  const TEXT_BLOCKED = 'blocked';

  window.addEventListener('load', () => {
    const container = getEl(`[${ATTR_LESSON_ARRANGE}]`)[0];
    const popupListArray = getEl(`.${CLASS_POPUP_LIST}`, container);
    const nextBtns = getEl(`.${CLASS_NEXT_BUTTON}`, container);

    popupListArray.forEach((page) => {
      new LessonArrange({container, page});
    });

    nextBtns.forEach((button) => {
      button.addEventListener('click', (event) => {
        detectMobile(event, next.bind(null, container));
      });
      button.addEventListener('touchstart', (event) => {
        detectMobile(event, next.bind(null, container));
      });
    });
  });
})();