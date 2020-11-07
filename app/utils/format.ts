export const formatBuildingId = (buildingId: string) => {
  if (buildingId) {
    const splitted = buildingId.split('-');
    const prefixed = splitted.map((id: string, i: number) => {
      return i < 2 ? ('000' + id).slice(-3) : ('0000' + id).slice(-4);
    });

    return prefixed.join('-');
  }
  return '';
};
