'use client';

import { useState } from 'react';

import { useLocalStorage } from '@uidotdev/usehooks';

import {
   CogIcon,
   DefaultTheme,
   Heading,
   IconButton,
   Pane,
   SearchIcon,
   SelectField,
   SideSheet,
   ThemeProvider,
   defaultTheme,
} from 'evergreen-ui';

import lightTheme from './lib/lightTheme';
import darkTheme from './lib/darkTheme';

import WeatherCard from './components/WeatherCard';

import type { ThemeName, UnitSystem, Location } from './types.d.ts';

function themeFromName(name: ThemeName): DefaultTheme {
   switch (name) {
      case 'default':
         return lightTheme;
      case 'dark':
         return darkTheme;
      default:
         return defaultTheme;
   }
}

export default function Home() {
   const [showSettings, setShowSettings] = useState(false);

   // Begin Saved State
   const [unitSystem, setUnitSystem] = useLocalStorage<UnitSystem>(
      'unitSystem',
      'imperial'
   );
   const [themeName, setThemeName] = useLocalStorage<ThemeName>(
      'colorTheme',
      (() => {
         if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark' as ThemeName;
         } else {
            return 'default' as ThemeName;
         }
      })()
   );
   const [locations, setLocations] = useLocalStorage<Location[]>(
      'savedLocations',
      [
         {
            name: 'Corvallis, OR',
            lat: 44.56726942429713,
            long: -123.2786009736147,
         },
      ]
   );
   // End Saved Data

   const theme = themeFromName(themeName);

   return (
      <ThemeProvider value={theme}>
         <Pane width='100%' height='100%' background='bg_default'>
            <Pane
               background='bg_inset'
               padding={16}
               display='flex'
               alignItems='center'
               justifyContent='space-between'
            >
               <Heading is='h1' size={900}>
                  404 Weather
               </Heading>
               <Pane>
                  <IconButton margin={5} icon={SearchIcon} />
                  <IconButton
                     onClick={() => setShowSettings(true)}
                     margin={5}
                     icon={CogIcon}
                  />
               </Pane>
            </Pane>
            <Pane
               padding={16}
               display='flex'
               alignItems='center'
               flexDirection='column'
               background='tint1'
            >
               {locations.map((location, idx) => {
                  return (
                     <WeatherCard
                        key={idx}
                        location={location}
                        units={unitSystem}
                     />
                  );
               })}
            </Pane>
            <SideSheet
               isShown={showSettings}
               onCloseComplete={() => setShowSettings(false)}
               preventBodyScrolling
               containerProps={{
                  backgroundColor: '',
                  background: 'bg_default',
               }}
            >
               <Pane
                  display='flex'
                  flexDirection='column'
                  alignItems='center'
                  justifyContent='center'
                  padding={20}
                  margin={40}
               >
                  <SelectField
                     label='Select units for weather'
                     value={unitSystem}
                     onChange={(e) =>
                        setUnitSystem(e.target.value as UnitSystem)
                     }
                     padding={8}
                     appearance=''
                  >
                     <option
                        value='imperial'
                        selected={unitSystem === 'imperial'}
                     >
                        Imperial
                     </option>
                     <option value='metric' selected={unitSystem === 'metric'}>
                        Metric
                     </option>
                  </SelectField>

                  <SelectField
                     label='Select theme for display'
                     value={themeName}
                     onChange={(e) => setThemeName(e.target.value as ThemeName)}
                     padding={8}
                     appearance=''
                  >
                     <option value='default' selected={themeName === 'default'}>
                        Default
                     </option>
                     <option value='dark' selected={themeName === 'dark'}>
                        Dark
                     </option>
                  </SelectField>
               </Pane>
            </SideSheet>
         </Pane>
      </ThemeProvider>
   );
}
