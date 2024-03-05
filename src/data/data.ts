import { type MenuModel } from '@/models';

export const menu: MenuModel[] = [{
  id: 'menu-1',
  name: '首页',
  component: '',
  to: '/',
  iconStr: 'carbon:home',
  default: true
}, {
  id: 'menu-2',
  name: '异常页',
  component: '',
  to: '',
  iconStr: 'carbon:data-error',
  default: false,
  children: [{
    id: 'menu-2-1',
    name: '403',
    component: '',
    to: '/403',
    iconStr: 'carbon:data-error',
    default: false,
    children: undefined
  }, {
    id: 'menu-2-2',
    name: '404',
    component: '',
    to: '/404',
    iconStr: 'carbon:data-error',
    default: false,
    children: undefined
  }, {
    id: 'menu-2-3',
    name: '500',
    component: '',
    to: '/500',
    iconStr: 'carbon:data-error',
    default: false,
    children: undefined
  }]
}, {
  id: 'menu-3',
  name: '列表',
  component: '',
  to: '',
  iconStr: 'material-symbols:table-chart',
  default: false,
  children: [{
    id: 'menu-3-1',
    name: '普通列表',
    component: '',
    to: '/ordinary-table',
    iconStr: 'material-symbols:table-chart',
    default: false,
    children: undefined
  }, {
    id: 'menu-3-2',
    name: '数据列表',
    component: '',
    to: '/data-table',
    iconStr: 'material-symbols:table-chart',
    default: false,
    children: undefined
  }, {
    id: 'menu-3-3',
    name: '树形列表',
    component: '',
    to: '/tree-table',
    iconStr: 'material-symbols:table-chart',
    default: false,
    children: undefined
  }]
}, {
  id: 'menu-4',
  name: '多级菜单',
  component: '',
  to: '',
  iconStr: '',
  default: false,
  children: [{
    id: 'menu-4-1',
    name: '菜单1',
    component: '',
    to: '',
    iconStr: '',
    default: false,
    children: [{
      id: 'menu-4-1-1',
      name: '菜单1-1',
      component: '',
      to: '',
      iconStr: '',
      default: false
    }, {
      id: 'menu-4-1-2',
      name: '菜单1-2',
      component: '',
      to: '',
      iconStr: '',
      default: false
    }]
  }, {
    id: 'menu-4-2',
    name: '菜单2',
    component: '',
    to: '',
    iconStr: '',
    default: false,
    children: [{
      id: 'menu-4-2-1',
      name: '菜单2-1',
      component: '',
      to: '',
      iconStr: '',
      default: false,
      children: [{
        id: 'menu-4-2-1-1',
        name: '菜单2-1-1',
        component: '',
        to: '',
        iconStr: '',
        default: false
      }]
    }]
  }]
}, {
  id: 'menu-5',
  name: '关于',
  component: '',
  to: '',
  iconStr: 'mdi:info-outline',
  default: false
}];