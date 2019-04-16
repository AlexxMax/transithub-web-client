import Vue from 'vue'
import { library, config } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faAt,
  faGlobe,
  faPhone,
  faLongArrowAltLeft,
  faPen,
  faCaretDown,
  faCaretRight,
  faBars,
  faBell,
  faAngleUp,
  faAngleDown,
  faInfoCircle,
  faFilter,
  faLayerGroup,
  faObjectGroup,
  faObjectUngroup,
  faGripVertical,
  faSortUp,
  faSortDown,
  faSort,
  faEllipsisV,
  faSortAlphaDown,
  faSortAlphaUp,
  faMapMarkerAlt,
  faRoute,
  faHome,
  faAddressBook,
  faEnvelope,
  faListAlt,
  faUser,
  faBuilding,
  faCode,
  faCopy,
  faAlignJustify,
  faUsers,
  faCheck,
  faArrowLeft,
  faCog,
  faAngleLeft,
  faAngleRight,
  faSignOutAlt,
  faClock,
  faTruck,
  faBox,
  faArchive,
  faCalendarAlt,
  faTrain,
  faWarehouse,
  faMapSigns,
  faBookOpen,
  faShippingFast,
  faHistory,
  faCheckCircle,
  faKey,
  faCircle,
  faSyncAlt,
  faChevronUp,
  faLock,
  faAngleDoubleRight,
  faPlus,
  faAngleDoubleLeft,
  faList,
  faSearch,
  faMapMarkedAlt,
  // faStar,
  faTrashAlt,
  faBookmark,
  faBolt,
  faAddressCard,
  faSuitcase
} from '@fortawesome/free-solid-svg-icons'
import { faBookmark as fasBookmark } from '@fortawesome/free-regular-svg-icons';
import {
  faTelegramPlane,
  faFacebookSquare
} from '@fortawesome/free-brands-svg-icons'

// This is important, we are going to let Nuxt.js worry about the CSS
config.autoAddCss = false

// You can add your icons directly in this plugin. See other examples for how you
// can add other styles or just individual icons.
library.add(
  // fas
  faAt,
  faGlobe,
  faPhone,
  faLongArrowAltLeft,
  faPen,
  faCaretDown,
  faCaretRight,
  faBars,
  faBell,
  faAngleUp,
  faAngleDown,
  faInfoCircle,
  faFilter,
  faLayerGroup,
  faObjectGroup,
  faObjectUngroup,
  faGripVertical,
  faSortUp,
  faSortDown,
  faSort,
  faEllipsisV,
  faSortAlphaDown,
  faSortAlphaUp,
  faMapMarkerAlt,
  faRoute,
  faHome,
  faAddressBook,
  faEnvelope,
  faListAlt,
  faUser,
  faBuilding,
  faCode,
  faCopy,
  faAlignJustify,
  faUsers,
  faCheck,
  faArrowLeft,
  faCog,
  faAngleLeft,
  faAngleRight,
  faSignOutAlt,
  faClock,
  faTruck,
  faBox,
  faArchive,
  faCalendarAlt,
  faTrain,
  faWarehouse,
  faMapSigns,
  faBookOpen,
  faShippingFast,
  faHistory,
  faCheckCircle,
  faKey,
  faCircle,
  faSyncAlt,
  faChevronUp,
  faLock,
  faAngleDoubleRight,
  faAngleDoubleLeft,
  faPlus,
  faList,
  faSearch,
  faMapMarkedAlt,
  // faStar,
  // fab
  faTelegramPlane,
  faFacebookSquare,
  faTrashAlt,
  faBookmark,
  fasBookmark,
  faBolt,
  faAddressCard,
  faSuitcase
)

// Register the component globally
Vue.component('fa', FontAwesomeIcon)
