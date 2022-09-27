import Login from 'app/screens/Login'
import Main from 'app/screens/Main'
import Theme from 'app/screens/Theme'
// import Table from 'app/screens/Table'
// import Jsonform from 'app/screens/Jsonform'

const routes = [
  {
    name: 'Login',
    route: '/login',
    component: Login,
    props: { type: 'signIn' },
  },
  {
    name: 'Sign up',
    route: '/sign-up',
    component: Login,
    props: { type: 'signUp' },
  },
  {
    name: 'Main',
    route: '/home',
    component: Main,
  },
  {
    name: 'Theme',
    route: '/theme',
    component: Theme,
  },
  // {
  //   name: 'Table',
  //   route: '/table',
  //   component: Table,
  // },
  // {
  //   name: 'Jsonform',
  //   route: '/jsonform',
  //   component: Jsonform,
  // },
]

export default routes
