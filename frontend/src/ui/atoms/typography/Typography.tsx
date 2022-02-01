import { Colors } from 'providers/ThemeProvider';
import * as S from './Typography.styles';

export type Size = 12 | 16 | 20 | 34;
export type Weight = 'regular' | 'bold';
export type TypographyProps = {
  children: React.ReactNode;
  weight?: Weight;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'div' | 'p';
  color?: Colors;
  size?: Size;
};

export const Typography = ({
  children,
  tag = 'p',
  weight = 'regular',
  size = 16,
  color = 'black',
  ...props
}: TypographyProps) => {
  return (
    <S.Typography as={tag} size={size} weight={weight} color={color} {...props}>
      {children}
    </S.Typography>
  );
};
