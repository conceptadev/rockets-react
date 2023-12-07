/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Image from '../src/components/Image/Image';

describe('Image component', () => {
  const defaultSrc = 'fakeImage.jpg';
  const defaultAlt = 'Image alt text';
  const defaultDefaultImage = 'fakeDefaultImage.jpg';

  it('should render correctly', () => {
    render(<Image src={defaultSrc} />);
  });

  it('renders with the correct src attribute', () => {
    const { getByAltText } = render(
      <Image src={defaultSrc} alt={defaultAlt} />,
    );
    const image = getByAltText(defaultAlt) as HTMLImageElement;
    expect(image.src).toContain(defaultSrc);
  });

  it('renders with the correct alt attribute', () => {
    const { getByAltText } = render(
      <Image src={defaultSrc} alt={defaultAlt} />,
    );
    const image = getByAltText(defaultAlt) as HTMLImageElement;
    expect(image.alt).toBe(defaultAlt);
  });

  it('calls the onLoad handler when the image is loaded', () => {
    const onLoadMock = jest.fn();
    const { getByAltText } = render(
      <Image src={defaultSrc} onLoad={onLoadMock} alt={defaultAlt} />,
    );
    const image = getByAltText(defaultAlt) as HTMLImageElement;
    fireEvent.load(image);
    expect(onLoadMock).toHaveBeenCalledTimes(1);
  });

  it('calls onError handler and displays default image if image fails to load', () => {
    const onErrorMock = jest.fn();
    const { getByAltText } = render(
      <Image
        src="invalid-image.jpg"
        alt={defaultAlt}
        defaultImage={defaultDefaultImage}
        onError={onErrorMock}
      />,
    );
    const image = getByAltText(defaultAlt) as HTMLImageElement;
    fireEvent.error(image);
    expect(onErrorMock).toHaveBeenCalledTimes(1);
    expect(image.src).toContain(defaultDefaultImage);
  });

  it('applies correct styles for imgFluid', () => {
    const { getByAltText } = render(
      <Image src={defaultSrc} alt={defaultAlt} imgFluid />,
    );
    const image = getByAltText(defaultAlt) as HTMLImageElement;
    const styles = getComputedStyle(image);

    expect(styles.width).toBe('100%');
    expect(styles.height).toBe('auto');
  });

  it('applies sx styles correctly', () => {
    const { getByAltText } = render(
      <Image
        src={defaultSrc}
        alt={defaultAlt}
        sx={{
          width: '200px',
          height: '100px',
          filter: 'blur(2px)',
        }}
      />,
    );
    const image = getByAltText(defaultAlt) as HTMLImageElement;
    const styles = getComputedStyle(image);

    expect(styles.width).toBe('200px');
    expect(styles.height).toBe('100px');
    expect(styles.filter).toBe('blur(2px)');
  });
});
