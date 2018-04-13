import React, { Component } from 'react';
import API from '../utils/API';

class CreateStore extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            locationId: '',
            logoUrl: ''
        }

        this.handleOnSubmit = this.handleOnSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const state = {

        };
        state[event.target.name] = event.target.value;
        this.setState(state);
    }

    handleOnSubmit(event) {
        event.preventDefault();
        const locationDetails = this.autocomplete.getPlace();
        if (locationDetails && locationDetails.id) {
            const storeData = {
                name: this.state.name,
                locationId: locationDetails.id,
                logoUrl: this.state.logoUrl,
                user: this.props.user._id,
            };

            API.saveStore(storeData).then(() => {
                window.location = '/';
            });
        }
    }

    geolocate() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                var geolocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

                // eslint-disable-next-line
                var circle = new google.maps.Circle({
                    center: geolocation,
                    radius: position.coords.accuracy
                });

                // eslint-disable-next-line
                this.autocomplete.setBounds(circle.getBounds());
            });
        }
    }

    componentDidMount() {
        // eslint-disable-next-line
        const defaultBounds = new google.maps.LatLngBounds(
            // eslint-disable-next-line
            new google.maps.LatLng(-33.8902, 151.1759),
            // eslint-disable-next-line
            new google.maps.LatLng(-33.8474, 151.2631));

        const input = document.getElementById('locationId');
        const options = {
            bounds: defaultBounds,
            types: ['establishment']
        };

        // eslint-disable-next-line
        this.autocomplete = new google.maps.places.Autocomplete(input, options);
        this.geolocate();
    }

    render() {
        const { user } = this.props;
        return (
            <div className="full-height lime darken-1">
                <div className="ui vertical masthead aligned segment">
                    <div className="ui container full-height pos-rel">
                        <div className="ui grid">
                            <div className="four wide computer five wide tablet sixteen wide mobile column">
                                <div className="ui card profile-card">
                                    <div className="image">
                                        <img alt={user.name} src={user.photoURL} />
                                    </div>
                                    <div className="content">
                                        <a className="header">{user.name}</a>
                                        <div className="description">
                                            You are about to create a store
                                        </div>
                                    </div>
                                    <div className="extra content">
                                        We use Google Places API to locate Stores
                                    </div>
                                </div>
                            </div>
                            <div className="twelve wide computer eleven wide tablet sixteen wide mobile column">
                                <form className="ui form" onSubmit={this.handleOnSubmit} >
                                    <div className="field">
                                        <label>Name of the Store</label>
                                        <input onChange={this.handleChange} type="text" value={this.state.name} name="name" placeholder="Name of the store" />
                                    </div>
                                    <div className="field">
                                        <label>Location</label>
                                        <input type="text" id="locationId" name="locationId" placeholder="Location" />
                                    </div>
                                    <div className="field">
                                        <label>Logo</label>
                                        <input onChange={this.handleChange} type="text" value={this.state.logoUrl} name="logoUrl" placeholder="Logo URL" />
                                    </div>
                                    <button className="ui button" type="submit">Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateStore;
