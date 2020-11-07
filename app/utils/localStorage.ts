import { Building } from 'db';

export const addBuildingToLocalStorage = (building: Building) => {
  let currentArray, newArray;
  currentArray = localStorage.getItem('savedProperties');
  if (currentArray) {
    currentArray = JSON.parse(currentArray);
    if (!currentArray.some((b) => b.building_id === building.building_id)) {
      newArray = [...currentArray, building];
    } else {
      newArray = currentArray;
    }
  } else {
    newArray = [building];
  }
  localStorage.setItem('savedProperties', JSON.stringify(newArray));
  return newArray;
};

export const removeBuildingFromLocalStorage = (building: Building) => {
  let currentArray, newArray;
  currentArray = localStorage.getItem('savedProperties');
  if (currentArray) {
    currentArray = JSON.parse(currentArray);
    newArray = currentArray.filter((b) => b.building_id !== building.building_id);
  } else {
    newArray = currentArray;
  }
  localStorage.setItem('savedProperties', JSON.stringify(newArray));
  return newArray;
};

export const getSavedBuildings = (): Building[] | undefined => {
  let array = localStorage.getItem('savedProperties');
  if (array) {
    array = JSON.parse(array);
    return array;
  }
};
