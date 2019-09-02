import Vue from 'vue'
import {
  Breadcrumb,
  Button,
  Tooltip,
  Form,
  FormItem,
  Input,
  InputNumber,
  Dialog,
  Badge,
  Pagination,
  Row,
  Col,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Tree,
  ButtonGroup,
  Tabs,
  TabPane,
  DatePicker,
  Table,
  TableColumn,
  Card,
  Select,
  Option,
  OptionGroup,
  Menu,
  MenuItem,
  Radio,
  RadioGroup,
  RadioButton,
  Popover,
  Checkbox,
  Switch,
  Container,
  Aside,
  Main,
  Header,
  Footer,
  Loading,
  MessageBox,
  Tag,
  CheckboxGroup,
  Steps,
  Step,
  Autocomplete,
  Alert,
  Avatar,
  Progress,
  Slider
} from 'element-ui'
import lang from 'element-ui/lib/locale/lang/ua'
import locale from 'element-ui/lib/locale'
import '@/assets/styles/element-variables.scss'

// configure language
locale.use(lang)

Vue.use(Breadcrumb)
Vue.use(Button)
Vue.use(Tooltip)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(InputNumber)
Vue.use(Dialog)
Vue.use(Badge)
Vue.use(Pagination)
Vue.use(Row)
Vue.use(Col)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Tree)
Vue.use(ButtonGroup)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(DatePicker)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Card)
Vue.use(Select)
Vue.use(Option)
Vue.use(OptionGroup)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(RadioButton)
Vue.use(Popover)
Vue.use(Checkbox)
Vue.use(Switch)
Vue.use(Container)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Header)
Vue.use(Footer)
Vue.use(Tag)
Vue.use(CheckboxGroup)
Vue.use(Steps)
Vue.use(Step)
Vue.use(Autocomplete)
Vue.use(Alert)
Vue.use(Avatar)
Vue.use(Progress)
Vue.use(Slider)

Vue.use(Loading.directive)

Vue.prototype.$loading = Loading.service
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$alert = MessageBox.alert