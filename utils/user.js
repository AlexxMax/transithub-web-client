import { showErrorMessage } from '@/utils/messages'

export const getUserJWToken = ctx => {
  return ctx.store.state.user.token
}

export const userPhoneIsUnique = async function(phone) {
  const _phone = phone.pUnmaskPhone()
  try {
    const { status, phoneIsUnique } = await this.$api.users.phoneIsUnique(_phone)
    if (status) {
      if (phoneIsUnique) {
        return 1
      } else {
        return 2
      }
    } else {
      throw new Error(this.$t('messages.errorOnServer'))
    }
  } catch ({ message }) {
    showErrorMessage(message)
  }
  return 3
}
