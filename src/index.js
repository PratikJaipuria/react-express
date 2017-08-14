import React from 'react';
import ReactDOM from 'react-dom';
// import { browserHistory} from 'react-router';
// import {BrowserRouter as Router, Route , Link } from 'react-router-dom';
// import './index.css';

// import {App} from './App';
import Home from './Home';
// import ChooseMode from './ChooseMode';
// import {Link} from "react-router";
// import registerServiceWorker from './registerServiceWorker';
//
// const root = document.getElementById('root');
// ReactDOM.render(
//                 <Router>
//                     <Route path="/" component={Home}>
//                         <Route path="/play" component={App}/>
//                     </Route>
//                 </Router>,
//                 root);
// ReactDOM.render(
//     (<Router history = {browserHistory}>
//         <Route path = "/" component = {App}>
//             <IndexRoute component = {Home} />
//             <Route path = "play" component = {App}/>
//         </Route>
//     </Router>),
//     document.getElementById('root'));
// registerServiceWorker();

//
ReactDOM.render(
    <Home

        pollInterval={2000} />,
    document.getElementById('root')
);

// ReactDOM.render(
//     <ChooseMode/>,document.getElementById("root")
// );