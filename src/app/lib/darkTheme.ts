import { DefaultTheme, defaultTheme, mergeTheme } from 'evergreen-ui';

const colors = {
   fg_default: '#e6edf3',
   fg_muted: '#7d8590',
   fg_subtle: '#6e7681',
   fg_onEmphasis: '#ffffff',
   bg_default: '#0d1117',
   bg_overlay: '#161b22',
   bg_inset: '#010409',
   bg_subtle: '#161b22',
};

const shadows: any = [
   '0 0 transparent',
   '0 3px 6px #010409',
   '0 8px 24px #010409',
   '0 12px 48px #010409',
];

shadows.focusRing = 'rgb(255 255 255 / 25%) 0 0 0 4px';

const darkTheme: DefaultTheme = mergeTheme(defaultTheme, {
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

export default darkTheme;
