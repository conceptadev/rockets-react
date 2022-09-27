import { useContext } from 'react'
import { ThemeProvider } from '@concepta/react-material-ui/dist/styles'
import { themeLight, themeDark } from 'app/styles/theme'
import {
  ThemeContext,
  ThemeContextType,
} from 'app/context/ThemeContextProvider'
import { PublicRoute, Router } from '@concepta/react-router'
import routes from 'routes'

const NotFound = () => {
  return <div>Not Found</div>
}

const Unauthorized = () => {
  return <div>Unauthorized</div>
}

const App = () => {
  const { darkMode } = useContext(ThemeContext) as ThemeContextType

  return (
    <ThemeProvider theme={darkMode ? themeDark : themeLight}>
      <Router
        isAuth={false}
        NotFoundComponent={NotFound}
        UnauthorizedComponent={Unauthorized}
      >
        {routes.map(route => (
          <PublicRoute
            path={route.route}
            Component={route.component}
            key={route.name}
            {...route.props}
          />
        ))}
      </Router>
    </ThemeProvider>
  )
}

export default App
