import styled, { css } from 'styled-components';
import { Colors } from '../../../providers/ThemeProvider';

import { TypographyProps, Size } from './Typography';
const getFontWeight = (weight: TypographyProps['weight']) => {
  switch (weight) {
    case 'bold':
      return 700;
    default:
      return 500;
  }
};

const getFontSize = (size: Size) => {
  const lineHeightMap: { [key in Size]: number } = {
    '12': 18,
    '16': 24,
    '20': 30,
    '34': 48,
  };

  return css`
    font-size: ${size}px;
    line-height: ${lineHeightMap[size]}px;
  `;
};

export const Typography = styled.div`
  ${({ weight, color, size }: TypographyProps & { color: Colors; size: Size }) =>
    css`
      font-weight: ${getFontWeight(weight)};
      color: ${(props) => props.theme.colors[color]};
      ${getFontSize(size)}
    `}
`;
