const debounce = require('lodash.debounce');
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import { error } from '@pnotify/core';

import countryCardTpl from '../templates/country-card.hbs';
import renderLIstOfCountris from '../templates/countries-list.hbs';
import API from '../js/fetchCountries';
import getRefs from '../js/get-fers';

const refs = getRefs();

refs.searchForm.addEventListener('input', debounce(onSearch, 500));

export default function onSearch(e) {
  e.preventDefault();

  const searchQuery = e.target.value;

  API.fetchCountries(searchQuery).then(renderCountrisCard).catch(onFetchError);
}

function renderCountrisCard(countries) {
  renderLIstOfCountrisMarkup(countries);

  if (countries.length > 10) {
    error({
      text: 'Too many matches found. Please enter a more specific query!',
      type: 'info',
    });
  } else if (countries.length === 1) {
    const markup = countryCardTpl(countries[0]);

    refs.cardContainer.innerHTML = markup;

    refs.searchList.innerHTML = '';
  } else if (countries.length > 1) {
    refs.cardContainer.innerHTML = '';
  }
}

function onFetchError() {}

function renderLIstOfCountrisMarkup(countries) {
  const itemsOfCountries = countries.map(country => country.name);
  const itemsOfCountriesMarkup = renderLIstOfCountris(itemsOfCountries);
  refs.searchList.innerHTML = itemsOfCountriesMarkup;
}
