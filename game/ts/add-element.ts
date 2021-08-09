import { randomOf } from "@reverse/random";
import { Elem } from "../../shared/elem";
import { escapeHTML } from "../../shared/shared";
import { getAPI } from "./api";
import { getClassFromDisplay } from "./element-color";
import { elementContainer, setSuggestResult, setTutorial2Visible, suggestContainer, suggestHint, suggestLeftElem, suggestOther1Downvote, suggestOther1Elem, suggestOther2Downvote, suggestOther2Elem, suggestOther3Downvote, suggestOther3Elem, suggestOtherHeader, suggestResultElem, suggestRightElem } from "./element-game";
import { elementPopAnimation } from "./element-game/element-animations";
import { elemClick, elemContextMenu } from "./element-handlers";
import { getConfigBoolean, setElementAsOwned } from "./savefile";
import { incrementStatistic } from "./statistics";
import { ElementDom, formatCategory, updateSuggestion } from "./utils";

// Adds an element and has most element logic
export function createElement(element: Elem, sourceLocation?: HTMLElement, duringLoad?: boolean): any[] {
  if(!element) return;
  let escapedId = String(element.id).replace(/\n/g, "n");
  escapedId = escapedId.replace(/"/g, "'");
  const alreadyExistingDom = document.querySelector(`[data-element="${escapedId}"]`) as HTMLElement;
  
  if (alreadyExistingDom) {
    incrementStatistic('rediscoveries');

    if(!sourceLocation) {
      if (!alreadyExistingDom.classList.contains('animate-bounce')) {
        alreadyExistingDom.classList.add('animate-bounce');
        setTimeout(() => {
          alreadyExistingDom.classList.remove('animate-bounce');
        }, 600);
      }
    } else {
      elementPopAnimation(element, sourceLocation, alreadyExistingDom, false);
    }
    return;
  } else {
    if (!duringLoad) {
      setElementAsOwned(getAPI(), element.id);
    }
  }

  const dom = ElementDom(element);

  dom.addEventListener('click', async(ev) => {
    elemClick(ev, dom, element);
  });

  dom.addEventListener('contextmenu', async(ev) => {
    elemContextMenu(ev, element, dom);
  });

  dom.setAttribute('data-element', escapedId);

  const categoryName = element.display.categoryName || element.display.color || 'none';
  let categoryDiv = elementContainer.querySelector(`[data-category="${categoryName}"]`);
  if (!categoryDiv) {
    const header = document.createElement('h3');
    header.classList.add('category-header')
    header.appendChild(document.createTextNode(formatCategory(categoryName)));
    elementContainer.appendChild(header);
    categoryDiv = document.createElement('div');
    categoryDiv.setAttribute('data-category', categoryName);
    elementContainer.appendChild(categoryDiv);
  }

  if(sourceLocation) {
    dom.style.opacity = '0';
  } else {
    dom.classList.add('animate-in');
    setTimeout(() => {
      dom.classList.remove('animate-in');
    }, 1000);
  }

  return [categoryDiv, dom];
}

export function addElementToGame(element: Elem, sourceLocation?: HTMLElement, duringLoad?: boolean) {
  let doms = createElement(element, sourceLocation, duringLoad);
  doms[0].appendChild(doms[1]);
  if(sourceLocation) {
    elementPopAnimation(element, sourceLocation, doms[1], true).then(() => {
      doms[1].style.opacity = '1';
    })
  }
}

export function showSuggestion(element: Elem, element2: Elem) {
  const [base, saturation, lightness] = randomOf([element, element2]).display.color.split('_');
          
  setSuggestResult({
    color: {
      base: base as any,
      lightness: parseFloat(lightness),
      saturation: parseFloat(saturation),
    },
    text:'New Element'
  }, element, element2)

  suggestLeftElem.innerHTML = escapeHTML(element.display.text);
  suggestLeftElem.className = `elem ${getClassFromDisplay(element.display)}`;
  suggestRightElem.innerHTML = escapeHTML(element2.display.text);
  suggestRightElem.className = `elem ${getClassFromDisplay(element2.display)}`;

  document.querySelector('[data-suggest-prompt="left"]').innerHTML = escapeHTML(element.display.text);
  document.querySelector('[data-suggest-prompt="right"]').innerHTML = escapeHTML(element2.display.text);

  suggestResultElem.style.display = '';

  updateSuggestion();

  suggestContainer.classList.add('animate-prompt');
  suggestContainer.style.width = '';
  suggestContainer.style.width = (suggestContainer.offsetWidth+5) + 'px'

  suggestOtherHeader.classList.add('no');
  suggestOther1Elem.classList.add('no');
  suggestOther1Downvote.classList.add('no');
  suggestOther2Elem.classList.add('no');
  suggestOther2Downvote.classList.add('no');
  suggestOther3Elem.classList.add('no');
  suggestOther3Downvote.classList.add('no');

  suggestHint.classList.add('animate-in');
  if (!getConfigBoolean('tutorial2', false)) {
    setTutorial2Visible(true);
    document.querySelector('#tutorial2').classList.add('tutorial-visible');
    (document.querySelector('#tutorial2') as HTMLElement).style.display = 'block';
  }
  if (getConfigBoolean('always-suggest', false)) {
    suggestContainer.style.width = '486px'
    document.querySelector('.suggest-label').dispatchEvent(new MouseEvent('click'));
  }
}
