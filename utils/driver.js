import moment from 'moment'
import { DIRECTIONS } from '@/utils/pq.queues'

export const MUTATIONS_KEYS = Object.freeze({
  SET_DRIVER: 'SET_DRIVER',
  SET_LOADING: 'SET_LOADING',

  // RACE FORM
  SET_RACE_FORM_ACTIVE_STEP: 'SET_RACE_FORM_ACTIVE_STEP',
  SET_RACE_FORM_PREVIOUS_STEP: 'SET_RACE_FORM_PREVIOUS_STEP',

  SET_RACE_FORM_MODIFICATION: 'SET_RACE_FORM_MODIFICATION',

  SET_RACE_FORM_CREATION_TYPE: 'SET_RACE_FORM_CREATION_TYPE',

  SET_RACE_FORM_VEHICLES_REGISTERS: 'SET_RACE_FORM_VEHICLES_REGISTERS',
  SET_RACE_FORM_VEHICLES_REGISTERS_LOADING: 'SET_RACE_FORM_VEHICLES_REGISTERS_LOADING',
  SET_RACE_FORM_VEHICLES_REGISTERS_OFFSET: 'SET_RACE_FORM_VEHICLES_REGISTERS_OFFSET',

  UPDATE_RACE_FORM: 'UPDATE_RACE_FORM',
  RESET_RACE_FORM: 'RESET_RACE_FORM',

  // WORKSPACE
  BOTTOM_NAVMENU_VISIBLE: 'BOTTOM_NAVMENU_VISIBLE',
  SET_ACTIONSHEET: 'SET_ACTIONSHEET',
})

export const ACTIONS_KEYS = Object.freeze({
  FETCH_DRIVER: 'FETCH_DRIVER',
  CREATE_DRIVER: 'CREATE_DRIVER',
  CHANGE_DRIVER: 'CHANGE_DRIVER',

  FETCH_VEHICLES_REGISTERS: 'FETCH_VEHICLES_REGISTERS',
})

export const STORE_MODULE_NAME = 'driver'
export const STORE_MODULE_NAME_RACE_FORM = 'driver/races/form'
export const STORE_MODULE_NAME_WORKSPACE = 'driver/workspace'

export const defaultRaceFormData = Object.freeze({
  // Vehicle register
  pointToName: '',
  // pointToRegion: '',
  // pointToDistrict: '',
  pointToKoatuu: '',
  warehouseToCode: '',
  warehouseToName: '',

  pointFromName: '',
  // pointFromRegion: '',
  // pointFromDistrict: '',
  pointFromKoatuu: '',
  warehouseFromCode: '',
  warehouseFromName: '',

  vehicleNumber: '',
  trailerNumber: '',

  senderName: '',
  goodsGuid: '',
  goodsName: '',
  carrierName: '',
  // carrierGuid: '',

  // driverFullName: '',

  // Waybill
  waybillNumber: '',
  waybillDate: moment(new Date()).format('DD.MM.YYYY'),
  waybillGross: 1000,
  waybillTara: 1000,
  waybillNet: 0,
  noWaybillWeight: false,
  quantity: 0
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
  BY_VEHICLE_REGISTER: 'by-vehicle-register',
  MANUAL: 'manual'
})
