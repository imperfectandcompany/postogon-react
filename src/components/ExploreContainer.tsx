import { IonButton } from '@ionic/react';
import './ExploreContainer.css';

interface ContainerProps { }

const ExploreContainer: React.FC<ContainerProps> = () => {
  return (
    <div className="container">
      <strong>The Freedom to Be Yourself Online</strong>
      <br></br>
      <IonButton color="primary">Get Started</IonButton>
    </div>
  );
};

export default ExploreContainer;
