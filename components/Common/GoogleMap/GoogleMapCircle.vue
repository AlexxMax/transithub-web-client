<script>
import _ from 'lodash'
import GoogleMapCircle from '@/utils/google/maps/models/circle'

export default {
  render: _ => null,

  props: {
    editable: {
      type: Boolean,
      default: false
    },
    google: {
      type: Object,
      required: true
    },
    map: {
      type: Object,
      required: true
    },
    center: {
      type: Object,
      required: true
    },
    radius: {
      type: [Number, String],
      default: 150
    }
  },

  watch: {
    radius: {
      immediate: true,
      handler(value) {
        if (this.circle)
          this.circle.setRadius(value)
        else
          this.value = value
      }
    },

    center(value) {
      this.circle.setCenter(value)
    }
  },

  data: () => ({
    circle: null
  }),

  mounted() {
    this.circle = new GoogleMapCircle(this.google, this.map.map, this.center, this.radius, this.editable)

    this.circle.addOnRadiusChangeListener(() => {

      if (this.circle.getRadius() > 10000)
        this.circle.setRadius(10000)

      if (this.circle.getRadius() < 10)
        this.circle.setRadius(10)

      this.$emit('changeRadius', this.circle.getRadius().toFixed())

    })

    this.circle.addOnCenterChangeListener(() => {

      this.$emit('changeCenter', {
        lat: this.circle.getCenter().lat(),
        lng: this.circle.getCenter().lng()
      })

      // TODO: Розкоментувати, якщо не можна змінювати центр еліпса
      // const changed = {
      //   lat: this.circle.getCenter().lat().toFixed(6),
      //   lng: this.circle.getCenter().lng().toFixed(6)
      // }
      //
      // const center = {
      //   lat: this.center.lat.toFixed(6),
      //   lng: this.center.lng.toFixed(6),
      // }
      //
      //
      // if (_.isEqual(changed, center))
      //   return
      // else
      //   this.circle.setCenter(this.center)

    })
  },

  beforeDestroy() {
    this.circle.destroy()
  }
}
</script>
