import { FC } from 'react'
import { Box } from '@concepta/react-material-ui'
import { ArrayFieldTemplateProps } from '@rjsf/core'
import ArrayFieldActionButton from './ArrayFieldActionButton'

const ArrayFieldTemplate: FC<ArrayFieldTemplateProps> = props => {
  const { items, canAdd, onAddClick } = props

  return (
    <Box>
      {items.map((el, i) => {
        const child = {
          ...el.children,
          props: { ...el.children.props, required: props.required },
        }

        return (
          <Box key={el.key} display="flex" mt={2}>
            {child}

            {i === 0 && canAdd && (
              <ArrayFieldActionButton type="add" onClick={onAddClick} />
            )}

            {i > 0 && el.hasRemove && (
              <ArrayFieldActionButton
                type="remove"
                onClick={() => {
                  el.onDropIndexClick(i)()
                }}
              />
            )}
          </Box>
        )
      })}
    </Box>
  )
}

export default ArrayFieldTemplate
