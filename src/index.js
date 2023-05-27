// index.js

const apiKey =
  'live_baZrekgEpNy6tgg2vdu3h8ZWkVqkBhDuqVaKiFp1bQTn3ClExudsA3Sbooq0idMk';

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

  const image = document.createElement('img');
  image.src = cat.url;

  const breedTitle = document.createElement('h2');
  breedTitle.textContent = breedName;

  const descriptionParagraph = document.createElement('p');
  descriptionParagraph.textContent = `Description: ${description}`;

  const temperamentParagraph = document.createElement('p');
  temperamentParagraph.textContent = `Temperament: ${temperament}`;

  catInfo.innerHTML = '';
  catInfo.appendChild(image);
  catInfo.appendChild(breedTitle);
  catInfo.appendChild(descriptionParagraph);
  catInfo.appendChild(temperamentParagraph);
}

function fetchCatByBreed(breedId) {
  const url = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}&limit=1`;
  return fetch(url, {
    headers: {
      'x-api-key': apiKey,
    },
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch cat by breed.');
      }
      return response.json();
    })
    .then(data => {
      const cat = data[0];
      if (!cat) {
        throw new Error('Cat not found.');
      }
      return cat;
    })
    .catch(error => {
      console.error(error);
      throw error;
    });
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

function fetchBreeds() {
  const url = 'https://api.thecatapi.com/v1/breeds';

  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch cat breeds.');
      }
      return response.json();
    })
    .catch(error => {
      console.error(error);
      throw error;
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
