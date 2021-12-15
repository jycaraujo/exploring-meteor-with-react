import React, {useState} from 'react';

export const AddressForm = ({onUpdateList}) => {
    const [maxDistance, setMaxDistance] = useState("");
    const [location, setLocation] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");

    const formInputs = [{
        id: 1,
        label: "Max Distance",
        type: 'number',
        required: true,
        placeholder: 'Type the max distance in KM',
        value: maxDistance,
        method: (e) => setMaxDistance(e.target.value)
    }, {
        id: 2,
        label: "Location",
        type: 'text',
        placeholder: 'Type the location',
        value: location,
        method: (e) => setLocation(e.target.value)
    }, {
        id: 4,
        label: "Latitude",
        type: 'number',
        required: true,
        placeholder: '-90  to 90',
        value: latitude,
        method: (e) => setLatitude(e.target.value)
    }, {
        id: 3,
        label: "Longitude",
        type: 'number',
        required: true,
        placeholder: '-180 to 180',
        value: longitude,
        method: (e) => setLongitude(e.target.value)
    }]

    const handleSubmit = e => {
        e.preventDefault();

        if (!maxDistance) return;

        Meteor.call('findLocations', {
            location: location,
            maxDistance: maxDistance,
            latitude: latitude,
            longitude: longitude
        }, (error, result) => {
            onUpdateList(result);
        });

    };

    return (
                <form className="address-form " onSubmit={handleSubmit}>
                    <div className="row">
                    {
                        formInputs.map(item =>
                            <div className="col">
                                <div className="mb-3">
                                    <label key={item.id} className="form-label">{item.label}</label>
                                    <input key={item.id}
                                           type={item.type}
                                           placeholder={item.placeholder}
                                           value={item.value}
                                           onChange={item.method}
                                           required={item.required}
                                           className="form-control"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                    <button className="btn btn-primary" type="submit">Find a place</button>
                </form>

    );
};