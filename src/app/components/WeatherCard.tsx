import { useState, useEffect } from 'react';

import { faCloud } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Card, Pane, Heading, Text } from 'evergreen-ui';

import type { Location, UnitSystem } from '../types.d.ts';

function HourlyWeather({ forecast }: { forecast: any }) {
   return (
      <Card
         elevation={1}
         margin={10}
         padding={10}
         display='flex'
         flexDirection='column'
         alignItems='center'
         justifyContent='space-between'
      >
         <Heading is='h4' size={400}>
            {(new Date(forecast.startTime)).toLocaleTimeString()}
         </Heading>
         <Pane margin={20}>
            <FontAwesomeIcon icon={faCloud} />
         </Pane>
         <Pane>
            <Text fontWeight='bold'>{forecast.temperature} {forecast.temperatureUnit}</Text>
         </Pane>
      </Card>
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
}: {
   location: Location;
   units: UnitSystem;
}) {
   const [data, setData] = useState<'loading' | any>('loading');
   const [isLoading, setLoading] = useState(true);

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
         .then((forecast) => {
            console.log(forecast);
            setData(forecast.properties);
            setLoading(false);
         });
   }, [units]);

   if (isLoading) return <Text>Loading</Text>;
   return (
      <Card
         elevation={1}
         padding={16}
         margin={24}
         width='100%'
         display='flex'
         flexDirection='column'
         justifyContent='space-around'
      >
         <Heading is='h2' size={800}>
            {location.name}
         </Heading>
         <Pane display='flex'>
            <Pane width='50%' display='flex' alignItems='center'>
               <Pane margin={5}>
                  <Text>
                     {isLoading ? null : data.periods[0].temperature}{' '}
                     {units === 'metric' ? 'C' : 'F'}
                  </Text>
               </Pane>
               <Pane margin={5}>
                  <FontAwesomeIcon icon={faCloud} />
               </Pane>
            </Pane>
         </Pane>
         <Pane
            padding={10}
            width='100%'
            display='flex'
            flexDirection='column'
            alignItems='start'
            justifyContent='center'
         >
            <Heading is='h3'>Hourly Forecast</Heading>
            <Pane display='flex'>
               {isLoading
                  ? null
                  : data.periods.map((period: object, idx: any) => {
                       return <HourlyWeather forecast={period} key={idx} />;
                    })}
            </Pane>
         </Pane>
      </Card>
   );
}
