import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import FileInput  from  './components/FileInput';



ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(<FileInput />,document.getElementById('image')
);


registerServiceWorker();



