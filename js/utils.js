const isArrayIncludesOtherArray = (initialArray, includedArray) => includedArray.every((arrayItem) => initialArray.includes(arrayItem));

const getWordEndByQuantity = (value, words) => {
  value = Math.abs(value) % 100;
  const num = value % 10;
  if(value > 10 && value < 20) {
    return words[2];
  }
  if(num > 1 && num < 5) {
    return words[1];
  }
  if(num === 1) {
    return words[0];
  }
  return words[2];
};

const showErrorAlert = () => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 1000;
  alertContainer.style.position = 'fixed';
  alertContainer.style.left = '50%';
  alertContainer.style.top = '50%';
  alertContainer.style.transform = 'translate(-50%, -50%)';
  alertContainer.style.padding = '30px';
  alertContainer.style.fontSize = '14px';
  alertContainer.style.fontWeight = 'bold';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.whiteSpace = 'pre';
  alertContainer.style.backgroundColor = 'white';
  alertContainer.style.width = '500px';
  alertContainer.style.borderRadius = '30px';
  alertContainer.style.color = '#FF4B4B';
  alertContainer.style.boxShadow = '0 0 20px 0 rgba(0,0,0,.5)';

  alertContainer.textContent = 'Произошла ошибка загрузки данных с сервера! \r\n Попробуйте еще раз.';
  const alertClose = document.createElement('span');
  alertClose.textContent = 'x';
  alertClose.style.position = 'absolute';
  alertClose.style.right = '15px';
  alertClose.style.top = '15px';
  alertClose.style.fontSize = '20px';
  alertClose.style.fontFamily = 'monospace';
  alertClose.style.color = 'grey';
  alertClose.style.cursor = 'pointer';

  alertContainer.append(alertClose);
  document.body.append(alertContainer);
  alertClose.onclick = function() {
    alertContainer.remove();
  };
};

export {isArrayIncludesOtherArray, getWordEndByQuantity, showErrorAlert};
