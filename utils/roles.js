const ROLES = Object.freeze({
  owner: 'owner',
  admin: 'admin',
  user: 'user'
})

export const isOwner = role => role === ROLES.owner
export const isAdmin = role => role === ROLES.admin
