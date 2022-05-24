(() => {
  /* scale */
  const initScale = (element) => {
    function getContainerSize() {
      return {
        width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
        height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
      };
    }

    function getZoomRate({containerSize, target}) {
      const containerWidth = containerSize.width;
      const containerHeight = containerSize.height;
      const horizontalValue = containerWidth / target.width;
      const verticalValue = containerHeight / target.height;

      return target.width * verticalValue > containerWidth ? horizontalValue : verticalValue;
    }

    function getLeftValue({containerSize, target, zoomRate}) {
      return (containerSize.width - (target.width * zoomRate)) / 2;
    }

    function setTransform({zoomRate, leftValue, element}) {
      const style = element.style;

      style.transform = `scale(${zoomRate})`;
      style.MsTransform = `scale(${zoomRate})`;
      style.MozTransform = `scale(${zoomRate})`;
      style.WebkitTransform = `scale(${zoomRate})`;
      
      style.transformOrigin = '0% 0%';
      style.MsTransformOrigin = '0% 0%';
      style.MozTransformOrigin = '0% 0%';
      style.WebkitTransformOrigin = '0% 0%';

      style.left = `${leftValue}px`;
    }

    const target = {
      width: element.clientWidth,
      height: element.clientHeight
    }
    
    const setScale = () => {
      const containerSize = getContainerSize();
      const zoomRate = getZoomRate({containerSize, target});
      const leftValue = getLeftValue({containerSize, target, zoomRate});

      setTransform({zoomRate, leftValue, element});
    }

    setScale();
    window.addEventListener('resize', setScale);
  }
  /* END scale */

  /* utils */
  const getEl = (target, convert = true, parentNode = document) => {
    const array = [];
    const nodeList = parentNode.querySelectorAll(target);

    for (let i = 0; i < nodeList.length; i++) array.push(nodeList[i]);
    
    const convertArray = array.map((node) => node ? new ConvertObject(node) : null);
    const resultArray = convert ? convertArray : array;

    return resultArray.length > 1 ? resultArray : resultArray[0];
  }

  const getZoomRate = (DOM) => {
    return getBoundingData(DOM).width / DOM.offsetWidth;
  }

  const getEventPosition = (event) => {
    const eventTarget = isTouchEvent(event) 
      ? (event.changedTouches[0] || event.touches[0]) 
      : event;

    return {
      x: eventTarget.clientX, 
      y: eventTarget.clientY
    }
  }

  const getElementFromPoint = (event) => {
    return document.elementFromPoint(getEventPosition(event).x, getEventPosition(event).y);
  }

  const getBoundingData = (DOM) => {
    return {
      x: DOM.getBoundingClientRect().left,
      y: DOM.getBoundingClientRect().top,
      width: DOM.getBoundingClientRect().width,
      height: DOM.getBoundingClientRect().height,
    }
  }

  const addHoverEvent = (DOM = null, className = 'hover') => {
    const replaceClassName = (event) => {
      event.stopPropagation();
      event.preventDefault();

      let type;
      switch(event.type) {
        case 'mouseenter':
        case 'mouseover':
        case 'pointerenter':
        case 'touchstart':
          type = 'add';
          break;
        case 'mouseleave':
        case 'mouseout':
        case 'pointerout':
        case 'touchend':
          type = 'remove';
          break;
      }
      DOM.classList[type](className);
    }

    const addEvent = (eType) => {
      const eventTypeArray = eType.split(' ');
      eventTypeArray.forEach((type) => {
        DOM.addEventListener(type, replaceClassName);
      });
    }

    // over
    addEvent('mouseenter mouseover pointerenter touchstart');

    // out
    addEvent('mouseleave mouseout pointerout touchend');
  }

  const appendOnOffFunction = (target, className = 'on') => {
    target.on = () => {
      if (target.addClass) target.addClass(className);
      else target.classList.add(className);
    }
    target.off = () => {
      if (target.removeClass) target.removeClass(className);
      else target.classList.remove(className);
    }
  }

  const createAudio = (name) => {
    const audio = new Audio();
    const sound = {};

    sound.DOM = audio;
    sound.src = `./media/effcet/${name}.mp3`;

    audio.src = sound.src;
    audio.preload = 'metadata';
    audio.load();

    sound.stop = () => {
      audio.pause();
      audio.currentTime = 0;
    }
    sound.play = () => {
      audio.play();
    }
    return sound;
  }

  class ConvertObject {
    constructor(dom) {
      this.DOM = dom;
    }

    get offset() {
      return {
        top: this.DOM.offsetTop,
        left: this.DOM.offsetLeft,
        width: this.DOM.offsetWidth,
        height: this.DOM.offsetHeight,
      }
    }

    get children() {
      const children = Array.prototype.map.call(this.DOM.children, (child) => child);
      return children.map((el) => new ConvertObject(el));
    }

    addClass(className) {
      this.DOM.classList.add(className);
    }

    removeClass(className) {
      this.DOM.classList.remove(className);
    }

    setEvent(eType, callback, listenertype = 'add') {
      const eventTypeArray = eType.split(' ');
      eventTypeArray.forEach((type) => {
        if (listenertype === 'add') this.DOM.addEventListener(type, callback);
        else this.DOM.removeEventListener(type, callback);
      });
    }

    setStyle(name, value) {
      this.DOM.style[name] = value;
    }

    attr() {
      switch (arguments.length) {
        case 1:
          return this.DOM.getAttribute(arguments[0]);
        case 2:
          this.DOM.setAttribute(arguments[0], arguments[1]);
          break;
      }
    }

    getEl(target) {
      return getEl(target, true, this.DOM);
    }
  }
  /* END utils */

  /* quiz utils */
  const sendToDTCaliperSensor = (__quiz) => {
    const {
      result, 
      container, 
      convertedAnswer, 
      convertedUserValue, 
      description, 
      pageNumber } = __quiz;

    // ------------------------------------------------------------------ //
      console.log('correct: ', result);
      console.log('itemObject: ', container.DOM);
      console.log('value: ', convertedAnswer);
      console.log('userValue: ', convertedUserValue);
      console.log('description: ', description);
      console.log('pageNumber: ', pageNumber);
    // ------------------------------------------------------------------ //
    
    DTCaliperSensor.fire({
      correct: result,             // 정답 여부(boolean)
      itemObject: container.DOM,      // 해당 문항 객체
      value: convertedAnswer,         // 실제 정답 데이터 === <correctResponse>
      userValue: convertedUserValue,  // 유저가 실제로 입력한 값
      description: description,       // 문항에 대한 설명
      pageNumber: pageNumber          // 교과서 페이지(number)
    });
  }

  const resetUserValue = (input) => {
    const passId = [];
    input.forEach(function({checked, id}){
      checked = false;
      passId.push(id);
    });
  }

  const watchProperty = (watching) => {
    let index = 0;
    const interval = setInterval(function () {
      index++;
      watching();

      // 실행 후 1초 뒤 interval 종료
      if (index > 10) {
        console.log('end watchProperty!');
        clearInterval(interval);
      }
    }, 100);
  }

  const next = () => {
    const tabButtons = getEl('.bigPopup .tabTitle > li');
    const tabPages = getEl('.bigPopup .tabContent > div');
    let currentIndex;

    tabButtons.forEach((button, index) => {
      if (button.DOM.classList.contains(TEXT_SELECTED)) currentIndex = button.attr('data-tab') - 0;

      button.removeClass(TEXT_SELECTED);
      tabPages[index].removeClass(TEXT_SELECTED);
      tabPages[index].setStyle('display', 'none');
    });

    tabButtons[currentIndex].addClass(TEXT_SELECTED);
    tabPages[currentIndex].addClass(TEXT_SELECTED);
    tabPages[currentIndex].setStyle('display', 'block');
  }

  /* const createUserValueInput = (__obj) => {
    const input = document.createElement('input');
    input.type = 'radio';
    input.id = __obj.id;
    input.className = TEXT_USER_VALUE_INPUT;
    input.checked = false;
    __obj.DOM.appendChild(input);
    __obj.userValue = input;
  } */

  const setCallback = (__callback) => {
    const callback = {};
    Object.getOwnPropertyNames(__callback).forEach((property) => {
      callback[property] = __callback[property];
    });
    return callback;
  }
  /* END quiz utils */

  class QUIZ {
    constructor(__quiz) {
      this.quizBinding();

      const {
        answerButton, retryButton, nextButton, hintBox, answerBox,
        feedback_first, feedback_second, feedback_incorrect, feedback_correct,
      } = __quiz;

      retryButton && retryButton.setEvent('click touchstart', this.retry);
      // 다음퀴즈 이동 버튼은 퀴즈와 동작이 연관이 없어서 별도의 함수 사용
      nextButton && nextButton.setEvent('click touchstart', next);

      this.container = __quiz;

      this.uid = __quiz.uid;
      this.type = __quiz.type;
      this.pageNumber = __quiz.pageNumber;
      this.description = __quiz.description;
      this.answerArray = __quiz.answerArray;
      
      this.answerButton = answerButton;
      this.retryButton = retryButton;
      this.nextButton = nextButton;
      this.hintBox = hintBox;
      this.answerBox = answerBox;

      this.feedback = {
        first: feedback_first,
        second: feedback_second,
        incorrect: feedback_incorrect,
        correct: feedback_correct
      }

      const getObject = this.container.getEl(`[${ATTR_QUIZ_OBJ}]`);
      this.objectArray = getObject.length ? getObject : [getObject];

      this.callback = {};
      this.userValue = [];
      this.tryCount = 0;
      this.isIncorrect = false;

      this.setSound();
    }

    get convertedUserValue() {
      return this.userValue.length > 1 
      ? this.userValue.join(', ') 
      : this.userValue.join('');
    }

    get convertedAnswer() {
      return this.answerArray.length > 1 
      ? this.answerArray.join(', ') 
      : this.answerArray.join('');
    }

    quizBinding() {
      this.retry = this.retry.bind(this);
    }

    setStateAnswerButton(__isSolved) {
      // 다시하기 버튼을 누르기 전에는 정답 버튼 안보이도록 수정
      if (this.isIncorrect) return;

      if (__isSolved) this.answerButton.on();
      else this.answerButton.off();
    }

    correct(callback) {
      this.soundPlay('correct');

      this.feedback.correct.on();
      sendToDTCaliperSensor(this);
      this.onOffContainer(true);
      this.finish();

      callback();

      setTimeout(() => {
        this.feedback.correct.off();
      }, 2000);
    }

    incorrect(callback) {
      this.tryCount++;
      this.isIncorrect = true;

      let feedbackIncorrect;
      
      switch (this.tryCount) {
        case 1:
          feedbackIncorrect = this.feedback.first; 
          break;
        case 2:
          feedbackIncorrect = this.feedback.second; 
          this.hintBox.on();
          break;
        case 3:
          feedbackIncorrect = this.feedback.incorrect;
          this.finish();
          break;
      }
      
      this.soundPlay('wrong');
      feedbackIncorrect.on();
      this.onOffContainer(true);
      this.answerButton.off();
      this.retryButton.on();
      callback();

      sendToDTCaliperSensor(this);
      
      setTimeout(() => {
        feedbackIncorrect.off();
      }, 2000);
    }

    checkAnswer(__result, correctCalllback, incorrectCallback) {
      this.result = __result;
      if (__result) this.correct(correctCalllback);
      else this.incorrect(incorrectCallback);
    }

    onOffContainer(value) {
      if (value) this.container.addClass(TEXT_LOCK);
      else this.container.removeClass(TEXT_LOCK);
    }

    finish() {
      this.tryCount = 0;
      this.onOffContainer(true);
      this.answerButton.off();
      this.retryButton.on();
      this.hintBox.off();
      this.answerBox.on();
      this.nextButton && this.nextButton.on();

      this.callback.finish && this.callback.finish(this);
    }

    retry() {
      this.isIncorrect = false;
      this.onOffContainer(false);
      this.userValue = [];
      this.answerButton.off();
      this.retryButton.off();
      this.hintBox.off();
      this.answerBox.off();
      this.nextButton && this.nextButton.off();

      this.callback.retry && this.callback.retry(this);
    }

    setSound() {
      this.sound = {};
      this.sound.click = createAudio('click');
      this.sound.correct = createAudio('correct');
      this.sound.wrong = createAudio('wrong');
    }

    soundStop() {
      Object.getOwnPropertyNames(this.sound).forEach((property) => {
        this.sound[property].stop();
      });
    }

    soundPlay(name) {
      this.soundStop();
      this.sound[name].play();
    }
  }

  class SINGLECHOICE extends QUIZ {
    constructor(__quiz) {
      super(__quiz);
      this.binding();
      this.init();
    }

    binding() {
      this.reset = this.reset.bind(this);
      this.setAnswer = this.setAnswer.bind(this);
      this.correctCallback = this.correctCallback.bind(this);
      this.incorrectCallback = this.incorrectCallback.bind(this);
    }

    get isSolved() {
      return this.objectArray.filter((obj) => obj.solved).length > 0;
    }

    get isCorrect() {
      return this.objectArray.filter((obj) => {
        if (obj.solved) {
          this.userValue[0] = obj.value;
          if (obj.value === this.answerArray[0]) return obj;
        }
      }).length === this.answerArray.length;
    }

    selectObject(__obj) {
      this.reset();

      __obj.solved = true;
      __obj.userValue.checked = true;

      this.setStateAnswerButton(this.isSolved);
      this.callback.object && this.callback.object(this, __obj);
    }

    reset() {
      this.userValue = [];
      this.objectArray.forEach((obj) => {
        obj.solved = false;
        obj.userValue.checked = false;
      });
    }

    correctCallback() {
      this.callback.correct && this.callback.correct(this);
    }

    incorrectCallback() {
      this.callback.incorrect && this.callback.incorrect(this);
    }

    setAnswer() {
      this.checkAnswer(this.isCorrect, this.correctCallback, this.incorrectCallback);
    }

    init() {
      this.objectArray.forEach((obj, index) => {
        obj.value = obj.attr(ATTR_VALUE);
        obj.userValue = this.container.DOM.querySelector(`#${obj.attr('for')}`);
        obj.setEvent('click touchstart', this.selectObject.bind(this, obj));
      });

      this.answerButton.setEvent('click touchstart', this.setAnswer);
      this.retryButton.setEvent('click touchstart', this.reset);

      if (window.arrangeQuestionCallback.singleChoice) {
        this.callback = setCallback(window.arrangeQuestionCallback.singleChoice);
      }

      watchProperty(() => {
        this.objectArray.forEach((obj) => {
          if (obj.userValue.checked) this.selectObject(obj);
        });
      });
    }
  }

  class MULTICHOICE extends QUIZ {
    constructor(__quiz) {
      super(__quiz);
      this.binding();
    }

    binding() {

    }

    reset() {}
  }

  class TRUEFALSE extends QUIZ {
    constructor(__quiz) {
      super(__quiz);
      this.binding();
      
      this.groupArray = [];

      this.init();
    }

    binding() {
      this.reset = this.reset.bind(this);
      this.setAnswer = this.setAnswer.bind(this);
      this.correctCallback = this.correctCallback.bind(this);
      this.incorrectCallback = this.incorrectCallback.bind(this);
    }

    set currentGroup(index) { this._currentGroup = this.groupArray[index]; }
    get currentGroup() { return this._currentGroup; }

    get isSolved() {
      return this.objectArray.filter((obj) => obj.solved).length > 0;
    }

    get isCorrect() {
      return this.objectArray.filter((obj) => {
        if (obj.solved) {
          this.userValue[obj.index] = obj.value;
          if (obj.value === this.answerArray[obj.index]) return obj;
        }
      }).length === this.answerArray.length;
    }

    groupReset() {
      this.currentGroup.forEach((obj) => {
        obj.off();
        obj.solved = false;
        obj.userValue.checked = false;
      });
    }

    selectObject(__obj) {
      this.currentGroup = __obj.index;
      this.groupReset();

      __obj.on();
      __obj.solved = true;
      __obj.userValue.checked = true;

      this.setStateAnswerButton(this.isSolved);
      this.callback.object && this.callback.object(this, __obj);
    }

    reset() {
      this.groupArray.forEach((group, index) => {
        this.currentGroup = index;
        this.groupReset();
      });
    }

    correctCallback() {
      this.callback.correct && this.callback.correct(this);
    }

    incorrectCallback() {
      this.callback.incorrect && this.callback.incorrect(this);
    }

    setAnswer() {
      this.checkAnswer(this.isCorrect, this.correctCallback, this.incorrectCallback);
    }

    init() {
      this.objectArray.forEach((obj, index) => {
        obj.index = obj.attr(ATTR_QUIZ_OBJ) - 1;
        obj.value = obj.attr(ATTR_VALUE);
        obj.userValue = obj.DOM.querySelector(CLASS_USER_VALUE);

        appendOnOffFunction(obj, TEXT_SELECTED);
        obj.setEvent('click touchstart', this.selectObject.bind(this, obj));

        if (this.groupArray[obj.index] === undefined) {
          this.groupArray[obj.index] = [];
        }
        this.groupArray[obj.index].push(obj);
      });

      this.answerButton.setEvent('click touchstart', this.setAnswer);
      this.retryButton.setEvent('click touchstart', this.reset);

      if (window.arrangeQuestionCallback.trueFalse) {
        this.callback = setCallback(window.arrangeQuestionCallback.trueFalse);
      }

      watchProperty(() => {
        this.objectArray.forEach((obj) => {
          if (obj.userValue.checked) this.selectObject(obj);
        });
      });
    }
  }

  class INPUT extends QUIZ {
    constructor(__quiz) {
      super(__quiz);
      this.binding();
      this.init();
    }

    get isSolved() {
      return this.objectArray.filter((obj) => obj.solved).length > 0;
    }

    get isCorrect() {
      return this.objectArray.filter((obj, index) => {
        this.userValue[index] = obj.DOM.value;
        if (obj.DOM.value === obj.answer) {
          obj.checked = true;
          return obj;
        }
      }).length === this.objectArray.length;
    }

    binding() {
      this.reset = this.reset.bind(this);
      this.setAnswer = this.setAnswer.bind(this);
      this.correctCallback = this.correctCallback.bind(this);
      this.incorrectCallback = this.incorrectCallback.bind(this);
    }

    insertInputValue(__obj) {
      if (__obj.DOM.value.length > 0) __obj.solved = true;
      else __obj.solved = false;

      this.setStateAnswerButton(this.isSolved);
      this.callback.object && this.callback.object(this, __obj);
    }

    clearInput(__input) {
      __input.value = '';
      // delete user input data
      if (parent.API_ANNOTATION_INPUT_DELETE) parent.API_ANNOTATION_INPUT_DELETE(__input.id);
    }

    correctCallback() {
      this.callback.correct && this.callback.correct(this);
    }

    incorrectCallback() {
      this.callback.incorrect && this.callback.incorrect(this);
    }

    setAnswer() {
      this.checkAnswer(this.isCorrect, this.correctCallback, this.incorrectCallback);
    }

    reset() {
      this.objectArray.forEach((obj) => { obj.clear(); });
    }

    init() {
      this.objectArray.forEach((obj, index) => {
        const answer = this.answerArray[index];

        obj.answer = answer;
        obj.attr('autocomplete', `off`);
        obj.clear = () => { this.clearInput(obj.DOM) };
        obj.insertAnswer = () => { obj.DOM.value = answer; };
        obj.setEvent('keyup', this.insertInputValue.bind(this, obj));
      });

      this.answerButton.setEvent('click touchstart', this.setAnswer);
      this.retryButton.setEvent('click touchstart', this.reset);

      if (window.arrangeQuestionCallback.input) {
        this.callback = setCallback(window.arrangeQuestionCallback.input);
      }

      watchProperty(() => {});
    }
  }

  class DRAWLINE extends QUIZ {
    constructor(__quiz) {
      super(__quiz);
      this.binding();
    }

    binding() {

    }

    reset() {}
  }

  class DRAGDROP extends QUIZ {
    constructor(__quiz) {
      super(__quiz);
      this.binding();
    }

    binding() {

    }

    reset() {}
  }

  /* configs */
  const ATTR_QID = 'data-qid';
  const ATTR_INDEX = 'data-index';
  const ATTR_PAGE_NUMBER = 'data-page-number';
  const ATTR_RESPONSE_TYPE = 'data-response-type';
  const ATTR_DESCRIPTION = 'data-description';
  const ATTR_QUIZ_OBJ = 'data-quiz-obj';
  const ATTR_VALUE = 'data-value';

  const CLASS_PAGE = '.page';
  const CLASS_BUTTON_ANSWER = '.confirmBtn';
  const CLASS_BUTTON_RETRY = '.retryBtn';
  const CLASS_BUTTON_NEXT = '.nextBtn';
  const CLASS_FEEDBACK_CORRECT = '.rightCheck';
  const CLASS_FEEDBACK_FIRST = '.firstChallCheck';
  const CLASS_FEEDBACK_SECOND = '.secondChallCheck';
  const CLASS_FEEDBACK_INCORRECT = '.wrongCheck';
  const CLASS_USER_VALUE = '.userValue';
  const CLASS_ANSWERBOX = '.answerBox';

  const TAG_ASSEMBLEITEM = 'assessmentItem';
  const TAG_CORRECTRESPONSE = 'correctResponse';
  const TAG_MODALFEEDBACK = 'modalFeedback';

  const TEXT_SHOW = 'show';
  const TEXT_SELECTED = 'selected';
  const TEXT_LOCK = 'isLock';
  /* END configs */

  // 각 페이지에서 설정 가능한 callback 객체 등록
  window.arrangeQuestionCallback = window.arrangeQuestionCallback || {};
  /* window.arrangeQuestionCallback.input = {
    object: (QUIZ, __obj) => {},
    correct: (QUIZ) => {},
    incorrect: (QUIZ) => {},
    finish: (QUIZ) => {},
    retry: (QUIZ) => {},
  } */

  window.addEventListener('load', () => {
    // test
    // initScale(document.body);

    const pageNumber = getEl(CLASS_PAGE).DOM.innerHTML - 0;
    const assessmentItem = getEl(TAG_ASSEMBLEITEM);

    assessmentItem.forEach((container, index) => {
      const getAnswer = container.getEl(TAG_CORRECTRESPONSE).getEl('span').DOM.innerHTML;

      // uid 부여
      const uid = `p${pageNumber}_arrangeQuiz_${index + 1}`;
      container.uid = uid;
      
      container.type = container.attr(ATTR_RESPONSE_TYPE);
      container.description = container.attr(ATTR_DESCRIPTION);
      container.answerArray = getAnswer.replace(/, /g, ',').split(',');
      container.answerButton = container.getEl(CLASS_BUTTON_ANSWER);
      container.retryButton = container.getEl(CLASS_BUTTON_RETRY);
      container.nextButton = container.getEl(CLASS_BUTTON_NEXT);
      container.feedback_first = container.getEl(CLASS_FEEDBACK_FIRST);
      container.feedback_second = container.getEl(CLASS_FEEDBACK_SECOND);
      container.feedback_incorrect = container.getEl(CLASS_FEEDBACK_INCORRECT);
      container.feedback_correct = container.getEl(CLASS_FEEDBACK_CORRECT);
      container.hintBox = container.getEl(TAG_MODALFEEDBACK);
      container.answerBox = container.getEl(CLASS_ANSWERBOX);
      container.pageNumber = pageNumber;

      /* buttons & feedback event, functions */
      container.feedback_first && appendOnOffFunction(container.feedback_first, TEXT_SHOW);
      container.feedback_second && appendOnOffFunction(container.feedback_second, TEXT_SHOW);
      container.feedback_incorrect && appendOnOffFunction(container.feedback_incorrect, TEXT_SHOW);
      container.feedback_correct && appendOnOffFunction(container.feedback_correct, TEXT_SHOW);
      container.hintBox && appendOnOffFunction(container.hintBox, TEXT_SHOW);
      container.answerBox && appendOnOffFunction(container.answerBox, TEXT_SHOW);
      
      container.answerButton && addHoverEvent(container.answerButton.DOM);
      container.answerButton && appendOnOffFunction(container.answerButton, TEXT_SHOW);
      container.retryButton && addHoverEvent(container.retryButton.DOM);
      container.retryButton && appendOnOffFunction(container.retryButton, TEXT_SHOW);
      container.nextButton && addHoverEvent(container.nextButton.DOM);
      container.nextButton && appendOnOffFunction(container.nextButton, TEXT_SHOW);
      /* END buttons & feedback event, functions */
      
      (() => {
        switch (container.type) {
          case 'singleChoice': new SINGLECHOICE(container); break;
          case 'multipleChoice': new MULTICHOICE(container); break;
          case 'trueFalse': new TRUEFALSE(container); break;
          case 'fillInTheBlank': new INPUT(container); break;
          case 'drawLine': new DRAWLINE(container); break;
          case 'dragdrop': new DRAGDROP(container); break;
          // case 'essay': new DRAGDROP(container); break;
        }
      })();
    });
  });
})();