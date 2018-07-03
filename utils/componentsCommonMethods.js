export const resetData = component => {
  Object.assign(component.$data, component.$options.data.call(component))
}
