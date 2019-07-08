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
  quantityHistory,
  setUserStatus
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
  checkPhoneByPin,
  changePasswordSendPin,
  changePasswordConfirm
} from '@/utils/api/users.api'
import {
  getVehicleRegister,
  getVehiclesRegisters,
  filterDrivers,
  filterVehicles,
  filterTrailers,
  createOrUpdateVehicleRegister,
  subscribeVehicleRegister
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
  getRailwayPolygons,
  getFilterStatuses,
  getFilterCompanies as getFilterCompaniesRailway,
  getRailwayAggregationsForMap
} from '@/utils/api/railway-aggregations.api'
import {
  getGoods
} from '@/utils/api/goods.api'
// import {
//   getTags,
//   postTag,
//   deleteTag
// } from '@/utils/api/tags.api'
import {
  getFilters,
  createNewFilters,
  removeFilters,
  changeSubscription
} from '@/utils/api/users-filters.api'
import {
  getFavorites,
  postFavorite,
  deleteFavorite
} from '@/utils/api/favorites.api'
import {
  getDrivers,
  getDriver,
  createDriver,
  changeDriver
} from '@/utils/api/drivers.api'
import {
  getVehicles,
  getVehicle,
  createVehicle,
  changeVehicle,
  getBrands,
  getTypes,
  getSubtypes
} from '@/utils/api/vehicles.api'
import {
  getOrganisations,
  createOrganisation,
  changeOrganisation,
  deleteOrganisation
} from '@/utils/api/organisations.api'

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
      quantityHistory: quantityHistory.bind(context),
      setUserStatus: setUserStatus.bind(context)
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
      checkPhoneByPin: checkPhoneByPin.bind(context),
      changePasswordSendPin: changePasswordSendPin.bind(context),
      changePasswordConfirm: changePasswordConfirm.bind(context)
    },
    vehiclesRegisters: {
      getVehicleRegister: getVehicleRegister.bind(context),
      getVehiclesRegisters: getVehiclesRegisters.bind(context),
      filterDrivers: filterDrivers.bind(context),
      filterVehicles: filterVehicles.bind(context),
      filterTrailers: filterTrailers.bind(context),
      createOrUpdateVehicleRegister: createOrUpdateVehicleRegister.bind(context),
      subscribeVehicleRegister: subscribeVehicleRegister.bind(context)
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
      getRailwayPolygons: getRailwayPolygons.bind(context),
      getFilterStatuses: getFilterStatuses.bind(context),
      getFilterCompaniesRailway: getFilterCompaniesRailway.bind(context),
      getRailwayAggregationsForMap: getRailwayAggregationsForMap.bind(context)
    },
    goods: {
      getGoods: getGoods.bind(context)
    },
    // tags: {
    //   getTags: getTags.bind(context),
    //   postTag: postTag.bind(context),
    //   deleteTag: deleteTag.bind(context)
    // },
    usersFilters: {
      getFilters: getFilters.bind(context),
      createNewFilters: createNewFilters.bind(context),
      removeFilters: removeFilters.bind(context),
      changeSubscription: changeSubscription.bind(context)
    },
    favorites: {
      getFavorites: getFavorites.bind(context),
      postFavorite: postFavorite.bind(context),
      deleteFavorite: deleteFavorite.bind(context)
    },
    drivers: {
      getDrivers: getDrivers.bind(context),
      getDriver: getDriver.bind(context),
      createDriver: createDriver.bind(context),
      changeDriver: changeDriver.bind(context)
    },
    vehicles: {
      getVehicles: getVehicles.bind(context),
      getVehicle: getVehicle.bind(context),
      createVehicle: createVehicle.bind(context),
      changeVehicle: changeVehicle.bind(context),
      getBrands: getBrands.bind(context),
      getTypes: getTypes.bind(context),
      getSubtypes: getSubtypes.bind(context)
    },
    organisations: {
      getOrganisations: getOrganisations.bind(context),
      createOrganisation: createOrganisation.bind(context),
      changeOrganisation: changeOrganisation.bind(context),
      deleteOrganisation: deleteOrganisation.bind(context)
    }
  }
}
