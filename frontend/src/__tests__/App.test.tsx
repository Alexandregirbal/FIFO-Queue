import { render, screen } from '@testing-library/react';
import { baseUrl } from '../api/configs';
import App from '../App';

describe('App component', () => {
  test('App renders without any data fetched', () => {
    render(<App />);
    const actionsLabelElement = screen.getByText("Cliquez sur un bouton pour ajouter une action à la queue. Le numéro affiché correspond au nombre de crédits restants");
    expect(actionsLabelElement).toBeInTheDocument();

    const noQueueElement = screen.getByText("Aucune action dans la queue");  
    expect(noQueueElement).toBeInTheDocument();
  });

  test('App renders with data fetched', async () => {
    const mockActions = [
      {type: "T1", credits: 10},
      {type: "T2", credits: 20},
      {type: "T3", credits: 30},
    ]
    const mockQueue = ["T1", "T2", "T3", "T3", "T3", "T2"]

    const mockFetchPromise = (input: string, options: any) => {      
      return new Promise((resolve, reject) => {
        resolve({
          json: () => {
            return new Promise((resolve, reject) => {
              if (input === `${baseUrl}/actions`){
                resolve(mockActions);
              } else if (input === `${baseUrl}/queue`) {
                resolve(mockQueue);
              } else {
                reject("Unknown input");
              }
            });
          }
        });
      });
    };
    // @ts-ignore because we are mocking fetch
    jest.spyOn(global, "fetch").mockImplementation(mockFetchPromise);
    render(<App />)
    const t1Button = await screen.findByRole("button", {name: mockActions[0].type});
    expect(t1Button).toBeInTheDocument();
    const t2Button = await screen.findByRole("button", {name: mockActions[1].type});
    expect(t2Button).toBeInTheDocument();
    const t3Button = await screen.findByRole("button", {name: mockActions[2].type});
    expect(t3Button).toBeInTheDocument();

    const creditsLeftT1 = await screen.findByText(mockActions[0].credits);
    expect(creditsLeftT1).toBeInTheDocument();
    const creditsLeftT2 = await screen.findByText(mockActions[1].credits);
    expect(creditsLeftT2).toBeInTheDocument();
    const creditsLeftT3 = await screen.findByText(mockActions[2].credits);
    expect(creditsLeftT3).toBeInTheDocument();

  });
});