export const state = () => ({
  list: [{
    icon: 'fa-list-alt',
    title: 'Orders',
    link: 'workspace/orders' //here is problem with link path
  }, {
    icon: 'fa-address-card',
    title: 'Drivers',
    link: 'workspace/drivers'
  }, {
    icon: 'fa-truck',
    title: 'Vehicles',
    link: 'workspace/vehicles'
  }]
})
