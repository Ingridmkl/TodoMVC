import { todoReducer } from './reducer';
import { 
    ADD_ITEM
} from './constants';

describe('Todo Reducer Logic', () => {

    // 1. Test Create Multiple Todo Items
    test('should add multiple items', () => {

        let state = [];

        // 2. Add "Buy Milk"
        state = todoReducer(state, { 
            type: ADD_ITEM, 
            payload: { id: 1, title: 'Buy Milk' } 
        });

        // 3. Add "Go to the doctor" (We pass the 'state' variable which now contains 'Buy Milk')
        state = todoReducer(state, { 
            type: ADD_ITEM, 
            payload: { id: 2, title: 'Go to the doctor' } 
        });

        // 4. Add "Go to the gym"
        state = todoReducer(state, { 
            type: ADD_ITEM, 
            payload: { id: 3, title: 'Go to the gym' } 
        });

        // 5. Add "Call the plumber"
        state = todoReducer(state, { 
            type: ADD_ITEM, 
            payload: { id: 4, title: 'Call the plumber' } 
        });

        // Check we have 4 items
        expect(state).toHaveLength(4);

        // Verify the titles are correct
        expect(state[0].title).toBe('Buy Milk');
        expect(state[1].title).toBe('Go to the doctor');
        expect(state[2].title).toBe('Go to the gym');
        expect(state[3].title).toBe('Call the plumber');

        // Verify they all default to not completed
        expect(state[3].completed).toBe(false);
    });
});