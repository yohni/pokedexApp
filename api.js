var base_url = "https://pokeapi.co/api/v2/";

function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);

    return Promise.reject(new Error(response.statusText));
  } else {
    return Promise.resolve(response);
  }
}

function json(response) {
  return response.json();
}

function error(error) {
  console.log("Error : " + error);
}

function getAllPokemon() {
  if ("caches" in window) {
    caches.match(base_url + "pokemon").then(function(response) {
      if (response) {
        response
          .json()
          .then(function(data) {
            var pokemonHTML = "";
            data.results.forEach(function(pokemon) {
              pokemonHTML += `
                                    <ul class="collection with-header">
                                      <li class="collection-item">
                                        <div>
                                            ${pokemon.name}
                                            <a href="detailPokemon.html?name=${
                                              pokemon.name
                                            }">
                                                <span class="right">
                                                    Go to detail
                                                    <i class="material-icons right">navigate_next</i> 
                                                </span> 
                                            </a>
                                        </div>
                                      </li>
                                    </ul>
                                `;
            });
            document.getElementById("pokemons").innerHTML = pokemonHTML;
          })
          .catch(error);
      }
    });
  } else {
    event.respondWith(
      caches
        .match(event.request, { ignoreSearch: true })
        .then(function(response) {
          return response || fetch(event.request);
        })
    );
  }

  fetch(base_url + "pokemon")
    .then(status)
    .then(json)
    .then(function(data) {
      var pokemonHTML = "";
      data.results.forEach(function(pokemon) {
        pokemonHTML += `
                    <ul class="collection with-header">
                      <li class="collection-item">
                        <div>
                            ${pokemon.name}
                            <a href="detailPokemon.html?name=${pokemon.name}">
                                <span class="right">
                                    Go to detail
                                    <i class="material-icons right">navigate_next</i> 
                                </span> 
                            </a>
                        </div>
                      </li>
                    </ul>
                `;
      });

      document.getElementById("pokemons").innerHTML = pokemonHTML;
    })
    .catch(error);
}
