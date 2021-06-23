export const disableForm = function(formArray) {
  for (let ind = 0; ind < formArray.length; ind++) {
    const form = document.querySelector(`.${formArray[ind]}`);
    form.classList.add(`${formArray[ind]}--disabled`);
    const inputs = form.elements;
    for (let jnd = 0; jnd < inputs.length; jnd++) {
      inputs[jnd].disabled = true;
    }
  }
};

disableForm(['ad-form', 'map__filters']);

export const enableForm = function(formArray) {
  for (let ind = 0; ind < formArray.length; ind++) {
    const form = document.querySelector(`.${formArray[ind]}`);
    form.classList.remove(`${formArray[ind]}--disabled`);
    const inputs = form.elements;
    for (let jnd = 0; jnd < inputs.length; jnd++) {
      inputs[jnd].disabled = false;
    }
  }
};

enableForm(['ad-form', 'map__filters']);
