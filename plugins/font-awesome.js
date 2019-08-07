import Vue from 'vue'
import { library, config } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faAddressBook,
  faAddressCard,
  faAlignJustify,
  faAngleUp,
  faAngleDown,
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faAngleLeft,
  faAngleRight,
  faArchive,
  faArrowAltCircleUp,
  faArrowAltCircleDown,
  faArrowLeft,
  faAt,
  faBars,
  faBookmark,
  faBolt,
  faBookOpen,
  faBox,
  faBuilding,
  faCalendarAlt,
  faCaretDown,
  faCaretRight,
  faCheckCircle,
  faCheck,
  faCircle,
  faClock,
  faCog,
  faCode,
  faCopy,
  faFilter,
  faGlobe,
  faGripVertical,
  faEllipsisV,
  faEnvelope,
  faHistory,
  faHome,
  faLayerGroup,
  faList,
  faListAlt,
  faLock,
  faLongArrowAltLeft,
  faMapMarkedAlt,
  faMapMarkerAlt,
  faObjectGroup,
  faObjectUngroup,
  faPhone,
  faPen,
  faPlus,
  faRoad,
  faRoute,
  faSearch,
  faSignOutAlt,
  faShippingFast,
  faSort,
  faSortAlphaDown,
  faSortAlphaUp,
  faSyncAlt,
  faSuitcase,
  faSwatchbook,
  faTimes,
  faTruck,
  faTruckLoading,
  faTrain,
  faTrashAlt,
  faUser,
  faUsers,
  faWallet,
  faBalanceScale,
  faChevronUp,
  faQuestionCircle,
  faQuestion,
  faParking
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
  faAt,
  faGlobe,
  faPhone,
  faLongArrowAltLeft,
  faPen,
  faCaretDown,
  faCaretRight,
  faBars,
  faAngleUp,
  faAngleDown,
  faFilter,
  faLayerGroup,
  faObjectGroup,
  faObjectUngroup,
  faGripVertical,
  faEllipsisV,
  faSortAlphaDown,
  faSortAlphaUp,
  faMapMarkerAlt,
  faRoute,
  faHistory,
  faHome,
  faSort,
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
  faTruckLoading,
  faBox,
  faArchive,
  faCalendarAlt,
  faTrain,
  faBookOpen,
  faShippingFast,
  faCheckCircle,
  faCircle,
  faSyncAlt,
  faAngleDoubleRight,
  faAngleDoubleLeft,
  faPlus,
  faList,
  faSearch,
  faMapMarkedAlt,
  faTelegramPlane,
  faFacebookSquare,
  faTrashAlt,
  faBookmark,
  fasBookmark,
  faBolt,
  faAddressCard,
  faSuitcase,
  faSwatchbook,
  faTimes,
  faWallet,
  faRoad,
  faArrowAltCircleUp,
  faArrowAltCircleDown,
  faBalanceScale,
  faChevronUp,
  faLock,
  faQuestionCircle,
  faQuestion,
  faParking
)

// Register the component globally
Vue.component('fa', FontAwesomeIcon)
