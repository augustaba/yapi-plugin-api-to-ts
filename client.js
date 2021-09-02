import InterfaceTab from './pages/InterfaceTab';
import LeGaoTab from './pages/LeGaoTab';
import SubNav from './pages/SubNav';

module.exports = function () {
  this.bindHook('interface_tab', tabs => {
    tabs.helloPlugin = {
      name: 'TypeScript',
      component: InterfaceTab
    }
    tabs.LeGaoPlugin = {
      name: 'LEGO专用',
      component: LeGaoTab
    }
  })
  // this.bindHook('sub_nav', app => {
  //   app.typeTrans = {
  //     name: '批量转换',
  //     path: '/project/:id/type-trans',
  //     component: SubNav
  //   }
  // })
}
