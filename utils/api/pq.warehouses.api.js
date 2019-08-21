import _ from "lodash";

import { getUserJWToken } from "@/utils/user";
import { getLangFromStore } from '@/utils/locale'
import { PAGE_SIZE } from "@/utils/defaultValues";

const URL = Object.freeze({
  PQ_WAREHOUSES: "/api1/transithub/pq_warehouses",
  SEARCH_PQ_WAREHOUSERS: "/api1/transithub/pq_warehouses/search",
  PQ_WAREHOUSE_GOODS: "/api1/transithub/pq_warehouse/goods"
});

// Each object key from smake_case to camelCame
const format = item =>
  Object.keys(item).reduce(
    (obj, key) => ({ ...obj, [_.camelCase(key)]: item[key] }),
    {}
  );

const formatResponse = (item, store) => ({
  company_guid: store.state.companies.currentCompany.guid,
  name: item.name,
  organisation_guid: item.organisation,
  full_address: item.address,
  geo_registration_lat: item.lat,
  geo_registration_lng: item.lng,

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
export const getPQWarehouses = async function(offset, limit = PAGE_SIZE) {
  const { status, count, items } = await this.$axios.$get(URL.PQ_WAREHOUSES, {
    params: {
      access_token: getUserJWToken(this),
      company_guid: this.store.state.companies.currentCompany.guid,
      offset,
      limit
    }
  });

  if (!status) return;

  const formatedItems = items.map(item => format(item));

  return { status, count, items: formatedItems };
};

export const getPQWarehouse = async function(
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

export const createPQWarehouse = async function(form) {
  const payload = formatResponse(form, this.store);

  const { state } = await this.$axios.$post(URL.PQ_WAREHOUSES, payload, {
    params: {
      access_token: getUserJWToken(this)
    }
  });

  return state === "created" ? true : false;
};

export const updatePQWarehouse = async function(guid, form) {
  const payload = formatResponse(form, this.store);

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


// PQ WAREHOUSE GLOBAL SEARCH

export const searchWarehouses = async function(search) {
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
    items: items.map(({ guid, name, full_address }) => ({
      guid,
      name,
      address: full_address
    }))
  };
};


// PQ_WAREHOUSE GOODS SETTINGS

export const getWarehouseGoods = async function(guid) {
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

export const createPQWarehouseGoods = async function(warehouseGuid, goodsGuid, direction) {
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

export const deletePQWarehouseGoods = async function(warehouseGuid, goodsGuid) {
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
