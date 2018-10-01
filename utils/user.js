export const getUserJWToken = ctx => {
  return ctx.store.state.user.token
}
