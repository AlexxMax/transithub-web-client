export const getGoodsByClassificatorCode = (classificatorCode, store) => {
  const goods = store.find((element) => {
    if (element.classificator_code === classificatorCode) {
      return element;
    }
  });

  return goods || {};
}
