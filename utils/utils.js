'use strict';

export const createMarkup = (description) => { return {__html: description} };

export const checkStatus = (response) => {
  if (!response.ok) {   // (response.status < 200 || response.status > 300)
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
  return response;
};

export const parseJSON = (response) => {
  return response.json();
};

export const sortByValueSmallest = (a, b) => {
  if (a > b) {
    return 1;
  }
  if (a < b) {
    return -1;
  }
  // a must be equal to b
  return 0;
};

export const sortByValueLargest = (a, b) => {
  return b-a
};

export const sortByName = (a, b, direction) => {
  var nameA = a.toUpperCase(); // ignore upper and lowercase
  var nameB = b.toUpperCase(); // ignore upper and lowercase
  if (nameA < nameB) {
    return direction ? -1 : 1;
  }
  if (nameA > nameB) {
    return direction ? 1 : -1;
  }

  // names must be equal
  return 0;
};