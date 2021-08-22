// Element Selectors
const slidingFacts = document.querySelectorAll('.fact');
const rubbishItems = document.querySelectorAll('.rubbish-item:not(.--active)');

// Event Listeners

window.addEventListener('scroll',debounce(triggerScrollAnimations))

// Control Variables
const {documentElement: doc,body: bod} = document;
const fullPageLength = Math.max(bod.scrollHeight, bod.offsetHeight, doc.clientHeight, doc.scrollHeight, doc.offsetHeight)
const toggleScroll = (fullPageLength - window.innerHeight) / rubbishItems.length;
let togglePosition = window.innerHeight + toggleScroll;
let prevScroll = 0;
let isScrollingDown = true; 

// Functions

function debounce(func, wait=20, immediate = true){
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

function triggerScrollAnimations(){
  // fullPageLength added here as recalculations are required
  const fullPageLength = Math.max(bod.scrollHeight, bod.offsetHeight, doc.clientHeight, doc.scrollHeight, doc.offsetHeight)
  const currentScroll = window.pageYOffset;
  currentScroll >= prevScroll ? (isScrollingDown = true): (isScrollingDown = false);
  prevScroll = currentScroll;
  let inactiveRubbishItems = document.querySelectorAll('.rubbish-item:not(.--active)');
  let activeRubbishItems = document.querySelectorAll('.rubbish-item.--active');

  slidingFacts.forEach(fact => {
    const slideInAt = (currentScroll + window.innerHeight) - fact.offsetHeight / 2;
    const factBottom = fact.offsetTop + fact.offsetHeight;
    const isHalfShown = slideInAt > fact.offsetTop;
    const isNotScrolledPast = currentScroll < factBottom;
    if (isHalfShown && isNotScrolledPast) {
      fact.classList.add('--active');
    } else {
      fact.classList.remove('--active');
    }
  }) 
  if (isScrollingDown) {
    if (!inactiveRubbishItems.length) return;
    if(currentScroll >= togglePosition) {
      inactiveRubbishItems[0].classList.add('--active');
      togglePosition += toggleScroll;
    }
  } else {
    if (!activeRubbishItems.length) return;
    if (currentScroll <= togglePosition) {
      console.log('I ran and am toggling');
      activeRubbishItems[activeRubbishItems.length-1].classList.remove('--active');
      togglePosition -= toggleScroll
    }
  }
  if (currentScroll <= window.innerHeight && activeRubbishItems.length) {
    activeRubbishItems.forEach(item => item.classList.remove('--active'))
  }
  if (currentScroll > (fullPageLength-window.innerHeight)*.9 && inactiveRubbishItems.length) {
    inactiveRubbishItems.forEach(item => item.classList.add('--active'))
  }
  console.log('currentScroll',currentScroll);
  console.log('fullPageLength',fullPageLength - window.innerHeight);
}