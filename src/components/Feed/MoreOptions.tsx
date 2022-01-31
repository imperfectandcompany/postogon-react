import { IonActionSheet, IonButton, IonIcon } from '@ionic/react';
import { ellipsisHorizontal, ellipsisVertical } from 'ionicons/icons';
import { MouseEvent, useState } from 'react';

interface MoreOptionsProps{
    isOwner:boolean;
}

function MoreOptions(props:MoreOptionsProps) {
    const [showOwnerActionSheet, setShowOwnerActionSheet] = useState(false);
    const [showUserActionSheet, setShowUserActionSheet] = useState(false);


    function returnOptions(e: MouseEvent<HTMLIonButtonElement, globalThis.MouseEvent>){
      e.stopPropagation();
      if(props.isOwner){
        setShowOwnerActionSheet(true);
      } else {
        setShowUserActionSheet(true);
      }
    }
  


    return (
          <><IonButton color="clear" fill="clear" slot="end"
          className="overflow-hidden focus:outline-none"
          onClick={(e) => returnOptions(e)}
        >
        <IonIcon icon={ellipsisHorizontal} size="small" className="text-gray-900/75" ></IonIcon>
            </IonButton>
            <IonActionSheet
            translucent={true}
isOpen={showOwnerActionSheet}
onDidDismiss={() => setShowOwnerActionSheet(false)}
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
      console.log('Swap clicked');
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

<IonActionSheet
isOpen={showUserActionSheet}
onDidDismiss={() => setShowUserActionSheet(false)}
buttons={[
  {
    text: 'Share',
    handler: () => {
      console.log('Share clicked');
    }
  },
  {
    text: 'Report',
    role: 'destructive',
    handler: () => {
      console.log('Report clicked');
    }
  },
  {
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