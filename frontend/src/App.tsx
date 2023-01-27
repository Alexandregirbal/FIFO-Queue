import { useEffect, useState } from 'react';
import { addActionToQueue, getActions } from './api/actions';
import { getQueue } from './api/queue';
import './App.css';
import ActionButton from './components/ActionButton';
import Queue from './components/Queue';

interface UserAction {
  type: string;
  credits: number;
}

function App() {
  const [actions, setActions] = useState<UserAction[]>([]);
  const [queue, setQueue] = useState<string[]>([]);

  const updateActionsAndQueue = async () => {
    getActions().then(actions => {
      setActions(actions);
    })
    getQueue().then(queue => {
      setQueue(queue);
    })
  }

  useEffect(() => {
    // Get actions and queue from the backend
    updateActionsAndQueue()

    // Update every minute
    const intervalObject = setInterval(() => {
      updateActionsAndQueue()
    }, 6*1000)

    return () => {
      // Clear interval on unmount to avoid memory leaks
      clearInterval(intervalObject);
    }
  }, [])

  const handleActionButtonClick = (actionType: string): void => {
    addActionToQueue(actionType).then(queue => {
      setQueue(queue);
   })
  }

  return (
    <div className="App">
      <div className="actions-container">
        <div className='actions-label'>
          Cliquez sur un bouton pour ajouter une action à la queue.
          Le numéro affiché correspond au nombre de crédits restants
        </div>
        <div className='actions'>
          {actions.map(
            action => 
            <ActionButton 
              key={action.type}
              action={action.type}
              creditsLeft={action.credits}
              onClick={handleActionButtonClick}
            />
            )}
        </div>
      </div>
      <Queue queue={queue} />
    </div>
  );
}

export default App;
