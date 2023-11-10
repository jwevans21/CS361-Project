import { DefaultTheme, defaultTheme, mergeTheme } from 'evergreen-ui';

const colors = {
   fg_default: '#1F2328',
   fg_muted: '#656d76',
   fg_subtle: '#6e7781',
   fg_onEmphasis: '#ffffff',
   bg_default: '#ffffff',
   bg_overlay: '#ffffff',
   bg_inset: '#f6f8fa',
   bg_subtle: '#f6f8fa',
};
const shadows: any = [
   '0 1px 0 rgba(31,35,40,0.04)',
   '0 3px 6px rgba(140,149,159,0.15)',
   '0 8px 24px rgba(140,149,159,0.2)',
   '0 12px 28px rgba(140,149,159,0.3)',
];
shadows.focusRing = 'rgb(0 0 0 / 15%) 0 0 0 4px';

const lightTheme: DefaultTheme = mergeTheme(defaultTheme, {
   colors,
   shadows,
   components: {
      Box: {
         baseStyle: {
            color: colors.fg_default,
            backgroundColor: colors.bg_default,
         },
      },
      Select: {
         baseStyle: {
            color: colors.fg_default,
            backgroundColor: colors.bg_default,
         },
      },
      Input: {
         baseStyle: {
            color: colors.fg_default,
            backgroundColor: colors.bg_default,
         },
      },
      Label: {
         baseStyle: {
            color: colors.fg_default,
            backgroundColor: colors.bg_default,
         },
      },
      Option: {
         baseStyle: {
            color: colors.fg_default,
            backgroundColor: colors.bg_default,
         },
      },
      Pane: {
         baseStyle: {
            color: colors.fg_default,
            backgroundColor: colors.bg_default,
         },
      },
      Heading: {
         baseStyle: {
            color: colors.fg_default,
         },
      },
      Text: {
         baseStyle: {
            color: colors.fg_onEmphasis,
         },
      },
      SideSheet: {
         baseStyle: {
            backgroundColor: colors.bg_overlay,
            color: colors.fg_default,
         },
      },
   },
});

export default lightTheme;
