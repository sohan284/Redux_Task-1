// select the dom elements
const counterContainerEl = document.getElementById('counterContainer');
const addCounterEl = document.getElementById('add-counter');
const resetEl = document.getElementById('reset');


//action identifiers
const ADD_COUNTER = 'addCounter';
const RESET = 'reset';
const INCREMENT = 'increment';
const DECREMENT = 'decrement';


//initial state 
const initialCounter = [
    {
      id: 0,
      value: 0,
    }
];

function boilerPlate(id){
  const initial = `<div
        class="p-4 h-auto flex flex-col items-center justify-center space-y-5 bg-white rounded shadow"
      >
        <div id="counter${id}" class="text-2xl font-semibold"></div>
        <div class="flex space-x-3">
          <button
            id="increment0"
            class="bg-indigo-400 text-white px-3 py-2 rounded shadow"
            onclick="handleIncrease(${id})"
          >
            Increment
          </button>
          <button
            id="decrement0"
            class="bg-red-400 text-white px-3 py-2 rounded shadow"
            onclick="handleDecrease(${id})"
          >
            Decrement
          </button>
        </div>
      </div>`
    return initial;
}



const addCounter = () => {
    return {
      type: ADD_COUNTER,
    }
};

const reset = () => {
    return {
      type: RESET,
    }
};

const increment = (value,id) => {
  return {
    type: INCREMENT,
    payload: value,
    id: id
  }
};

const decrement = (value,id) => {
  return {
    type: DECREMENT,
    payload: value,
    id : id,
  }
};

//reducer function 
function counterReducer(state = initialCounter, action){
    if(action.type === ADD_COUNTER){
        return [
            ...state,
            {
              id: state[state.length-1].id+1,
              value: 0,  
            }
        ]
    }else if(action.type === RESET){
      const newState = state.map(item => {
        return {
          ...item,
          value: 0
        }
      });
      return newState;
    }else if(action.type === INCREMENT){
      const newEle = state.find(item => item.id === action.id);
      const editedEle = {
        ...newEle,
        value: newEle.value + action.payload,
      };
      const index = state.indexOf(newEle);
      state[index] = editedEle
      return state
    }else if(action.type === DECREMENT){
      const newEle = state.find(item => item.id === action.id);
      const editedEle = {
        ...newEle,
        value: newEle.value - action.payload,
      };
      const index = state.indexOf(newEle);
      state[index] = editedEle
      return state
    }else{
      return state
    }
    
}

// store
const counterStore = Redux.createStore(counterReducer);
let isAddClicked = false;
const render = () =>{
  const state = counterStore.getState();
  if (!isAddClicked) {
    creatingElement(state[state.length - 1].id);
  }
  state.map(item=>{
    findCounter(item.id, item.value)
  });
  isAddClicked = false
}
render();
counterStore.subscribe(render);

function creatingElement(id) {
  const div = document.createElement('div')
    div.innerHTML = boilerPlate(id);
    counterContainerEl.appendChild(div);
}


function findCounter(id,value){
  const counterEl = document.getElementById(`counter${id}`);
  counterEl.innerHTML = value;
  return counterEl
}

addCounterEl.addEventListener('click', () => {
    counterStore.dispatch(addCounter());
    isAddClicked = false
});

resetEl.addEventListener('click', () => {
  isAddClicked = true
  counterStore.dispatch(reset());
});

const handleIncrease = (id) => {
  isAddClicked = true
  counterStore.dispatch(increment(5, id))
}

const handleDecrease = (id) => {
  isAddClicked = true
  counterStore.dispatch(decrement(5, id))
}