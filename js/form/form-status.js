const disableForm = (formArray) => {
  formArray.forEach((formElement) => {
    const form = document.querySelector(`.${formElement}`);
    form.classList.add(`${formElement}--disabled`);
    const inputs = form.elements;
    Array.from(inputs).forEach((inputItem) => {
      inputItem.disabled = true;
    });
  });
};

const enableForm = (formArray) => {
  formArray.forEach((formElement) => {
    const form = document.querySelector(`.${formElement}`);
    form.classList.remove(`${formElement}--disabled`);
    const inputs = form.elements;
    Array.from(inputs).forEach((inputItem) => {
      inputItem.disabled = false;
    });
  });
};

disableForm(['ad-form', 'map__filters']);

export {enableForm};
