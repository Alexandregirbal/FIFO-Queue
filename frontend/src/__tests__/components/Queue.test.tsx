import { render, screen } from '@testing-library/react';
import Queue from '../../components/Queue';

describe('Queue component', () => {
    test('Queue component renders as expected with empty queue.', () => {
        render(<Queue
            queue={[]}
        />);

        const labelElement = screen.getByText("Queue:");  
        expect(labelElement).toBeInTheDocument();

        const noQueueElement = screen.getByText("Aucune action dans la queue");  
        expect(noQueueElement).toBeInTheDocument();
    });

    test('Queue component renders as expected with non-empty queue.', () => {
        const mockQueue = ["T1", "T2", "T3"]
        render(<Queue
            queue={mockQueue}
        />);
        const labelElement = screen.getByText("Queue:");  
        expect(labelElement).toBeInTheDocument();
        for (const action of mockQueue) {
            const divElement = screen.getByText(action);  
            expect(divElement).toBeInTheDocument();
        }
    });
});
