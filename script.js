const API_KEY = "aebf72062fcd496ea7c57e83c1d0d485";
const API_URL = "https://api.spoonacular.com/recipes/search?apiKey=" + API_KEY + "&query=";

const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");
const resultsDiv = document.getElementById("results");

searchButton.addEventListener("click", function() {
  const searchQuery = searchInput.value;
  getResults(searchQuery);
});

function getResults(query) {
  fetch(API_URL + query)
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      displayResults(json);
    });
}

function displayResults(json) {
  while (resultsDiv.firstChild) {
    resultsDiv.removeChild(resultsDiv.firstChild);
  }

  const results = json.results;

  if (results.length === 0) {
    const noResults = document.createElement("p");
    noResults.textContent = "No results found.";
    resultsDiv.appendChild(noResults);
  } else {
    for (let i = 0; i < results.length; i++) {
      const title = document.createElement("h2");
      title.textContent = results[i].title;

      const image = document.createElement("img");
      image.src = results[i].thumbnail;
      image.alt = results[i].title + " image";

      const link = document.createElement("a");
      link.href = results[i].href;
      link.textContent = "View Recipe";

      resultsDiv.appendChild(title);
      resultsDiv.appendChild(image);
      resultsDiv.appendChild(link);
    }
  }
}
