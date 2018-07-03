import { updateUser, sendInvitationToUser } from '@/utils/api/companies.api.js'
import { createUser, findUserByEmail } from '@/utils/api/users.api.js'

export default {
  companies: {
    updateUser,
    sendInvitationToUser
  },
  users: {
    create: createUser,
    findByEmail: findUserByEmail
  }
}
