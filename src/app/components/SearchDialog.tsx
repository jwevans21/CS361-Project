import {
   Dispatch,
   FormEvent,
   useState,
   useEffect,
   SetStateAction,
} from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
   faPlus,
   faSearch,
   faCircleExclamation,
} from '@fortawesome/free-solid-svg-icons';

import { UnitSystem, Location } from '../types';

const fetch_params = {
   headers: {
      'User-Agent': '(cs361.jwevans.dev, jacob@jwevans.dev)',
   },
};

function SearchResult({
   result,
   units,
   setLocations,
}: {
   result: any;
   units: UnitSystem;
   setLocations: Dispatch<SetStateAction<Location[]>>;
}) {
   const [data, setData] = useState<'loading' | any>('loading');
   const [isLoading, setLoading] = useState(true);
   const [error, setError] = useState(false);

   useEffect(() => {
      fetch(
         `https://api.weather.gov/points/${result.center[1]},${result.center[0]}`,
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
                throw new Error("Invalid Response");
            }
            return js;
         })
         .then((forecast) => {
            setData(forecast.properties);
            setLoading(false);
         })
         .catch((err) => {
            console.log(err);
            setError(true);
            setLoading(false);
         });
   }, [units]);

   if (isLoading)
      return (
         <div className='card bg-neutral'>
            <div className='card-body flex-row gap-2 w-full justify-between'></div>
         </div>
      );
   if (error)
      return (
         <div className='card bg-neutral'>
            <div className='card-body flex-row gap-2 w-full justify-between'>
               <h4 className='card-title text-error'>
                  <FontAwesomeIcon
                     className='text-error'
                     icon={faCircleExclamation}
                     size='xl'
                  />
                  Error Loading Data
               </h4>
            </div>
         </div>
      );

   return (
      <div className='card bg-neutral'>
         <div className='card-body flex-row gap-2 w-full justify-between'>
            <div>
               <h4 className='card-title break-normal'>{result.place_name}</h4>
               <p className='font-bold'>
                  {isLoading && !error ? null : data.periods[0].temperature}{' '}
                  {isLoading && !error ? null : data.periods[0].temperatureUnit}
               </p>
            </div>

            <div className='card-actions justify-end align-end'>
               <button
                  className='btn btn-primary'
                  onClick={() => {
                     setLocations((prev) => {
                        prev.push({
                           name: result.place_name,
                           lat: result.center[1],
                           long: result.center[0],
                        });
                        return prev;
                     });
                  }}
               >
                  <FontAwesomeIcon icon={faPlus} />
                  Add
               </button>
            </div>
         </div>
      </div>
   );
}

export default function SearchDialog({
   show,
   setShow,
   units,
   setLocations,
}: {
   show: boolean;
   setShow: Dispatch<boolean>;
   units: UnitSystem;
   setLocations: Dispatch<SetStateAction<Location[]>>;
}) {
   const [searchLocation, setSearchLocation] = useState('');

   const [results, setResults] = useState<any[]>([]);

   async function searchDialogSubmit(e: FormEvent<HTMLFormElement>) {
      e.preventDefault();

        const res = await fetch(
           `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURI(
              searchLocation
           )}.json?limit=4&types=place%2Ccountry%2Cdistrict%2Clocality%2Cpostcode%2Cregion&access_token=${
            process.env.NEXT_PUBLIC_MAPBOX_API
           }`,
           fetch_params
        );

        const locations = await res.json();

      setResults(locations.features);
   }

   return (
      <dialog
         id='search_modal'
         className={`modal ${show ? 'modal-open' : ''}`}
         open={show}
         onClose={() => {
            setShow(false);
            setResults([]);
            setSearchLocation('');
         }}
      >
         <div className='modal-box max-h-4/6 w-full'>
            <h3 className='font-bold text-lg pb-4'>Search</h3>
            <form onSubmit={searchDialogSubmit}>
               <span className='flex flex-row justify-between items-center gap-1 w-full'>
                  <input
                     type='text'
                     id='search_location'
                     placeholder='Search'
                     className='input input-bordered w-full'
                     onChange={(e) => setSearchLocation(e.currentTarget.value)}
                     content={searchLocation}
                  />
                  <button className='btn btn-neutral'>
                     <FontAwesomeIcon icon={faSearch} />
                     Search
                  </button>
               </span>
            </form>
            <div className='flex flex-col justify-between gap-2 overflow-scroll max-h-1/6 w-full p-2'>
               {/* Search Results */}
               {results.map((res, idx) => (
                  <SearchResult
                     units={units}
                     result={res}
                     setLocations={setLocations}
                     key={idx}
                  />
               ))}
            </div>
            <div className='modal-action'>
               <form method='dialog'>
                  <button className='btn'>Close</button>
               </form>
            </div>
         </div>
         <form method='dialog' className='modal-backdrop'>
            <button>close</button>
         </form>
      </dialog>
   );
}
