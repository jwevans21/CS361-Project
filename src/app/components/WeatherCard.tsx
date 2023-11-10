import { faCloud } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Card, Pane, Heading, Text } from 'evergreen-ui';

import type {Location, UnitSystem} from "../types.d.ts"

function HourlyWeather() {
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
            HH:MM
         </Heading>
         <Pane margin={20}>
            <FontAwesomeIcon icon={faCloud} />
         </Pane>
         <Pane>
            <Text fontWeight='bold'>56F</Text>
         </Pane>
      </Card>
   );
}

export default function WeatherCard({
   location,
   units
}:{
   location: Location,
   units: UnitSystem
}) {
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
                  <Text>56F</Text>
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
               <HourlyWeather />
               <HourlyWeather />
               <HourlyWeather />
            </Pane>
         </Pane>
      </Card>
   );
}
