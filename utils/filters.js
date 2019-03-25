const generateUniqueId = () =>
  (
    Date.now().toString(36) +
    Math.random()
      .toString(36)
      .substr(2, 5)
  ).toUpperCase();

export const getFilterValue = filter => filter && filter.map(element => element.value);

export const generateFilterValue = (values, collection, filterKey = "guid") =>
  collection
    .filter(function(collectionElement) {
      return this.indexOf(collectionElement[filterKey]) != -1;
    }, values)
    .map(collectionElement => ({
      id: generateUniqueId(),
      value: collectionElement[filterKey],
      title: collectionElement.name
    }));

export const generateStationFilterValue = (
  values,
  collection,
  filterKey = "id"
) => {
  let stationsObjects = [];
  collection.forEach(collectionGroup => {
    stationsObjects = [
      ...stationsObjects,
      ...collectionGroup.children
        .filter(function(collectionGroupElement) {
          return this.indexOf(collectionGroupElement[filterKey]) != -1;
        }, values)
        .map(collectionGroupElement => ({
          id: generateUniqueId(),
          value: collectionGroupElement[filterKey],
          title: collectionGroupElement.name
        }))
    ];
  });
  return stationsObjects;
};

export const findFilterTitle = (value, collection, filterKey = "guid") => {
  const item = collection.find(
    collectionElement => collectionElement[filterKey] === value
  );
  if (item) {
    return item.name;
  }
  return value;
};
