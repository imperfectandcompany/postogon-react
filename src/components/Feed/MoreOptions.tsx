import { IonActionSheet } from '@ionic/react';
import { useState } from 'react';

interface MoreOptionsProps{
    isOwner:boolean;
}

function MoreOptions(isOwner:MoreOptionsProps) {
    const [showActionSheet, setShowActionSheet] = useState(false);

    function returnOptions(){
      setShowActionSheet(true);
    if(isOwner){
        console.log("to be implemented");
    }
    }
  


    return (
          <><button
          className="overflow-hidden focus:outline-none"
          onClick={() => returnOptions()}
        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 leading-none text-gray-500 cursor-pointer fill-current hover:text-gray-700 focus:text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
</svg>
            </button>
            <IonActionSheet
            translucent={true}
isOpen={showActionSheet}
onDidDismiss={() => setShowActionSheet(false)}
buttons={[
{
    text: 'Edit',
    handler: () => {
      console.log('Share clicked');
    }
  },
  {
    text: 'Archive',
    handler: () => {
      console.log('Share clicked');
    }
  },
  {
    text: 'Swap',
    handler: () => {
      console.log('Share clicked');
    }
  },
 {
    text: 'Delete',
    role: 'destructive',
    handler: () => {
      console.log('Delete clicked');
    }
 }, {
  text: 'Cancel',
  role: 'cancel',
  handler: () => {
    console.log('Cancel clicked');
  }
}]}
>
</IonActionSheet>
            </>
    );
  };

export default MoreOptions;