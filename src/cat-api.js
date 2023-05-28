const apiKey =
  'live_baZrekgEpNy6tgg2vdu3h8ZWkVqkBhDuqVaKiFp1bQTn3ClExudsA3Sbooq0idMk';

export function fetchBreeds() {
  const url = 'https://api.thecatapi.com/v1/breeds';

  return fetch(url, {
    headers: {
      'x-api-key': apiKey,
    },
  })
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

export function fetchCatByBreed(breedId) {
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
