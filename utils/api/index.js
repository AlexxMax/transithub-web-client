import { getUsers, updateUser, sendInvitationToUser } from '@/utils/api/companies.api.js'
import { createUser, findUserByEmail, changePassword } from '@/utils/api/users.api.js'

export default {
  companies: {
    getUsers,
    updateUser,
    sendInvitationToUser
  },
  users: {
    create: createUser,
    findByEmail: findUserByEmail,
    changePassword
  }
}
