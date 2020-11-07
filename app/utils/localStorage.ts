import { Building } from 'db';

export const localStorageSetArray = (key: string, value: Building) => {
  let currentArray, newArray;
  currentArray = localStorage.getItem(key);
  if (currentArray) {
    currentArray = JSON.parse(currentArray);
    newArray = [...currentArray, value];
  } else {
    newArray = [value];
  }
  localStorage.setItem(key, JSON.stringify(newArray));
};

export const localStorageGetArray = (key: string): Building[] => {
  let array = localStorage.getItem(key);
  if (array !== 'null') {
    array = JSON.parse(array);
    return array;
  } else {
    return [];
  }
};
