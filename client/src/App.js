import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import React from 'react';
import './App.css';
import Launches from './components/Launches';
import Launch from './components/Launch';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql"
});

const App = () => {
  return (
    <ApolloProvider client={client} >
      <Router>
        <div className="container">
          <h1 className="text-center">SpaceX</h1>
          <Route exact path="/" component={Launches} />
          <Route exact path="/launch/:flight_number" component={Launch} />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
