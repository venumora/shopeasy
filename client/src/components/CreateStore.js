import React, { Component } from 'react';
import API from '../utils/API';
import Modal from '../components/Modal';

class CreateStore extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            locationId: '',
            logoUrl: 'http://www.guessthelogo.com/images/game-image/store-logo-game.gif',
            error: null
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
        const { name, logoUrl } = this.state;
        const locationDetails = this.autocomplete.getPlace();
        if (name && logoUrl && locationDetails && locationDetails.id) {
            const photos = [];
            if (locationDetails.photos) {
                locationDetails.photos.forEach(photo => {
                    photos.push(photo.getUrl({ 'maxWidth': 1000, 'maxHeight': 500 }));
                });
            }
            const storeData = {
                name: name,
                locationId: locationDetails.id,
                logoUrl: logoUrl,
                user: this.props.userId,
                address: locationDetails.formatted_address,
                phone: locationDetails.formatted_phone_number,
                photos: photos,
                locationURL: locationDetails.url
            };

            API.saveStore(storeData).then(() => {
                window.location = '/';
            }).catch((errorDetails) => {
                let message = 'Server Error. Please try again';
                if (errorDetails && errorDetails.response && errorDetails.response.data && errorDetails.response.data.code === 11000) {
                    message = 'Store is already registered with us. Please use another location or login with correct user';
                }
                this.setState({ error: { message: message } })
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
        return (
            <div className="lime darken-1 full-height">
                <div className="ui container full-height pos-rel">
                    <div className="ui grid">
                        <div className="twelve wide computer eleven wide tablet sixteen wide mobile column">
                            <form className="ui form" onSubmit={this.handleOnSubmit} >
                                <div className="field">
                                    <label>Name of the Store</label>
                                    <input required onChange={this.handleChange} type="text" value={this.state.name} name="name" placeholder="Name of the store" />
                                </div>
                                <div className="field">
                                    <label>Location</label>
                                    <input required type="text" id="locationId" name="locationId" placeholder="Location" />
                                </div>
                                <div className="field">
                                    <label>Logo</label>
                                    <input required onChange={this.handleChange} type="url" value={this.state.logoUrl} name="logoUrl" placeholder="Logo URL" />
                                </div>
                                <button className="ui button" type="submit">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
                {
                    this.state.error &&
                    <Modal heading="Error" buttonName="Ok" content={this.state.error.message} show={true} />
                }
            </div>
        );
    }
}

export default CreateStore;
