// Extend styled-components default theme interface
// https://www.styled-components.com/docs/api#typescript
import 'styled-components';
import { Theme } from 'styles/theme';

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends Theme {}
}
