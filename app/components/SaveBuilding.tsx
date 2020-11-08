import React, { useCallback } from 'react';

import { addBuildingToLocalStorage, removeBuildingFromLocalStorage } from 'app/utils/localStorage';
import { Building } from 'db';
import { SaveButton } from 'styles/index';

interface Props {
  building: Building;
  savedBuildings: Building[];
  setSavedBuildings: (buildings: Building[]) => void;
}

const SaveBuilding = ({ building, savedBuildings, setSavedBuildings }: Props) => {
  const isSaved = savedBuildings.some((b) => b.building_id === building.building_id);

  const onSaveClick = useCallback(() => {
    console.log('here', building);
    if (building) {
      if (!isSaved) {
        const newSavedBuildings = addBuildingToLocalStorage(building);
        setSavedBuildings(newSavedBuildings);
      } else {
        const newSavedBuildings = removeBuildingFromLocalStorage(building);
        setSavedBuildings(newSavedBuildings);
      }
    }
  }, [building, isSaved]);
  return <SaveButton onClick={onSaveClick} selected={isSaved} />;
};

export default SaveBuilding;
