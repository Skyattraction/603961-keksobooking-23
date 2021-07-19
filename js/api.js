const API_URL = 'https://23.javascript.pages.academy/keksobooking';

const getData = (onSuccess, onError) => () => fetch(
  `${API_URL}/data`,
)
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
    onError(`${response.status} ${response.statusText}`);
  })
  .then((json) => {
    onSuccess(json);
  })
  .catch((err) => {
    onError(err);
  });

const sendData = (onSuccess, onError, body) => {
  fetch(API_URL,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onError();
      }
    })
    .catch(() => {
      onError();
    });
};
export {getData, sendData};
