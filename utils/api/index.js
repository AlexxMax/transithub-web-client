import {
  getUsers,
  updateUser,
  sendInvitationToUser,
  getInvitationInfo,
  acceptInvitation,
  createCompanySimple
} from '@/utils/api/companies.api'
import {
  getRequests,
  getRequest,
  filterNumbers,
  filterClientsNames,
  filterGoods,
  quantityHistory
} from '@/utils/api/requests.api'
import {
  getPoints,
  getPoint,
 } from '@/utils/api/points.api'
import {
  getWarehouse,
} from '@/utils/api/warehouses.api'
import {
  getRaces,
  getRace,
  filterNumbers as racesFilterNumbers,
  filterDrivers as racesFilterDrivers,
  filterVehicles as racesFilterVehicles,
  filterTrailers as racesFilterTrailers
} from '@/utils/api/races.api'
import {
  createUser,
  findUserByEmail,
  findUserByGuid,
  updateUser as usersUpdateUser,
  updateUserOnRegistration,
  changePassword,
  activateUser,
  sendPinToUser,
  phoneIsUnique,
  checkPhoneByPin
} from '@/utils/api/users.api'
import {
  getVehicleRegister,
  getVehiclesRegisters,
  filterDrivers,
  filterVehicles,
  filterTrailers
} from '@/utils/api/vehiclesRegisters.api'
import {
  getRailwayAggregation,
  postRailwayAggregation,
  updateRailwayAggregation,
  setRailwayAggregationStatus,
  getRailwayAggregations,
  getRailwayAggregationRequest,
  getRailwayAggregationRequests,
  postRailwayAggregationRequest,
  updateRailwayAggregationRequest,
  setRailwayAggregationRequestStatus,
  getRailwayAffilations,
  getRailwayStations,
  getRailwayStationsRoads,
  getRailwayReferenceStations,
  getFilterStatuses,
  getFilterCompanies as getFilterCompaniesRailway
} from '@/utils/api/railway-aggregations.api'
import {
  getGoods
} from '@/utils/api/goods.api'

export default (context) => {
  return {
    companies: {
      getUsers: getUsers.bind(context),
      updateUser: updateUser.bind(context),
      sendInvitationToUser: sendInvitationToUser.bind(context),
      getInvitationInfo: getInvitationInfo.bind(context),
      acceptInvitation: acceptInvitation.bind(context),
      createCompanySimple: createCompanySimple.bind(context)
    },
    requests: {
      getRequest: getRequest.bind(context),
      getRequests: getRequests.bind(context),
      filterNumbers: filterNumbers.bind(context),
      filterClientsNames: filterClientsNames.bind(context),
      filterGoods: filterGoods.bind(context),
      quantityHistory: quantityHistory.bind(context)
    },
    points: {
      getPoints: getPoints.bind(context),
      getPoint: getPoint.bind(context)
    },
    warehouses: {
      getWarehouse: getWarehouse.bind(context)
    },
    races: {
      getRace: getRace.bind(context),
      getRaces: getRaces.bind(context),
      filterNumbers: racesFilterNumbers.bind(context),
      filterDrivers: racesFilterDrivers.bind(context),
      filterVehicles: racesFilterVehicles.bind(context),
      filterTrailers: racesFilterTrailers.bind(context)
    },
    users: {
      createUser: createUser.bind(context),
      findByEmail: findUserByEmail.bind(context),
      findByGuid: findUserByGuid.bind(context),
      updateUser: usersUpdateUser.bind(context),
      updateUserOnRegistration: updateUserOnRegistration.bind(context),
      changePassword: changePassword.bind(context),
      activateUser: activateUser.bind(context),
      sendPinToUser: sendPinToUser.bind(context),
      phoneIsUnique: phoneIsUnique.bind(context),
      checkPhoneByPin: checkPhoneByPin.bind(context)
    },
    vehiclesRegisters: {
      getVehicleRegister: getVehicleRegister.bind(context),
      getVehiclesRegisters: getVehiclesRegisters.bind(context),
      filterDrivers: filterDrivers.bind(context),
      filterVehicles: filterVehicles.bind(context),
      filterTrailers: filterTrailers.bind(context)
    },
    railway: {
      getRailwayAggregation: getRailwayAggregation.bind(context),
      postRailwayAggregation: postRailwayAggregation.bind(context),
      updateRailwayAggregation: updateRailwayAggregation.bind(context),
      setRailwayAggregationStatus: setRailwayAggregationStatus.bind(context),
      getRailwayAggregations: getRailwayAggregations.bind(context),
      getRailwayAggregationRequest: getRailwayAggregationRequest.bind(context),
      getRailwayAggregationRequests: getRailwayAggregationRequests.bind(context),
      postRailwayAggregationRequest: postRailwayAggregationRequest.bind(context),
      updateRailwayAggregationRequest: updateRailwayAggregationRequest.bind(context),
      setRailwayAggregationRequestStatus: setRailwayAggregationRequestStatus.bind(context),
      getRailwayAffilations: getRailwayAffilations.bind(context),
      getRailwayStations: getRailwayStations.bind(context),
      getRailwayStationsRoads: getRailwayStationsRoads.bind(context),
      getRailwayReferenceStations: getRailwayReferenceStations.bind(context),
      getFilterStatuses: getFilterStatuses.bind(context),
      getFilterCompaniesRailway: getFilterCompaniesRailway.bind(context)
    },
    goods: {
      getGoods: getGoods.bind(context)
    }
  }
}
