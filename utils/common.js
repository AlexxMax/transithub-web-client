const toString = Object.prototype.toString

export const isObject = function(value) {
  return (toString.call(value)) === '[object Object]'
}
