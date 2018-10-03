<template>
  <div class="th-requests-list">
    <ListHeader :cols="cols" :sort="sort" />

    <ItemsWarepper>
      <th-list-item
        v-for="(request, index) of requests"
        :key="index"
        :data="request"
        @click="open(request.guid)"/>
    </ItemsWarepper>
  </div>
</template>

<script>
import ListItem from '@/components/Requests/ListItem'
import ListHeader from '@/components/Common/Lists/Header'
import ItemsWarepper from '@/components/Common/Lists/ItemsWrapper'

export default {
  components: {
    "th-list-item": ListItem,
    ListHeader,
    ItemsWarepper
  },

  props: {
    requests: {
      type: Array,
      required: true
    }
  },

  data() {
    return {
      cols: [{
        col: 'number',
        width: 2,
        title: this.$t('lists.number'),
        sort: true
      }, {
        col: 'scheduleDate',
        width: 3,
        title: this.$t('lists.scheduleDate'),
        sort: true
      }, {
        col: 'client',
        width: 5,
        title: this.$t('lists.client')
      }, {
        col: 'goods',
        width: 4,
        title: this.$t('lists.goods')
      }, {
        col: 'pointFrom',
        width: 4,
        title: this.$t('lists.pointFrom')
      }, {
        col: 'pointTo',
        width: 4,
        title: this.$t('lists.pointTo')
      }, {
        col: 'status',
        width: 2,
        title: this.$t('lists.status')
      }]
    }
  },

  methods: {
    open: function(guid) {
      this.$router.push(`/workspace/requests/${guid}`);
    },
    sort: function(direction, col) {
      if (col === 'number') {
        this.$store.dispatch('requests/setSortingNumber', direction)
      } else if (col === 'scheduleDate') {
        this.$store.dispatch('requests/setSortingDate', direction)
      }
    }
  }
};
</script>
