import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

function showLoader() {
  loader.style.display = 'block';
}

function hideLoader() {
  loader.style.display = 'none';
}

function showError() {
  error.style.display = 'block';
}

function hideError() {
  error.style.display = 'none';
}

function showCatInfo() {
  catInfo.style.display = 'block';
}

function hideCatInfo() {
  catInfo.style.display = 'none';
}

function displayCatInfo(cat) {
  const breedName =
    cat.breeds.length > 0 ? cat.breeds[0].name : 'Unknown Breed';
  const description =
    cat.breeds.length > 0
      ? cat.breeds[0].description
      : 'No description available';
  const temperament =
    cat.breeds.length > 0 ? cat.breeds[0].temperament : 'Unknown';

  const image = `<img src="${cat.url}" alt="${breedName}">`;

  const breedTitle = `<h2>${breedName}</h2>`;
  const descriptionParagraph = `<p>Description: ${description}</p>`;
  const temperamentParagraph = `<p>Temperament: ${temperament}</p>`;

  const catInfoHTML = `${image}${breedTitle}${descriptionParagraph}${temperamentParagraph}`;

  catInfo.innerHTML = catInfoHTML;
}

function onBreedSelectChange() {
  const breedId = breedSelect.value;
  showLoader();
  hideError();
  hideCatInfo();

  fetchCatByBreed(breedId)
    .then(cat => {
      displayCatInfo(cat);
      hideLoader();
      showCatInfo();
    })
    .catch(error => {
      showError();
      hideLoader();
      console.error(error);
    });
}

function populateBreedSelect(breeds) {
  breeds.forEach(breed => {
    const option = document.createElement('option');
    option.value = breed.id;
    option.textContent = breed.name;
    breedSelect.appendChild(option);
  });
}

function init() {
  breedSelect.addEventListener('change', onBreedSelectChange);

  showLoader();

  fetchBreeds()
    .then(breeds => {
      hideLoader();
      populateBreedSelect(breeds);
    })
    .catch(error => {
      showError();
      hideLoader();
      console.error(error);
    });
}

init();
