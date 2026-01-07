import { todoReducer } from "./reducer";
import { 
    ADD_ITEM, 
    REMOVE_ITEM, 
    UPDATE_ITEM, 
    TOGGLE_ITEM, 
    REMOVE_COMPLETED_ITEMS, 
    TOGGLE_ALL
} from "./constants";

describe("Todo Reducer Logic", () => {
	
    // 1. Test Create Multiple Todo Items
	test("should add multiple items", () => {
		let state = [];

		// 1. Add "Buy Milk"
		state = todoReducer(state, {
			type: ADD_ITEM,
			payload: { id: 1, title: "Buy Milk" },
		});

		// 2. Add "Go to the doctor" (We pass the 'state' variable which now contains 'Buy Milk')
		state = todoReducer(state, {
			type: ADD_ITEM,
			payload: { id: 2, title: "Go to the doctor" },
		});

		// 3. Add "Go to the gym"
		state = todoReducer(state, {
			type: ADD_ITEM,
			payload: { id: 3, title: "Go to the gym" },
		});

		// 4. Add "Call the plumber"
		state = todoReducer(state, {
			type: ADD_ITEM,
			payload: { id: 4, title: "Call the plumber" },
		});

		// 5. Check we have 4 items
		expect(state).toHaveLength(4);

		// 6. Verify the titles are correct
		expect(state[0].title).toBe("Buy Milk");
		expect(state[1].title).toBe("Go to the doctor");
		expect(state[2].title).toBe("Go to the gym");
		expect(state[3].title).toBe("Call the plumber");

		// 7. Verify they all default to not completed
		expect(state[3].completed).toBe(false);
	});

	// 2. Test Delete a Todo
	test("should remove an item", () => {
		const initialState = [{ id: 1, title: "Buy Milk", completed: false }];
		const action = { type: REMOVE_ITEM, payload: { id: 1 } };
		const newState = todoReducer(initialState, action);
		expect(newState).toHaveLength(0);
	});

	// 3. Test Update/Edit a Todo
	test("should update an item title", () => {
		const initialState = [{ id: 1, title: "Buy Milk", completed: false }];
		const action = {
			type: UPDATE_ITEM,
			payload: { id: 1, title: "Buy Cookies" },
		};
		const newState = todoReducer(initialState, action);
		expect(newState[0].title).toBe("Buy Cookies");
	});

	// 4 & 5. Test Complete/Uncomplete a Todo
    test('should toggle item completion status', () => {
        const initialState = [{ id: 1, title: 'Buy Milk', completed: false }];
        const action = { type: TOGGLE_ITEM, payload: { id: 1 } };
        
        // Toggle to true
        let newState = todoReducer(initialState, action);
        expect(newState[0].completed).toBe(true);

        // Toggle back to false
        newState = todoReducer(newState, action);
        expect(newState[0].completed).toBe(false);
    });

	// 6. Test Clear Completed
    test('should remove all completed items', () => {
        const initialState = [
            { id: 1, title: 'Active', completed: false },
            { id: 2, title: 'Completed', completed: true }
        ];
        const action = { type: REMOVE_COMPLETED_ITEMS };
        const newState = todoReducer(initialState, action);
        expect(newState).toHaveLength(1);
        expect(newState[0].id).toBe(1);
    });

    // 7. Test Complete All
    test('should toggle all items', () => {
        const initialState = [
            { id: 1, title: 'One', completed: false },
            { id: 2, title: 'Two', completed: true }
        ];
        const action = { type: TOGGLE_ALL, payload: { completed: true } };
        const newState = todoReducer(initialState, action);
        // Should make all true (since not all were true)
        expect(newState.every(i => i.completed)).toBe(true);
    });
    
    // 8. Test Update items left number
    test('should correctly calculate active items for "items left" count', () => {
        let state = [];

        expect(state.filter(t => !t.completed).length).toBe(0);

        // Add 2 items
        state = todoReducer(state, { type: ADD_ITEM, payload: { title: 'Item 1' } });
        state = todoReducer(state, { type: ADD_ITEM, payload: { title: 'Item 2' } });
        
        expect(state.filter(t => !t.completed).length).toBe(2);

        const item1_id = state[0].id; 

        state = todoReducer(state, { type: TOGGLE_ITEM, payload: { id: item1_id } });
        expect(state.filter(t => !t.completed).length).toBe(1);
    });
});
