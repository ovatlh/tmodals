function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function fnBefore() {
  console.log(`fnBefore: ${Date.now()}`);
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`fnBefore: ${Date.now()}`);
      resolve();
    }, 1000 * 5);
  });
}

async function fnAfter(id) {
  console.log(`fnAfter: ${Date.now()}`);
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`fnAfter: ${Date.now()}`);
      tmodals.fnClose(id);
      resolve();
    }, 1000 * 5);
  });
}


function fnModalTest01() {
  const template = document.getElementById("modal-test-01");
  const htmlContent = template.innerHTML.replace("TEXT", `${tmodals.config.itemList.length}: ${Date.now()}`);
  const totalInt = getRandomInt(1, 10);
  const extraItemLenght = getRandomInt(1, 10);
  const htmlExtra = Array.from({ length: totalInt * 5 }, (_, i) => {
    return `<div class="t-modal-item-extra">Extra Item ${i + 1} [${Array.from({ length: extraItemLenght * 10 }, (__, ii) => { return `x` }).join("")}]</div>`;
  }).join("");
  const htmlWithExtra = htmlContent + htmlExtra;
  const id = tmodals.fnGenerateId();
  tmodals.fnShow({
    id: id,
    html: htmlWithExtra,
    isBackgroundVisible: true,
    isCloseWithBackground: true,
    //fnRunBefore: fnBefore,
    //fnRunAfter: () => fnAfter(id),
  });
}

function fnModalTest02() {
  const template = document.getElementById("modal-test-01");
  const htmlContent = template.innerHTML.replace("TEXT", `${tmodals.config.itemList.length}: ${Date.now()}`);
  const totalInt = getRandomInt(1, 10);
  const extraItemLenght = getRandomInt(1, 10);
  const htmlExtra = Array.from({ length: totalInt * 5 }, (_, i) => {
    return `<div class="t-modal-item-extra">Extra Item ${i + 1} [${Array.from({ length: extraItemLenght * 10 }, (__, ii) => { return `x` }).join("")}]</div>`;
  }).join("");
  const htmlWithExtra = htmlContent + htmlExtra;
  const id = tmodals.fnGenerateId();
  tmodals.fnShow({
    html: htmlWithExtra,
    isBackgroundVisible: false,
    isCloseWithBackground: true,
    //fnRunBefore: fnBefore,
    //fnRunAfter: () => fnAfter(id),
  });
}

function fnModalTest03() {
  const template = document.getElementById("modal-test-01");
  const htmlContent = template.innerHTML.replace("TEXT", `${tmodals.config.itemList.length}: ${Date.now()}`);
  const totalInt = getRandomInt(1, 10);
  const extraItemLenght = getRandomInt(1, 10);
  const htmlExtra = Array.from({ length: totalInt * 5 }, (_, i) => {
    return `<div class="t-modal-item-extra">Extra Item ${i + 1} [${Array.from({ length: extraItemLenght * 10 }, (__, ii) => { return `x` }).join("")}]</div>`;
  }).join("");
  const htmlWithExtra = htmlContent + htmlExtra;
  const id = tmodals.fnGenerateId();
  tmodals.fnShow({
    html: htmlWithExtra,
    isBackgroundVisible: true,
    isCloseWithBackground: false,
    //fnRunBefore: fnBefore,
    //fnRunAfter: () => fnAfter(id),
  });
}

function fnModalTest04() {
  const template = document.getElementById("modal-test-01");
  const htmlContent = template.innerHTML.replace("TEXT", `${tmodals.config.itemList.length}: ${Date.now()}`);
  const totalInt = getRandomInt(1, 10);
  const extraItemLenght = getRandomInt(1, 10);
  const htmlExtra = Array.from({ length: totalInt * 5 }, (_, i) => {
    return `<div class="t-modal-item-extra">Extra Item ${i + 1} [${Array.from({ length: extraItemLenght * 10 }, (__, ii) => { return `x` }).join("")}]</div>`;
  }).join("");
  const htmlWithExtra = htmlContent + htmlExtra;
  const id = tmodals.fnGenerateId();
  tmodals.fnShow({
    html: htmlWithExtra,
    isBackgroundVisible: false,
    isCloseWithBackground: false,
    //fnRunBefore: fnBefore,
    //fnRunAfter: () => fnAfter(id),
  });
}