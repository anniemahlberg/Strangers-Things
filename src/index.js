import React from 'react';
import ReactDOM from 'react-dom';
import Header from './header';


const App = () => {
    return (
        <div>
            <Header />
        </div>
    )
}

const appElement = document.getElementById('app');

ReactDOM.render(<App />, appElement);