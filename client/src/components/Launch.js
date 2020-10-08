import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

const LAUNCH_QUERY = gql(`
    query LaunchQuery($flight_number: Int!) {
        launch(flight_number: $flight_number) {
            flight_number
            mission_name
            launch_year
            launch_success
            launch_date_local
            rocket {
                rocket_id
                rocket_name
                rocket_type
            }
        }
    }
`)

class Launch extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        let { flight_number } = this.props.match.params;
        flight_number = parseInt(flight_number);
        return (
            <>
                <Query query={LAUNCH_QUERY} variables={{flight_number}}>
                    {
                        ({loading, error, data}) =>  {
                            if (loading) return <h4>Loading... </h4>
                            if (error) return console.log(error)
                            console.log(data);

                            const { mission_name, flight_number, launch_year, launch_success, rocket: { rocket_id, rocket_name, rocket_type } } = data.launch;

                            return (
                            <div>
                                <h1 className="display-4 my-3">
                                <span className="text-dark">Mission:</span> {mission_name}
                                </h1>
                                <h4 className="list-group-item">Flight Number: {flight_number}</h4>
                                <h4 className="list-group-item">Launch Year: {launch_year}</h4>
                                <h4 className="list-group-item">Launch successful: {launch_success ? <span className="text-success">Yes</span> : <span className="text-danger">No</span>}</h4>

                                <h4 className="my-3">Rocket Details</h4>
                                <ul className="list-group">
                                    <li className="list-group-item">Rocket ID: {rocket_id}</li>
                                    <li className="list-group-item">Rocket Name: {rocket_name}</li>
                                    <li className="list-group-item">Rocket Type: {rocket_type}</li>
                                </ul>
                                <Link to="/" className="btn btn-outline-primary mt-3">Go Back</Link>
                            </div>)
                        }
                    }
                </Query>
            </>
        )
    }
}

export default Launch
