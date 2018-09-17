import { getUsers, updateUser, sendInvitationToUser, getInvitationInfo, acceptInvitation } from '@/utils/api/companies.api'
import { getRequests, getRequest, filterNumbers, filterClientsNames, filterGoods } from '@/utils/api/requests.api'
import { getPoints } from '@/utils/api/points.api'
import { getRaces, filterNumbers as racesFilterNumbers, filterDrivers as racesFilterDrivers, filterVehicles as racesFilterVehicles, filterTrailers as racesFilterTrailers } from '@/utils/api/races.api'
import { createUser, findUserByEmail, changePassword } from '@/utils/api/users.api'
import { getVehiclesRegisters, filterDrivers, filterVehicles, filterTrailers } from '@/utils/api/vehiclesRegisters.api'

export default {
  companies: {
    getUsers,
    updateUser,
    sendInvitationToUser,
    getInvitationInfo,
    acceptInvitation
  },
  requests: {
    getRequest,
    getRequests,
    filterNumbers,
    filterClientsNames,
    filterGoods
  },
  points: {
    getPoints
  },
  races: {
    getRaces,
    filterNumbers: racesFilterNumbers,
    filterDrivers: racesFilterDrivers,
    filterVehicles: racesFilterVehicles,
    filterTrailers: racesFilterTrailers
  },
  users: {
    create: createUser,
    findByEmail: findUserByEmail,
    changePassword
  },
  vehiclesRegisters: {
    getVehiclesRegisters,
    filterDrivers,
    filterVehicles,
    filterTrailers
  }
}
