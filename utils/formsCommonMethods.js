import EventBus from '@/utils/eventBus'

export const onFormCreated = () => {
  EventBus.$emit('update-breadcrumbs')
}
