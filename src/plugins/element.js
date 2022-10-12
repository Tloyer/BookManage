import Vue from 'vue'
import { 
    Button, 
    Input, 
    Form, 
    FormItem, 
    Message, 
    Container, 
    Header, 
    Aside, 
    Main,
    Footer, 
    Menu, MenuItem, Submenu, 
    Breadcrumb, BreadcrumbItem,
    Table, TableColumn,
    Card,
    Row, Col,
    Switch,
    Tooltip,
    Pagination,
    Dialog,
    MessageBox,
    Tag,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Upload,
    Select,
    Option,
    DatePicker} from 'element-ui'

Vue.use(Button)
Vue.use(Input)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Footer)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Submenu)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Card)
Vue.use(Row)
Vue.use(Col)
Vue.use(Switch)
Vue.use(Tooltip)
Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Tag)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Upload)
Vue.use(Select)
Vue.use(Option)
Vue.use(DatePicker)
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
