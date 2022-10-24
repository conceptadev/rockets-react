import { FC } from 'react'
import { Box, Button, Table, Text } from '@concepta/react-material-ui'
import { useTheme } from '@concepta/react-material-ui/dist/styles'
import { RowsProps } from '@concepta/react-material-ui/dist/components/Table/Table'
import ScreenWithContainer from 'app/components/ScreenWithContainer'
import { rows, headers } from './fakeData'
import { CustomNameCell, CustomRoleCell } from './CustomCells'

const TeamMembers: FC = () => {
  const theme = useTheme()

  const customRows: () => RowsProps[] = () => {
    return rows.map(row => {
      const { id, name, email, role } = row

      return {
        id,
        name: {
          sortableValue: name,
          component: <CustomNameCell name={name} email={email} />,
        },
        role: {
          sortableValue: role,
          component: <CustomRoleCell id={id} role={role} />,
        },
      }
    })
  }

  const lightMode = theme.palette.mode === 'light'

  return (
    <ScreenWithContainer currentId="teamMembers">
      <Box display="flex" sx={{ mb: 4 }}>
        <Box flex={1}>
          <Text
            fontWeight="500"
            fontSize={24}
            sx={{ color: lightMode ? '#111827' : '#dce2ee' }}
          >
            Team Members
          </Text>
          <Text
            fontWeight="400"
            fontSize={14}
            sx={{ color: lightMode ? '#6B7280' : '#9098a7' }}
          >
            Invite other members to your account
          </Text>
        </Box>
        <Box display="flex" alignItems="flex-end">
          <Button variant="contained">Invite New Member</Button>
        </Box>
      </Box>

      <Table rows={customRows()} headers={headers} variant="outlined" />
    </ScreenWithContainer>
  )
}

export default TeamMembers
