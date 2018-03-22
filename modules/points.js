export const getPointByKoatuu = (koatuu, store) => {
  const point = store.find((element) => {
    if (element.koatuu === koatuu) {
      return element;
    }
  });

  return point || {};
}
