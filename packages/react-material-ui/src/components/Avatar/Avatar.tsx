import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { Image } from './Styles';
import Text from '../Text';

/**
 * Avatar component props.
 */
export type AvatarProps = {
  /** Path or URL to image file */
  src?: string;
  /** Alternate attribute text */
  alt?: string;
  /** Size in pixels */
  size?: number;
  /** Optional and/or fallback initials to display with the avatar */
  initials?: string;
  /** Custom `onClick` handler */
  onClick?: () => void;
  /** Background color name or code */
  backgroundColor?: string;
};

/**
 * The Avatar component is a UI element used to display a user's
 * profile picture or initials. It supports various features such as image
 * source handling, fallbacks (e.g., initials or default image),
 * and customization options for styling and sizes.
 * 
 * @see [Storybook - Avatar](https://storybook.rockets.tools/?path=/docs/avatar)
 * 
 * @example
 * ```tsx
 * <Avatar 
 *   src="https://example.com/nonexistent.jpg"
 *   alt="Annabel B"
 *   initials="AB"
 *   size={40}
 *   backgroundColor="#789abc"
 * />
 * ```
 * 
 * @param props - Avatar component props
 */
export const Avatar = (props: AvatarProps) => {
  const { src, alt, size = 30, initials, backgroundColor, onClick } = props;
  const [failed, setFailed] = useState(!src);

  const handleImageError = () => {
    setFailed(true);
  };

  const showInitials = failed && initials;

  return (
    <Box
      sx={
        showInitials
          ? {}
          : {
              backgroundColor: backgroundColor || '#eee',
              width: `${size}px`,
              height: `${size}px`,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }
      }
    >
      <Image
        src={src}
        alt={alt}
        size={size}
        onClick={onClick}
        onError={handleImageError}
        style={{
          display: showInitials ? 'none' : 'block',
          cursor: onClick ? 'pointer' : 'default',
        }}
      />
      {showInitials && (
        <Text fontSize={size * 0.44} fontWeight={600}>
          {initials.substring(0, 2)}
        </Text>
      )}
    </Box>
  );
};
