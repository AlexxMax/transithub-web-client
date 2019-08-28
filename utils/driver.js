import { DIRECTIONS } from '@/utils/pq.queues'

export const MUTATIONS_KEYS = Object.freeze({
  SET_DRIVER: 'SET_DRIVER',
  SET_LOADING: 'SET_LOADING',

  // RACE FORM
  UPDATE_RACE_FORM: 'UPDATE_RACE_FORM',
  SET_RACE_FORM_MODIFICATION: 'SET_RACE_FORM_MODIFICATION',
  RESET_RACE_FORM: 'RESET_RACE_FORM',
  SET_RACE_FORM_ACTIVE_STEP: 'SET_RACE_FORM_ACTIVE_STEP',

  // WORKSPACE
  BOTTOM_NAVMENU_VISIBLE: 'BOTTOM_NAVMENU_VISIBLE',
})

export const ACTIONS_KEYS = Object.freeze({
  FETCH_DRIVER: 'FETCH_DRIVER',
  CREATE_DRIVER: 'CREATE_DRIVER',
  CHANGE_DRIVER: 'CHANGE_DRIVER',
})

export const STORE_MODULE_NAME = 'driver'
export const STORE_MODULE_NAME_RACE_FORM = 'driver/races/form'
export const STORE_MODULE_NAME_WORKSPACE = 'driver/workspace'

export const defaultRaceFormData = Object.freeze({
  pq_warehouse_guid: '',
  certSerialNumber: '',
  direction: DIRECTIONS.UNLOADING,
  vehicleNumber: '',
  trailerNumber: '',
  vehiclesRegisterGuid: '',
  pointFromKoatuu: '',
  senderName: '',
  goodsGuid: '',
  carrierName: '',
  carrierGuid: '',
  waybillNumber: '',
  waybillDate: '',
  waybillGross: 0,
  waybillTara: 0,
  waybillNet: 0,
  noWaybillWeight: false,
  quantity: 0,
  geoLat: null,
  geoLng: null,
  checkGeo: false,
});

export const RACE_FORM_STEPS = Object.freeze({
  START: 'start',
  SELECT_VEHICLE_REGISTER: 'select-vehicle-register',
  ACCEPT_VEHICLE_REGISTER: 'accept-vehicle-register',
  DATA_REFINEMENT: 'data-refinement',
  WAYBILL: 'waybill',
});

export const PERSON_DOCS_TYPE = Object.freeze({
  PASSPORT: 'passport',
  ID_CARD: 'id_card'
})
