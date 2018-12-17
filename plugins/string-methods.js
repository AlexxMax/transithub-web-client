import StringMask from 'string-mask'
import moment from 'moment'

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

String.prototype.pUnmaskPhone = function() {
  return this.replace(/ /g, '').replace('(', '').replace(')', '').replace('+', '')
}

String.prototype.pNormalizePhone = function() {
  return this.pUnmaskPhone().pMaskPhone()
}

String.prototype.pValidPhone = function() {
  const regex = /((?:\+|00)[17](?: |\-)?|(?:\+|00)[1-9]\d{0,2}(?: |\-)?|(?:\+|00)1\-\d{3}(?: |\-)?)?(0\d|\([0-9]{3}\)|[1-9]{0,3})(?:((?: |\-)[0-9]{2}){4}|((?:[0-9]{2}){4})|((?: |\-)[0-9]{3}(?: |\-)[0-9]{4})|([0-9]{7}))/g
  if (this.match(regex)) {
    return true
  }
  return false
}

String.prototype.pHidePhonePart = function() {
	const parts = this.split(' ')
	if (parts.length > 3) {
		parts[2] = '***'
	}
	return parts.join(' ')
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

String.prototype.pToDate = function() {
  let date = null
  try {
    date = moment(this, 'DD.MM.YYYY').toDate()
  } catch (error) {
    date = null
  }
  return date
}
