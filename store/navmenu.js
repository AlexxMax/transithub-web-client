export const state = () => ({
  list: [{
    icon: 'fa-list-alt',
    title: 'Orders',
    link: 'workspace/orders' //here is problem with link path
  }, {
    icon: 'fa-shopping-cart',
    title: 'Cart'
  }, {
    icon: 'fa-calendar-alt',
    title: 'Calendar'
  }, {
    icon: 'fa-book',
    title: 'Catalogs'
  }]
})
