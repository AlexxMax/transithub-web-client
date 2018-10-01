import Vue from 'vue'

Vue.prototype.$resetData = function() {
  Object.assign(this.$data, this.$options.data.call(component))
}
