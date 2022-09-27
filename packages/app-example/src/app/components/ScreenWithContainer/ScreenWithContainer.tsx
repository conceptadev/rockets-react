import { FC, ReactNode } from 'react'
import { ContainerWithDrawer, Drawer } from '@concepta/react-material-ui'
import { useNavigate } from '@concepta/react-router'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined'
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined'
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined'
import ExtensionOutlinedIcon from '@mui/icons-material/ExtensionOutlined'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import ColorLensOutlinedIcon from '@mui/icons-material/ColorLensOutlined'
import GridOnIcon from '@mui/icons-material/GridOn'
import CodeIcon from '@mui/icons-material/Code'

type Props = {
  currentId: string
  children: ReactNode
}

const ScreenWithContainer: FC<Props> = ({ currentId, children }) => {
  const navigate = useNavigate()

  const drawerMenuItems = [
    {
      id: 'profile',
      icon: <PersonOutlineOutlinedIcon />,
      text: 'Profile',
      onClick: () => alert('foo'),
    },
    {
      id: 'account',
      icon: <BusinessOutlinedIcon />,
      text: 'Account',
      onClick: () => alert('foo'),
      active: true,
    },
    {
      id: 'teamMembers',
      icon: <GroupsOutlinedIcon />,
      text: 'Team Members',
      onClick: () => alert('foo'),
    },
    {
      id: 'billing',
      icon: <PaymentsOutlinedIcon />,
      text: 'Billing',
      onClick: () => alert('foo'),
    },
    {
      id: 'integrations',
      icon: <ExtensionOutlinedIcon />,
      text: 'Integrations',
      onClick: () => alert('foo'),
    },
    {
      id: 'home',
      icon: <HomeOutlinedIcon />,
      text: 'Home',
      onClick: () => navigate('/home'),
    },
    {
      id: 'table',
      icon: <GridOnIcon />,
      text: 'Table',
      onClick: () => navigate('/table'),
    },
    {
      id: 'Jsonform',
      icon: <CodeIcon />,
      text: 'Jsonform',
      onClick: () => navigate('/jsonform'),
    },
    {
      id: 'theme',
      icon: <ColorLensOutlinedIcon />,
      text: 'Theme',
      onClick: () => navigate('/theme'),
    },
    {
      id: 'login',
      icon: <PersonOutlineOutlinedIcon />,
      text: 'Login',
      onClick: () => navigate('/login'),
    },
    {
      id: 'signUp',
      icon: <PersonOutlineOutlinedIcon />,
      text: 'SignUp',
      onClick: () => navigate('/sign-up'),
    },
  ]
  return (
    <ContainerWithDrawer
      drawer={<Drawer items={drawerMenuItems} currentId={currentId} />}
    >
      {children}
    </ContainerWithDrawer>
  )
}

export default ScreenWithContainer
