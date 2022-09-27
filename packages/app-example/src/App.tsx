import React, { useContext } from 'react'
import { Box } from '@concepta/react-material-ui/'
import { ThemeProvider } from '@concepta/react-material-ui/dist/styles'
import { themeLight, themeDark } from 'app/styles/theme'
import {
  ThemeContext,
  ThemeContextType,
} from 'app/context/ThemeContextProvider'

const App = () => {
  const { darkMode } = useContext(ThemeContext) as ThemeContextType

  const text = 'Hello world?!'
  return (
    <ThemeProvider theme={darkMode ? themeDark : themeLight}>
      <Box flex="1" sx={{ backgroundColor: '#ccffff' }}>
        <Box alignContent="center" justifyContent="center">
          {text}
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export default App
