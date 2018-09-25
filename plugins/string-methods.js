import StringMask from 'string-mask'

const MASKS = {
  phone: '+00 (000) 000 0000'
}

String.prototype.pMaskPhone = function() {
  return new StringMask(MASKS.phone).apply(this)
}

String.prototype.pCapitalizeFirstWord = function() {
  return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase()
}

String.prototype.pCapitalizeAllFirstWords = function() {
  const pieces = this.split(" ")
  for (const i in pieces) {
    pieces[i] = pieces[i].charAt(0).toUpperCase() + pieces[i].substr(1).toLowerCase()
  }
  return pieces.join(" ")
}

