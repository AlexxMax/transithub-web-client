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

const getWorkspaceRoute = ({ name, params = {}, query = {} }) => {
  const words = name.split('-')
  words.splice(1, 0, 'workspace')
  return {
    name: words.join('-'),
    params,
    query
  }
}

export default {
  beforeRouteLeave,
  getWorkspaceRoute
}
