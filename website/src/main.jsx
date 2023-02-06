import React from 'react'
import ReactDOM from 'react-dom/client'
import {App} from './components/app'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)


// import React, {FC, createContext}  from 'react'
// import ReactDOM from 'react-dom/client'
// import {App} from './components/app'
// import Store from "./store/index";
//
// // interface State {
// //     store: Store
// // }
//
//
// export const store = new Store();
//
// export const Context = createContext({
//     store,
// })
//
// ReactDOM.createRoot(document.getElementById('root')).render(
//     <Context.Provider value={{
//         store
//     }}>
//         <App />
//     </Context.Provider>,
// )
