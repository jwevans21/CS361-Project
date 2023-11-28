import { useState, useEffect, Dispatch, SetStateAction } from 'react';

import { faCloud } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import type { Location, UnitSystem } from '../types.d.ts';
import LoadingCard from './LoadingCard';

function HourlyWeather({ forecast }: { forecast: any }) {
   return (
      <div className='card m-4 bg-base-100 shadow-m'>
         <div className='card-body items-center'>
            <h4 className='card-title whitespace-nowrap text-center'>
               {new Date(forecast.startTime).toLocaleTimeString(undefined, {
                  hour: 'numeric',
                  minute: '2-digit',
               })}
            </h4>
            <p className='whitespace-nowrap text-center'>
               {new Date(forecast.startTime).toLocaleString(undefined, {
                  month: 'short',
                  day: '2-digit',
                  year: 'numeric',
               })}
            </p>
            <div className='flex flex-col justify-center items-center text-center mt-4'>
               <div>
                  <FontAwesomeIcon icon={faCloud} />
                  <p>{forecast.shortForecast}</p>
               </div>
               <p className='text-xs'>
                  {forecast.probabilityOfPrecipitation.value}
                  {'%'}
               </p>
               <p className='font-bold'>
                  {forecast.temperature} {forecast.temperatureUnit}
               </p>
            </div>
         </div>
      </div>
   );
}

const fetch_params = {
   headers: {
      'User-Agent': '(cs361.jwevans.dev, jacob@jwevans.dev)',
   },
};

export default function WeatherCard({
   location,
   units,
   setLocations,
   idx,
}: {
   location: Location;
   units: UnitSystem;
   setLocations: Dispatch<SetStateAction<Location[]>> | null;
   idx: number;
}) {
   const [data, setData] = useState<'loading' | any>('loading');
   const [isLoading, setLoading] = useState(true);
   const [error, setError] = useState(false);

   useEffect(() => {
      fetch(
         `https://api.weather.gov/points/${location.lat},${location.long}`,
         fetch_params
      )
         .then((res) => {
            return res.json();
         })
         .then((js) => {
            return fetch(
               `https://api.weather.gov/gridpoints/${js.properties.cwa}/${
                  js.properties.gridX
               },${js.properties.gridY}/forecast/hourly?units=${
                  units === 'metric' ? 'si' : 'us'
               }`,
               fetch_params
            );
         })
         .then((res) => res.json())
         .then((js) => {
            if (typeof js.status !== 'undefined') {
               throw new Error('Invalid Response');
            }
            return js;
         })
         .then((forecast) => {
            setData(forecast.properties);
            setLoading(false);
         })
         .catch((err) => {
            setError(true);
            setLoading(false);
         });
   }, [units]);

   if (isLoading) return <LoadingCard />;
   if (error)
      return (
         <div className='card overflow-hidden m-4 bg-base-200 shadow-xl'>
            <div className='card-body'>
               <div className='w-full flex flex-row space-between items-center space-x-4'>
                  <div>
                     <h2 className='card-title'>{location.name}</h2>
                  </div>
                  <p>Error Loading Data</p>
               </div>
            </div>
         </div>
      );

   return (
      <div className='card overflow-hidden m-4 bg-base-200 shadow-xl'>
         <div className='card-body'>
            <div className='w-full flex flex-row space-between items-center space-x-4'>
               <div>
                  <h2 className='card-title'>{location.name}</h2>
                  <p className='font-bold'>
                     {isLoading ? null : data.periods[0].temperature}{' '}
                     {isLoading ? null : data.periods[0].temperatureUnit}
                  </p>
               </div>
               <div className='grow flex flex-row justify-between'>
                  <div>{isLoading ? null : data.periods[0].shortForecast}</div>
                  <div>
                     {isLoading
                        ? null
                        : data.periods[0].probabilityOfPrecipitation.value}
                     {'%'}
                  </div>
                  <div>
                     {isLoading ? null : data.periods[0].windSpeed}{' '}
                     {isLoading ? null : data.periods[0].windDirection}
                  </div>
                  <div>
                     {isLoading ? null : data.periods[0].relativeHumidity.value}
                     {'%'}
                  </div>
                  {setLocations != null ? (
                     <button
                        className='btn btn-error'
                        onClick={() => {
                           console.info('removing index: ', idx);
                           setLocations((prev) => {
                              let temp = new Array();
                              prev.forEach((loc, i) => {
                                 if (idx != i) {
                                    temp.push(loc);
                                 }
                              });
                              return temp;
                           });
                        }}
                     >
                        Remove
                     </button>
                  ) : null}
               </div>
            </div>

            <div className='flex overflow-x-auto'>
               {isLoading
                  ? null
                  : data.periods.map((period: object, idx: any) => {
                       return <HourlyWeather forecast={period} key={idx} />;
                    })}
            </div>
         </div>
      </div>
   );
}
