const beforeRouteLeave = (context, formRef, next) => {
  if (context.changed) {
    context.$messageBoxes.confirmChanges(context, {
      onSuccess: () => {
        const form = context.$refs[formRef]
        if (form) {
          form.submit(success => {
            next(success)
          })
        }
      },
      onCatch: (action) => {
        next(action === 'cancel')
      }
    })
  } else {
    next()
  }
}

export default {
  beforeRouteLeave
}
