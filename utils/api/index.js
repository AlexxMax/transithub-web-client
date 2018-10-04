import {
  getUsers,
  updateUser,
  sendInvitationToUser,
  getInvitationInfo,
  acceptInvitation
} from '@/utils/api/companies.api'
import {
  getRequests,
  getRequest,
  filterNumbers,
  filterClientsNames,
  filterGoods
} from '@/utils/api/requests.api'
import { getPoints } from '@/utils/api/points.api'
import {
  getRaces,
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
  changePassword,
  activateUser
} from '@/utils/api/users.api'
import {
  getVehicleRegister,
  getVehiclesRegisters,
  filterDrivers,
  filterVehicles,
  filterTrailers
} from '@/utils/api/vehiclesRegisters.api'

export default (context) => {
  return {
    companies: {
      getUsers: getUsers.bind(context),
      updateUser: updateUser.bind(context),
      sendInvitationToUser: sendInvitationToUser.bind(context),
      getInvitationInfo: getInvitationInfo.bind(context),
      acceptInvitation: acceptInvitation.bind(context)
    },
    requests: {
      getRequest: getRequest.bind(context),
      getRequests: getRequests.bind(context),
      filterNumbers: filterNumbers.bind(context),
      filterClientsNames: filterClientsNames.bind(context),
      filterGoods: filterGoods.bind(context)
    },
    points: {
      getPoints: getPoints.bind(context)
    },
    races: {
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
      changePassword: changePassword.bind(context),
      activateUser: activateUser.bind(context)
    },
    vehiclesRegisters: {
      getVehicleRegister: getVehicleRegister.bind(context),
      getVehiclesRegisters: getVehiclesRegisters.bind(context),
      filterDrivers: filterDrivers.bind(context),
      filterVehicles: filterVehicles.bind(context),
      filterTrailers: filterTrailers.bind(context)
    }
  }
}
