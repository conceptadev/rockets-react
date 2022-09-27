import Login from 'app/Screens/Login'
import Main from 'app/Screens/Main'
import Theme from 'app/Screens/Theme'
import Table from 'app/Screens/Table'
import Jsonform from 'app/Screens/Jsonform'

const routes = [
  {
    name: 'Login',
    route: '/login',
    component: <Login type={'signIn'} />,
  },
  {
    name: 'Sign up',
    route: '/sign-up',
    component: <Login type={'signUp'} />,
  },
  {
    name: 'Main',
    route: '/home',
    component: <Main />,
  },
  {
    name: 'Theme',
    route: '/theme',
    component: <Theme />,
  },
  {
    name: 'Table',
    route: '/table',
    component: <Table />,
  },
  {
    name: 'Jsonform',
    route: '/jsonform',
    component: <Jsonform />,
  },
]

export default routes
