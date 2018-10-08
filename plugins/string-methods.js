import StringMask from 'string-mask'

const MASKS = {
  phone: '+00 (000) 000 0000'
}

String.prototype.pMaskPhone = function() {
  let phone = ''
  try {
    phone = new StringMask(MASKS.phone).apply(this)
  } catch (error) {
    phone = ''
  }
  return phone
}

String.prototype.pCapitalizeFirstWord = function() {
  let str = ''
  try {
    str = this.charAt(0).toUpperCase() + this.slice(1).toLowerCase()
  } catch (error) {
    str = ''
  }
  return str
}

String.prototype.pCapitalizeAllFirstWords = function() {
  let str = ''
  try {
    const pieces = this.split(" ")
    for (const i in pieces) {
      pieces[i] = pieces[i].charAt(0).toUpperCase() + pieces[i].substr(1).toLowerCase()
    }
    str =  pieces.join(" ")
  } catch (error) {
    str = ''
  }
  return str
}

