const confirmChanges = function(context, config) {
  const t = context.$t
  context.$confirm(t('forms.common.confirmChanges'), t('forms.common.confirm'), {
    distinguishCancelAndClose: true,
    confirmButtonText: t('forms.common.save'),
    cancelButtonText: t('forms.common.discardChanges')
  })
  .then(() => {
    if (config && config.onSuccess) {
      config.onSuccess()
    }
  })
  .catch(action => {
    if (config && config.onCatch) {
      config.onCatch(action)
    }
  })
}

export default {
  confirmChanges
}
