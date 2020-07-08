const { createStore } = window.Redux;

const initialState = JSON.parse(localStorage.getItem('hobby_list')) || [];

const hobbyReducer = ( state = initialState, action ) => {
    switch(action.type) {
        case 'Add-hobby': {
            const newState = [...state];
            newState.push(action.payload);

            return newState;
        }
        default:
            return state;
    }
}

const store = createStore(hobbyReducer);

// render redux hobbyList

const renderHobbyList = (hobbyList) => {
    if(!Array.isArray(hobbyList) || hobbyList.length === 0) {
        return;
    }

    const ulElement = document.querySelector('#hobbyListId');

    if(!ulElement) {
        return;
    }

    ulElement.innerHTML = '';

    for (const hobby of hobbyList) {
        const liElement = document.createElement('li');
        liElement.textContent = hobby;
    
        ulElement.appendChild(liElement);
    }
}

const initialHobbyList = store.getState();
console.log(initialHobbyList);
renderHobbyList(initialHobbyList);

// handle form submit
const hobbyFormElement = document.querySelector('#hobbyFormId');

if(hobbyFormElement){
    const handleFormSubmit = (e) => {
        e.preventDefault();

        const inputTextElement = document.querySelector('#hobbyTextId');

        if(!inputTextElement) {
            return;
        }

        const action = {
            type: 'Add-hobby',
            payload: inputTextElement.value
        };

        store.dispatch(action);

        hobbyFormElement.reset();
    };

    hobbyFormElement.addEventListener('submit', handleFormSubmit);
}

store.subscribe(() => {
    console.log('state update: ', store.getState());
    const newHobbyList = store.getState();
    renderHobbyList(newHobbyList);

    localStorage.setItem('hobby_list', JSON.stringify(newHobbyList));
})