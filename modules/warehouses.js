export const getWarehouseByClassificatorCode = (classificatorCode, store) => {
  const warehouse = store.find((element) => {
    if (element.classificator_code === classificatorCode) {
      return element;
    }
  });

  return warehouse || {};
}
