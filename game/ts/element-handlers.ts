import { compactMiniNumber } from "@reverse/compact";
import { capitalize, plural } from "@reverse/string";
import Color from "color";
import { Elem } from "../../shared/elem";
import { delay, escapeHTML, formatDate, sortCombo } from "../../shared/shared";
import { addElementToGame, showSuggestion } from "./add-element";
import { getAPI } from "./api";
import { playSound } from "./audio";
import { getClassFromDisplay, getCSSFromDisplay } from "./element-color";
import { tutorial1visible, holdingElement, setTutorial1Visible, dropHoldingElement, setHoldingRect, setHoldingElement, setHoldingElementDom, holdingRect, infoContainer, setInfoOpen } from "./element-game";
import { elementErrorAnimation } from "./element-game/element-animations";
import { setConfigBoolean } from "./savefile";
import { incrementStatistic } from "./statistics";
import { getElementTree, initTreeCanvas } from "./tree";
import { ElementDom } from "./utils";

export async function elemClick(ev, dom: HTMLDivElement, element: Elem) {
    if (tutorial1visible) {
        document.querySelector('#tutorial1').classList.remove('tutorial-visible');
        setTutorial1Visible(false);
        setConfigBoolean('tutorial1', true);
        setTimeout(() => {
            (document.querySelector('#tutorial1') as HTMLElement).style.display = 'none';
        }, 250);
    }

    if (holdingElement) {
        const id1 = element.id
        const id2 = holdingElement.id
        const element2 = holdingElement;

        const [results] = await Promise.all([
            // Combo Logic, returns elements to add
            (async () => {
                const combo = await getAPI().getCombo(sortCombo(id1, id2));
                if (combo.length === 0) {
                    return null;
                } else {
                    return Promise.all(combo.map(x => getAPI().getElement(x)))
                }
            })(),
            // Play Animation.
            dropHoldingElement(dom),
        ]);

        dom.classList.remove('restock');
        void dom.offsetWidth;
        dom.classList.add('restock');

        if (results) {
            incrementStatistic('combinationsSuccess');
            results.forEach(result => {
                addElementToGame(result, dom);
            });
        } else {
            incrementStatistic('combinationsFailure');
            elementErrorAnimation(dom);

            const api = getAPI('suggestion');
            if (api) {
                showSuggestion(element, element2);
            }
        }
    } else {
        playSound('element.pickup');
        incrementStatistic('elementsPickedUp');
        setHoldingRect(dom.getBoundingClientRect());

        dom.classList.remove('restock');
        void dom.offsetWidth;
        dom.classList.add('restock');

        setHoldingElement(element);

        const holdingDom = ElementDom(element);
        holdingDom.classList.add('held');
        const wrapper = document.createElement('div');
        wrapper.setAttribute(
            'style',
            '--offset-x:' + ((holdingRect.left - 8) - (ev.pageX)) + 'px;'
            + '--offset-y:' + ((holdingRect.top - 8) - (ev.pageY + 4)) + 'px;'
            + 'left:' + ev.pageX + 'px;'
            + 'top:' + (ev.pageY + 4) + 'px'
        )
        wrapper.classList.add('elem-held-wrapper');
        wrapper.appendChild(holdingDom);
        document.body.appendChild(wrapper);
        setHoldingElementDom(wrapper);
    }
}

export async function elemContextMenu(ev, element: Elem, dom: HTMLDivElement) {
    try {
        incrementStatistic('infoOpened');
        
        infoContainer.classList.remove('animate-in');
  
        dropHoldingElement();
        ev.preventDefault();
  
        if(!element.stats) element.stats = {};
  
        dom.style.height = '150px';
        dom.style.top = '-10px';
        dom.scrollIntoView({ block: 'nearest' });
        dom.style.height = '';
        dom.style.top = '';
        await delay(0);
  
        infoContainer.style.display = 'flex';
        const box = dom.getBoundingClientRect();
        const x = Math.max(8, Math.min(window.innerWidth - 462 - 8, box.left - 17));
        const y = Math.max(38, Math.min(window.innerHeight - 402 - 8, box.top - 17));
        infoContainer.style.left = x + 'px';
        infoContainer.style.top = y + 'px';
        infoContainer.classList.add('animate-in');
        setInfoOpen(true);
  
        infoContainer.querySelectorAll('.info-tab,.info-section')
          .forEach(x => x.classList.remove('selected'));
  
        infoContainer.querySelector('.info-section-info').classList.add('selected');
        infoContainer.querySelector('[data-info-tab="info"]').classList.add('selected');
        
        infoContainer.querySelector('.elem').innerHTML = escapeHTML(element.display.text);
        infoContainer.querySelector('.elem').className = `elem ${getClassFromDisplay(element.display)}`;
        infoContainer.querySelector('#element-info-title').innerHTML = isNaN(Number(element.id)) ? 'Element Info' : `Element #${Number(element.id)}`;
  
        (infoContainer.querySelector('#element-created-date-root') as HTMLElement).style.display = element.createdOn ? '' : 'none';
        if (element.createdOn) {
          infoContainer.querySelector('#element-created-date').innerHTML = `${formatDate(new Date(element.createdOn))}`;
        }
        (infoContainer.querySelector('#info-tier') as HTMLElement).style.display = element.stats.treeComplexity !== undefined ? '' : 'none';
        if (element.stats.treeComplexity !== undefined) {
          infoContainer.querySelector('#info-tier').innerHTML = element.stats.treeComplexity ? `Tier ${element.stats.treeComplexity}` : 'Starter';
          infoContainer.querySelector('#info-tier').setAttribute('data-tier-level', Math.floor(element.stats.treeComplexity / 5).toString());
        }
        
        var numColumns = 0;
        if (typeof element.stats.recipeCount === 'number') {
          (infoContainer.querySelector('#element-recipe-count') as HTMLElement).style.display = "flex";
          infoContainer.querySelector('#element-recipe-count').innerHTML = element.stats.recipeCount + ' ' + plural(element.stats.recipeCount, 'Recipe');
          numColumns++;
        }
        if (!element.stats.recipeCount) {
          (infoContainer.querySelector('#element-recipe-count') as HTMLElement).style.display = "none";
        }
        if (typeof element.stats.usageCount === 'number') {
          (infoContainer.querySelector('#element-usage-count') as HTMLElement).style.display = "flex";
          infoContainer.querySelector('#element-usage-count').innerHTML = element.stats.usageCount + ' ' + plural(element.stats.usageCount, 'Use');
          numColumns++;
        }
        if (!element.stats.usageCount) {
          (infoContainer.querySelector('#element-usage-count') as HTMLElement).style.display = "none";
        }
  
        if (typeof element.stats.discoveries === 'number') {
          (infoContainer.querySelector('#element-discovery-count') as HTMLElement).style.display = "flex";
          infoContainer.querySelector('#element-discovery-count').innerHTML = element.stats.discoveries + ' ' + (element.stats.discoveries == 1 ? "Discovery" : "Discoveries");
          numColumns++;
        }
        if (!element.stats.discoveries) {
          (infoContainer.querySelector('#element-discovery-count') as HTMLElement).style.display = "none";
        }
        
        if (numColumns == 3) {
          (infoContainer.querySelector('#element-recipe-div') as HTMLDivElement).classList.remove("two-column");
          (infoContainer.querySelector('#element-recipe-div') as HTMLDivElement).classList.add("three-column");
        } else {
          (infoContainer.querySelector('#element-recipe-div') as HTMLDivElement).classList.remove("three-column");
          (infoContainer.querySelector('#element-recipe-div') as HTMLDivElement).classList.add("two-column");
        }
  
        infoContainer.querySelector('#element-comments').innerHTML = (element.stats?.comments || []).map(x => {
          if (x.author) {
            // elem4 doesnt properly decode authors
            return `<p>"${escapeHTML(x.comment)}" - ${escapeHTML(x.author)}</p>`;
          }
          return `<p>${escapeHTML(x.comment)}</p>`;
        }).join('');
        infoContainer.querySelector('#element-data-json').innerHTML = JSON.stringify(element, null, 2);
        infoContainer.querySelector('#element-css-class').innerHTML = `.${getClassFromDisplay(element.display)}`;
        infoContainer.querySelector('#element-css-color').innerHTML = Color(getComputedStyle(dom).backgroundColor).hex();
  
        const fundamentalsDiv = document.getElementById('element-fundamentals');
        fundamentalsDiv.innerHTML = '';
        const fundamentalsWithImages = ['fire', 'water', 'air', 'earth'];
        if(element.stats.fundamentals) {
          Object.keys(element.stats.fundamentals).forEach((key) => {
            const root = document.createElement('div');
            root.classList.add('data-row')
      
            if (fundamentalsWithImages.includes(key)) {
              const img = document.createElement('img');
              img.src = '/' + key + '.svg';
              root.appendChild(img);
            } else {
              const text = document.createElement('strong');
              text.innerHTML = escapeHTML(capitalize(key));
              root.appendChild(text);
            }
      
            const text = document.createElement('span');
            text.innerHTML = compactMiniNumber(element.stats.fundamentals[key]);
            root.appendChild(text);
      
            fundamentalsDiv.appendChild(root);
          });
        }
  
        (infoContainer.querySelector('.info-equation-container') as HTMLElement).style.display = '';
  
        getElementTree(element).then((tree) => {
          if (tree.parent1) {
            let left = tree.parent1;
            let right = tree.parent2 || tree.parent1;
            (infoContainer.querySelector('.info-equation-container') as HTMLElement).style.display = '';
            infoContainer.querySelector('#info-left-element').innerHTML = escapeHTML(left.elem.display.text);
            infoContainer.querySelector('#info-left-element').setAttribute('style', getCSSFromDisplay(left.elem.display));
            infoContainer.querySelector('#info-right-element').innerHTML = escapeHTML(right.elem.display.text);
            infoContainer.querySelector('#info-right-element').setAttribute('style', getCSSFromDisplay(right.elem.display));
          } else {
            (infoContainer.querySelector('.info-equation-container') as HTMLElement).style.display = 'none';
          }
          initTreeCanvas(tree);
        });
      } catch(e) {
        console.error(e)
      }
      
}