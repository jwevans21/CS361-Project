'use client';

import { useState } from 'react';

import { useGeolocation, useLocalStorage } from '@uidotdev/usehooks';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
   faCircleExclamation,
   faGear,
   faSearch,
} from '@fortawesome/free-solid-svg-icons';

import WeatherCard from './components/WeatherCard';

import type { ThemeName, UnitSystem, Location } from './types.d.ts';
import LoadingCard from './components/LoadingCard';
import SearchDialog from './components/SearchDialog';

function CurrentLocationBlock({ unitSystem }: { unitSystem: UnitSystem }) {
   const locationState = useGeolocation();

   if (!locationState.error && locationState.loading) {
      return <LoadingCard />;
   } else if (!locationState.loading && !locationState.error) {
      return (
         <WeatherCard
            location={{
               lat: locationState.latitude as number,
               long: locationState.longitude as number,
               name: 'Current Location',
            }}
            units={unitSystem}
            setLocations={null}
            idx={0}
         />
      );
   } else if (locationState.error) {
      return (
         <div className='card overflow-hidden m-4 bg-base-200 shadow-xl'>
            <div className='card-body flex flex-row gap-8 items-center'>
               <div className='card-actions'>
                  <FontAwesomeIcon
                     className='text-error'
                     icon={faCircleExclamation}
                     size='3x'
                  />
               </div>
               <div>
                  <h2 className='card-title text-error space-x-4'>
                     Error Getting Location
                  </h2>
                  <p>{locationState.error.message}</p>
               </div>
            </div>
         </div>
      );
   }
}

export default function Home() {
   ('use client');
   const [showSettings, setShowSettings] = useState(false);
   const [showSearch, setShowSearch] = useState(false);

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
      []
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
            onChange={() => setShowSettings(false)}
         />
         <div className='drawer-content overflow-auto'>
            <div>
               {/* Navigation Bar */}
               <div className='navbar bg-base-100'>
                  <div className='flex-1'>
                     <a className='btn btn-ghost text-xl'>404 Weather</a>
                  </div>
                  <div className='flex-none space-x-2'>
                     <button
                        className='btn btn-neutral'
                        onClick={() => setShowSearch(true)}
                     >
                        <FontAwesomeIcon icon={faSearch} />
                     </button>
                     <button
                        className='btn btn-neutral'
                        onClick={() => setShowSettings(true)}
                     >
                        <FontAwesomeIcon icon={faGear} />
                     </button>
                     <SearchDialog
                        units={unitSystem}
                        show={showSearch}
                        setShow={setShowSearch}
                        setLocations={setLocations}
                     />
                  </div>
               </div>
               <div className='flex flex-col w-full h-full'>
                  {/* Main Body */}
                  <CurrentLocationBlock unitSystem={unitSystem} />
                  {locations.map((location, idx) => {
                     return (
                        <WeatherCard
                           key={idx}
                           idx={idx}
                           location={location}
                           units={unitSystem}
                           setLocations={setLocations}
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
                        value={unitSystem}
                     >
                        <option value='imperial'>Imperial</option>
                        <option value='metric'>Metric</option>
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
                        value={themeName}
                     >
                        <option value='light'>Light</option>
                        <option value='dark'>Dark</option>
                     </select>
                  </div>
               </li>
            </ul>
         </div>
      </div>
   );
}
