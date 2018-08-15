export const getUserJWToken = ctx => {
  return ctx.store ? ctx.store.state.user.token : ctx.$store.state.user.token
}
