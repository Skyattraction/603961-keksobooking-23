const disableForm = function(formArray) {
  for (let ind = 0; ind < formArray.length; ind++) {
    const form = document.querySelector(`.${formArray[ind]}`);
    form.classList.add(`${formArray[ind]}--disabled`);
    const inputs = form.elements;
    Array.from(inputs).forEach((inputItem) => {
      inputItem.disabled = true;
    });
  }
};

const enableForm = function(formArray) {
  for (let ind = 0; ind < formArray.length; ind++) {
    const form = document.querySelector(`.${formArray[ind]}`);
    form.classList.remove(`${formArray[ind]}--disabled`);
    const inputs = form.elements;
    Array.from(inputs).forEach((inputItem) => {
      inputItem.disabled = false;
    });
  }
};

disableForm(['ad-form', 'map__filters']);

export {enableForm};
