import { faCloud } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
   Card,
   CogIcon,
   Heading,
   IconButton,
   Pane,
   Heading as H,
   Text,
   SearchIcon,
} from 'evergreen-ui';

function App() {
   return (
      <>
         <Pane
            background='tint2'
            padding={16}
            display='flex'
            alignItems='center'
            justifyContent='space-between'
         >
            <Heading>404 Weather</Heading>
            <Pane>
               <IconButton margin={5} icon={SearchIcon} />
               <IconButton margin={5} icon={CogIcon} />
            </Pane>
         </Pane>
         <Pane
            padding={16}
            display='flex'
            alignItems='center'
            flexDirection='column'
         >
            <Card
               elevation={1}
               padding={16}
               margin={24}
               width='100%'
               display='flex'
               flexDirection='column'
               justifyContent='space-around'
            >
               <H is='h2' size={800}>
                  Corvallis, OR
               </H>
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
                  <H is='h3'>Hourly Forecast</H>
                  <Pane display='flex'>
                     <Card
                        elevation={1}
                        margin={10}
                        padding={10}
                        display='flex'
                        flexDirection='column'
                        alignItems='center'
                        justifyContent='space-between'
                     >
                        <H is='h4' size={400}>
                           HH:MM
                        </H>
                        <Pane margin={20}>
                           <FontAwesomeIcon icon={faCloud} />
                        </Pane>
                        <Pane>
                           <Text fontWeight='bold'>56F</Text>
                        </Pane>
                     </Card>

                     <Card
                        elevation={1}
                        margin={10}
                        padding={10}
                        display='flex'
                        flexDirection='column'
                        alignItems='center'
                        justifyContent='space-between'
                     >
                        <H is='h4' size={400}>
                           HH:MM
                        </H>
                        <Pane margin={20}>
                           <FontAwesomeIcon icon={faCloud} />
                        </Pane>
                        <Pane>
                           <Text fontWeight='bold'>56F</Text>
                        </Pane>
                     </Card>

                     <Card
                        elevation={1}
                        margin={10}
                        padding={10}
                        display='flex'
                        flexDirection='column'
                        alignItems='center'
                        justifyContent='space-between'
                     >
                        <H is='h4' size={400}>
                           HH:MM
                        </H>
                        <Pane margin={20}>
                           <FontAwesomeIcon icon={faCloud} />
                        </Pane>
                        <Pane>
                           <Text fontWeight='bold'>56F</Text>
                        </Pane>
                     </Card>
                  </Pane>
               </Pane>
            </Card>
            <Card
               elevation={1}
               padding={16}
               margin={24}
               width='100%'
               display='flex'
               flexDirection='column'
               justifyContent='space-around'
            >
               <H is='h2' size={800}>
                  Portland, OR
               </H>
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
                  <H is='h3'>Hourly Forecast</H>
                  <Pane display='flex'>
                     <Card
                        elevation={1}
                        margin={10}
                        padding={10}
                        display='flex'
                        flexDirection='column'
                        alignItems='center'
                        justifyContent='space-between'
                     >
                        <H is='h4' size={400}>
                           HH:MM
                        </H>
                        <Pane margin={20}>
                           <FontAwesomeIcon icon={faCloud} />
                        </Pane>
                        <Pane>
                           <Text fontWeight='bold'>56F</Text>
                        </Pane>
                     </Card>

                     <Card
                        elevation={1}
                        margin={10}
                        padding={10}
                        display='flex'
                        flexDirection='column'
                        alignItems='center'
                        justifyContent='space-between'
                     >
                        <H is='h4' size={400}>
                           HH:MM
                        </H>
                        <Pane margin={20}>
                           <FontAwesomeIcon icon={faCloud} />
                        </Pane>
                        <Pane>
                           <Text fontWeight='bold'>56F</Text>
                        </Pane>
                     </Card>

                     <Card
                        elevation={1}
                        margin={10}
                        padding={10}
                        display='flex'
                        flexDirection='column'
                        alignItems='center'
                        justifyContent='space-between'
                     >
                        <H is='h4' size={400}>
                           HH:MM
                        </H>
                        <Pane margin={20}>
                           <FontAwesomeIcon icon={faCloud} />
                        </Pane>
                        <Pane>
                           <Text fontWeight='bold'>56F</Text>
                        </Pane>
                     </Card>
                  </Pane>
               </Pane>
            </Card>
         </Pane>
      </>
   );
}

export default App;
