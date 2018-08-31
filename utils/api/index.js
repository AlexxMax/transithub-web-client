import { getUsers, updateUser, sendInvitationToUser } from '@/utils/api/companies.api'
import { getRequests, getRequest, filterNumbers, filterClientsNames, filterGoods } from '@/utils/api/requests.api'
import { getPoints } from '@/utils/api/points.api'
import { getRaces } from '@/utils/api/races.api'
import { createUser, findUserByEmail, changePassword } from '@/utils/api/users.api'
import { getVehiclesRegisters } from '@/utils/api/vehiclesRegisters.api'

export default {
  companies: {
    getUsers,
    updateUser,
    sendInvitationToUser
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
    getRaces
  },
  users: {
    create: createUser,
    findByEmail: findUserByEmail,
    changePassword
  },
  vehiclesRegisters: {
    getVehiclesRegisters
  }
}
