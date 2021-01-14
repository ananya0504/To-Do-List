//Selectors
const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.intro');
let items = JSON.parse(localStorage.getItem('items')) || [];
const control1 = document.querySelector('.control.check-all');
const control2 = document.querySelector('.control.done');
const control3 = document.querySelector('.control.uncheck-all');

//Event Listeners
addItems.addEventListener('submit', addItem);
itemsList.addEventListener('click', toggleDone);
control1.addEventListener('click', doneAll);
control2.addEventListener('click', clearAll);
control3.addEventListener('click', undoneAll);


//Fuctions
function addItem (e) {
  e.preventDefault();
  const text = (this.querySelector('[name=item]')).value;
  const item = {
    text,
    done: false
  };
  items.push(item);
  localStorage.setItem('items', JSON.stringify(items));
  this.reset();
  makeList();
}

function makeList() {
  itemsList.innerHTML = items.map((listObj, index) => {
    return `
      <li>
        <input type="checkbox" id="item${index}" data-index="${index}" ${listObj.done? 'checked' : ''}>
        <label for="item${index}">${listObj.text}</label>
      </li>
    `;
  }).join('');
}

function toggleDone(e) {
  if(!e.target.matches('input')) return;
  const listItem = e.target;
  if (listItem.checked) {
    items[listItem.dataset.index].done = true;
  } else {
    items[listItem.dataset.index].done = false;
  }
  localStorage.setItem('items', JSON.stringify(items));
  makeList();
}

function doneAll() {
  items.forEach(listObj => {listObj.done = true;});
  localStorage.setItem('items', JSON.stringify(items));
  makeList();
}

function undoneAll() {
  items.forEach(listObj => listObj.done = false);
  localStorage.setItem('items', JSON.stringify(items));
  makeList();
}

function clearAll() {
  const ritem= document.querySelector(".start");
  ritem.remove();
  items = [];
  localStorage.setItem('items', JSON.stringify(items));
  itemsList.innerHTML = "<li>Great job! Ready to add more?</li>";
}


if(JSON.parse(localStorage.getItem('items'))) {
  makeList();
}
