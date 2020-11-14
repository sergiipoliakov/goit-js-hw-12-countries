const debounce = require('lodash.debounce');
import './css/common.css';

import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import { error } from '@pnotify/core';

import countryCardTpl from '../src/templates/country-card.hbs';
import API from './js/fetchCountries';
import getRefs from './js/get-fers';

const refs = getRefs();
console.log(refs.searchList);

refs.searchForm.addEventListener('input', debounce(onSearch, 500));

function onSearch(e) {
  e.preventDefault();

  const searchQuery = e.target.value;

  API.fetchCountries(searchQuery).then(renderCountrisCard).catch(onFetchError);
}

function renderCountrisCard(countries) {
  const items = countries.map(
    country => `<li class="list">${country.name}</li>`,
  );

  refs.searchList.innerHTML = items.join('');
  if (countries.length > 10) {
    error({
      text: 'Too many matches found. Please enter a more specific query!',
      type: 'info',
    });
  } else if (countries.length === 1) {
    const markup = countryCardTpl(countries[0]);
    refs.cardContainer.innerHTML = markup;
  } else if (countries.length > 1) {
    // console.log(markup);
    refs.cardContainer.innerHTML = '';
  }
}

function onFetchError() {
  //   error({
  //     title: 'Button Clicked',
  //     text:
  //       'You have clicked the button. You may now complete the process of reading the notice.',
  //     modules: new Map([
  //       [
  //         Confirm,
  //         {
  //           confirm: true,
  //           buttons: [
  //             {
  //               text: 'Ok',
  //               primary: true,
  //               click: notice => {
  //                 notice.close();
  //               },
  //             },
  //           ],
  //         },
  //       ],
  //     ]),
  //   });
}
