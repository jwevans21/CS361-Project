export default function LoadingCard() {
   return (
      <div className='card overflow-hidden m-4 bg-base-200 shadow-xl'>
         <div className='card-body flex flex-col'>
            <div className='w-full flex flex-row space-between items-center space-x-4'>
               <div>
                  <div className='skeleton h-8 w-60'></div>
                  <div className='skeleton h-6 w-10'></div>
               </div>
               <div className='grow flex flex-row space-x-4'>
                  <div className='skeleton h-20 w-32'></div>
                  <div className='skeleton h-20 w-32'></div>
                  <div className='skeleton h-20 w-32'></div>
                  <div className='skeleton h-20 w-32'></div>
               </div>
            </div>

            <div className='flex gap-4 overflow-x-auto'>
               <div className='skeleton h-48 w-40'></div>
               <div className='skeleton h-48 w-40'></div>
               <div className='skeleton h-48 w-40'></div>
               <div className='skeleton h-48 w-40'></div>
               <div className='skeleton h-48 w-40'></div>
            </div>
         </div>
      </div>
   );
   /*
    return (
       <div className='card overflow-hidden m-4 bg-base-200 shadow-xl'>
          <div className='card-body flex-col'>
             <div className='flex flex-row gap-4'>
                <div className='flex flex-col gap-4'>
                   <div className='skeleton h-8 w-60'></div>
                   <div className='skeleton h-6 w-10'></div>
                </div>
                <div className='grow flex flex-row gap-4'>
                   <div className='skeleton h-20 w-40'></div>
                   <div className='skeleton h-20 w-40'></div>
                   <div className='skeleton h-20 w-40'></div>
                   <div className='skeleton h-20 w-40'></div>
                </div>
             </div>

             <div className='flex gap-4'>
                {new Array(20).map((idx) => (
                   <div className='skeleton h-40 w-40' key={idx}></div>
                ))}
             </div>
          </div>
       </div>
    );
                    */
}
