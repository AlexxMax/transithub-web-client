import { getGoodsByClassificatorCode as getGoods } from '@/modules/goods'
import { getPointByKoatuu as getPoint } from '@/modules/points'
import { getWarehouseByClassificatorCode as getWarehouse } from '@/modules/warehouses'

export const state = () => ({
  list: []
})

export const mutations = {
  add (state, item) {
    state.list.push({ ...item })
  },
  remove (state, { item }) {
    state.list.splice(state.list.indexOf(item), 1)
  }
}

export const actions = {
  async load ({ commit, rootState }) {
    const { items } = await this.$axios.$get('/api1/order?client_token=e0d22acfba67c35937f2e26c7b6344e6&limit=10');
    // const items = [{
    //   "id": 181,
    //   "number": "42",
    //   "goods": "СОНЯШНИК",
    //   "created_at": "2018-03-12T00:00:00Z",
    //   "warehouse_from": "1220310101001",
    //   "warehouse_to": "1220385501001",
    //   "client": "Кернел",
    //   "point_from": "0725587602",
    //   "point_to": "0725780904",
    //   "title": "Замовлення 42 від 12.03.2018 00:00:00",
    //   "guid": "7e5c4f66-20e2-8233-856d-2308da1ae7f4"
    // }, {
    //   "id": 182,
    //   "number": "43",
    //   "goods": "КУКУРУДЗА",
    //   "created_at": "2018-03-10T18:08:22Z",
    //   "warehouse_from": "1220310101001",
    //   "warehouse_to": "1220385501001",
    //   "client": "Кернел",
    //   "point_from": "5323683001",
    //   "point_to": "5110800000",
    //   "title": "Замовлення 43 від ",
    //   "guid": "b2da43f2-1aee-dd4f-c043-27d51218a13a"
    // }];
    for (const item of items) {
      // commit('add', populateItem(item, rootState));
      commit('add', item);
    }
  }
}

// const populateItem = (item, rootState) => {
//   item.goods = getGoods(item.goods, rootState.goods.list);
//   item.point_from = getPoint(item.point_from, rootState.points.list);
//   item.point_to = getPoint(item.point_to, rootState.points.list);
//   item.warehouse_from = getWarehouse(item.warehouse_from, rootState.warehouses.list);
//   item.warehouse_to = getWarehouse(item.warehouse_to, rootState.warehouses.list);
//   return item;
// }
