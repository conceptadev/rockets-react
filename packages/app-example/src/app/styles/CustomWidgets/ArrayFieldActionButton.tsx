import { FC } from 'react'
import { Box, IconButton } from '@concepta/react-material-ui'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'

type Props = {
  type: 'add' | 'remove'
  onClick: () => void
}

const ArrayFieldActionButton: FC<Props> = props => {
  const { type, onClick } = props

  return (
    <Box sx={{ marginTop: 3, marginLeft: 1 }}>
      <IconButton onClick={onClick}>
        {type === 'add' ? (
          <AddCircleOutlineIcon color="primary" />
        ) : (
          <DeleteOutlineIcon />
        )}
      </IconButton>
    </Box>
  )
}

export default ArrayFieldActionButton
