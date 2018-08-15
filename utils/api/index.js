import { getUsers, updateUser, sendInvitationToUser } from '@/utils/api/companies.api'
import { getRequests, filterNumbers, filterClientsNames, filterGoods } from '@/utils/api/requests.api'
import { getPoints } from '@/utils/api/points.api'
import { createUser, findUserByEmail, changePassword } from '@/utils/api/users.api'

export default {
  companies: {
    getUsers,
    updateUser,
    sendInvitationToUser
  },
  requests: {
    getRequests,
    filterNumbers,
    filterClientsNames,
    filterGoods
  },
  points: {
    getPoints
  },
  users: {
    create: createUser,
    findByEmail: findUserByEmail,
    changePassword
  }
}
