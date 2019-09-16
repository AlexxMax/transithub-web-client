import _ from "lodash";

import { getUserJWToken } from "@/utils/user";
import { getLangFromStore } from '@/utils/locale'
import { PAGE_SIZE } from "@/utils/defaultValues";

const URL = Object.freeze({
  PQ_WAREHOUSES: "/api1/transithub/pq_warehouses",
  SEARCH_PQ_WAREHOUSERS: "/api1/transithub/pq_warehouses/search",
  PQ_WAREHOUSE_GOODS: "/api1/transithub/pq_warehouse/goods",
  BIND_WAREHOUSE_TO_PARKING: '/api1/transithub/bind_pq_warehouse_and_pq_parking'
});

// Each object key from smake_case to camelCame
const format = item =>
  Object.keys(item).reduce(
    (obj, key) => ({ ...obj, [_.camelCase(key)]: item[key] }), {}
  );

const formatRequest = (item, store) => ({
  company_guid: store.state.companies.currentCompany.guid,
  name: item.name,
  organisation_guid: item.organisation,
  full_address: item.address,
  geo_registration_lat: item.lat,
  geo_registration_lng: item.lng,
  queue_profile_guid: item.queueProfileGuid,
  full_address: item.fullAddress,
  region_code: item.region,
  district_code: item.district,
  locality_koatuu: item.settlement,
  street_name: item.street,
  building_n: item.building,
  registration_zone_radius: item.radius
});

const formatGoods = (goods, locale) => ({
  guid: goods.goods_code,
  name: (locale === 'ru' && goods.goods_name_ru) ? goods.goods_name_ru : goods.goods_name_ua,
  direction: goods.direction
})

// API
export const getPQWarehouses = async function (offset, limit = PAGE_SIZE, companyGuid = null, queueProfileGuid = null) {
  const { status, count, items } = await this.$axios.$get(URL.PQ_WAREHOUSES, {
    params: {
      access_token: getUserJWToken(this),
      company_guid: companyGuid || this.store.state.companies.currentCompany.guid,
      queue_profile_guid: queueProfileGuid,
      offset,
      limit
    }
  });

  if (!status) return;

  const formatedItems = items.map(item => format(item));

  return { status, count, items: formatedItems };
};

export const getPQWarehouse = async function (
  guid,
  companyGuid = this.store.state.companies.currentCompany.guid
) {
  const { status, count, items } = await this.$axios.$get(URL.PQ_WAREHOUSES, {
    params: {
      guid,
      access_token: getUserJWToken(this),
      company_guid: companyGuid
    }
  });

  if (!status) return;

  return { status, item: format(items[0]) };
};

export const createPQWarehouse = async function (form) {
  const payload = formatRequest(form, this.store);

  const item = await this.$axios.$post(URL.PQ_WAREHOUSES, payload, {
    params: {
      access_token: getUserJWToken(this)
    }
  });

  return {
    status: item.state === "created" ? true : false,
    item: format(item)
  };
};

export const updatePQWarehouse = async function (guid, form) {
  const payload = formatRequest(form, this.store);

  const item = await this.$axios.$put(URL.PQ_WAREHOUSES, payload, {
    params: {
      guid,
      access_token: getUserJWToken(this)
    }
  });

  return {
    status: item.state === "changed" ? true : false,
    item: format(item)
  };
};

// PQ_WAREHOUSE PAKINGS SETTINGS

export const getWarehousesByParking = async function (
  limit = PAGE_SIZE,
  offset = OFFSET,
  parkingGuid,
) {

  const companyGuid = this.store.state.companies.currentCompany.guid

  const { status, count, items } = await this.$axios.$get(URL.PQ_WAREHOUSES, {
    params: {
      access_token: getUserJWToken(this),
      company_guid: companyGuid,
      parking_guid: parkingGuid,
      limit,
      offset
    }
  })

  if (!status) return

  const formatedItems = items.map(item => format(item))

  return { status, count, items: formatedItems }
}

export const bindWarehouseToParking = async function (warehouseGuid) {

  const { status } = await this.$axios.$post(URL.BIND_WAREHOUSE_TO_PARKING, {
    pq_parking_guid: this.store.state.pqWarehouses.subordinate.parking.guid,
    pq_warehouse_guid: warehouseGuid,
  }, {
    params: {
      access_token: getUserJWToken(this)
    }
  })

  return status

}

export const unbindWarehouseToParking = async function (warehouseGuid) {

  const { status } = await this.$axios.$delete(URL.BIND_WAREHOUSE_TO_PARKING, {
    params: {
      access_token: getUserJWToken(this),
      parking_guid: this.store.state.pqWarehouses.subordinate.parking.guid,
      warehouse_guid: warehouseGuid,
    }
  })

  return status

}

// PQ WAREHOUSE GLOBAL SEARCH

export const searchWarehouses = async function (search) {
  const {
    data: { status, count, items }
  } = await this.$axios({
    url: URL.SEARCH_PQ_WAREHOUSERS,
    method: "get",
    params: {
      access_token: getUserJWToken(this),
      search
    }
  });

  return {
    status,
    count,
    items: items.map(({ guid, name, full_address, organisation_name }) => ({
      guid,
      name,
      address: full_address,
      organisationName: organisation_name,
    }))
  };
};

// PQ_WAREHOUSE GOODS SETTINGS

export const getWarehouseGoods = async function (guid) {
  const {
    data: { status, count, items }
  } = await this.$axios({
    url: URL.PQ_WAREHOUSE_GOODS,
    method: "get",
    params: {
      access_token: getUserJWToken(this),
      warehouse_guid: guid
    }
  });

  const locale = getLangFromStore(this.store)

  return {
    status,
    count,
    items: items.map((item) => (formatGoods(item, locale)))
  };
};

export const createPQWarehouseGoods = async function (warehouseGuid, goodsGuid, direction) {
  const {
    data: { status, ...item }
  } = await this.$axios({
    url: URL.PQ_WAREHOUSE_GOODS,
    method: "post",
    params: {
      access_token: getUserJWToken(this),
    },
    data: {
      warehouse_guid: warehouseGuid,
      goods_guid: goodsGuid,
      direction,
    },
  });

  const locale = getLangFromStore(this.store)

  return {
    status,
    item: formatGoods(item, locale)
  };
};

export const deletePQWarehouseGoods = async function (warehouseGuid, goodsGuid) {
  const {
    data: { status }
  } = await this.$axios({
    url: URL.PQ_WAREHOUSE_GOODS,
    method: "post",
    params: {
      access_token: getUserJWToken(this),
      warehouse_guid: warehouseGuid,
      goods_guid: goodsGuid,
    },
  });

  return { status };
};
