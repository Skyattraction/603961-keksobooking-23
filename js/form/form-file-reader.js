const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const avatarInput = document.querySelector('.ad-form__field input[type=file]');
const avatarPreview = document.querySelector('.ad-form-header__preview');
const adPhotoInput = document.querySelector('.ad-form__upload input[type=file]');
const adPhotoPreview = document.querySelector('.ad-form__photo');

const filePreviewFields = [
  {
    preview: avatarPreview,
  },
  {
    preview: adPhotoPreview,
  },
];

const createFileReader = (fileField, preview) => {
  fileField.addEventListener('change', () => {
    const file = fileField.files[0];
    const fileName = file.name.toLowerCase();
    const isMatches = FILE_TYPES.some((it) => fileName.endsWith(it));

    if (isMatches) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        if(preview.childNodes.length) {
          preview.childNodes.forEach((childNode) => {
            if(childNode.style){
              childNode.style.visibility = 'hidden';
            }
          });
        }
        preview.style.backgroundImage = `url(${reader.result})`;
        preview.style.backgroundSize = 'cover';
      });
      reader.readAsDataURL(file);
    }
  });
};

const resetAllFilePreviewFields = () => {
  filePreviewFields.forEach((fieldItem) => {
    if(fieldItem.preview.childNodes.length) {
      fieldItem.preview.childNodes.forEach((childNode) => {
        if(childNode.style){
          childNode.style.visibility = '';
        }
      });
    }
    fieldItem.preview.style.backgroundImage = '';
    fieldItem.preview.style.backgroundSize = '';
  });
};

createFileReader(avatarInput, avatarPreview);
createFileReader(adPhotoInput, adPhotoPreview);

export {resetAllFilePreviewFields};
