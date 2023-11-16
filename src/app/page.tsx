'use client';

import { useState } from 'react';

import { useGeolocation, useLocalStorage } from '@uidotdev/usehooks';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faSearch } from '@fortawesome/free-solid-svg-icons';

import WeatherCard from './components/WeatherCard';

import type { ThemeName, UnitSystem, Location } from './types.d.ts';

export default function Home() {
   ('use client');
   const [showSettings, setShowSettings] = useState(false);
   const locationState = useGeolocation();

   if (typeof window === 'undefined') {
      return <></>;
   }

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
            return 'light' as ThemeName;
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

   return (
      <div className='drawer drawer-end w-full h-full' data-theme={themeName}>
         <input
            id='my-drawer-4'
            type='checkbox'
            className='drawer-toggle'
            checked={showSettings}
            onClick={() => setShowSettings(false)}
         />
         <div className='drawer-content overflow-auto'>
            <div>
               {/* Navigation Bar */}
               <div className='navbar bg-base-100'>
                  <div className='flex-1'>
                     <a className='btn btn-ghost text-xl'>404 Weather</a>
                  </div>
                  <div className='flex-none space-x-2'>
                     <button className='btn btn-neutral'>
                        <FontAwesomeIcon icon={faSearch} />
                     </button>
                     <button
                        className='btn btn-neutral'
                        onClick={() => setShowSettings(true)}
                     >
                        <FontAwesomeIcon icon={faGear} />
                     </button>
                  </div>
               </div>
               <div className='flex flex-col w-full h-full'>
                  {/* Main Body */}
                  {!locationState.loading && !locationState.error && (
                     <WeatherCard
                        location={{
                           lat: locationState.latitude as number,
                           long: locationState.longitude as number,
                           name: 'Current Location',
                        }}
                        units={unitSystem}
                     />
                  )}
                  {locations.map((location, idx) => {
                     return (
                        <WeatherCard
                           key={idx}
                           location={location}
                           units={unitSystem}
                        />
                     );
                  })}
               </div>
            </div>
         </div>
         <div className='drawer-side'>
            <label
               htmlFor='my-drawer-4'
               aria-label='close sidebar'
               className='drawer-overlay'
            ></label>
            <ul className='menu p-4 w-80 min-h-full bg-base-200 text-base-content'>
               <li className='w-full'>
                  <div className='form-control w-full max-w-xs'>
                     <label className='label'>
                        <span className='label-text'>Units</span>
                     </label>
                     <select
                        className='select select-bordered'
                        onChange={(e) =>
                           setUnitSystem(e.target.value as UnitSystem)
                        }
                     >
                        <option
                           value='imperial'
                           selected={unitSystem === 'imperial'}
                        >
                           Imperial
                        </option>
                        <option
                           value='metric'
                           selected={unitSystem === 'metric'}
                        >
                           Metric
                        </option>
                     </select>
                  </div>
               </li>
               <li className='w-full'>
                  <div className='form-control w-full max-w-xs'>
                     <label className='label'>
                        <span className='label-text'>Theme</span>
                     </label>
                     <select
                        className='select select-bordered'
                        onChange={(e) =>
                           setThemeName(e.target.value as ThemeName)
                        }
                     >
                        <option value='light' selected={themeName === 'light'}>
                           Light
                        </option>
                        <option value='dark' selected={themeName === 'dark'}>
                           Dark
                        </option>
                     </select>
                  </div>
               </li>
            </ul>
         </div>
      </div>
   );
}
