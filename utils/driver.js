import { DIRECTIONS } from '@/utils/pq.queues'

export const MUTATIONS_KEYS = Object.freeze({
  SET_DRIVER: 'SET_DRIVER',
  SET_LOADING: 'SET_LOADING',

  // RACE FORM
  UPDATE_RACE_FORM: 'UPDATE_RACE_FORM',
  SET_RACE_FORM_MODIFICATION: 'SET_RACE_FORM_MODIFICATION',
  RESET_RACE_FORM: 'RESET_RACE_FORM',
  SET_RACE_FORM_ACTIVE_STEP: 'SET_RACE_FORM_ACTIVE_STEP',
  SET_RACE_FORM_PREVIOUS_STEP: 'SET_RACE_FORM_PREVIOUS_STEP',

  // WORKSPACE
  BOTTOM_NAVMENU_VISIBLE: 'BOTTOM_NAVMENU_VISIBLE',
  SET_ACTIONSHEET_VISIBLE: 'SET_ACTIONSHEET_VISIBLE',
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
  // pqWarehouseGuid: '',// pqWarehouseName: '',
  certSerialNumber: '',
  direction: DIRECTIONS.UNLOADING,
  vehicleNumber: '',
  trailerNumber: '',

  // Vehicle register
  pointToName: '',
  pointToRegion: '',
  pointToDistrict: '',
  pointToKoatuu: '',
  pqWarehouseToGuid: '',
  pqWarehouseToName: '',

  pointFromName: '',
  pointFromRegion: '',
  pointFromDistrict: '',
  pointFromKoatuu: '',
  pqWarehouseFromGuid: '',
  pqWarehouseFromName: '',

  vehiclesRegisterGuid: '',
  vehiclesRegisterNumber: '',
  senderName: '',
  goodsGuid: '',
  goodsName: '',
  carrierName: '',
  carrierGuid: '',

  // Waybill
  waybillNumber: '',
  waybillDate: new Date(),
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

  MANUAL_CREATION: 'manual-creation'
});

export const PERSON_DOCS_TYPE = Object.freeze({
  PASSPORT: 'passport',
  ID_CARD: 'id_card'
})

export const CREATION_TYPES = Object.freeze({
  AUTOMATIC: 'automatic',
  MANUAL: 'manual'
})