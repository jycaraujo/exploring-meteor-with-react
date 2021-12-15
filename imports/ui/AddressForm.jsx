import React, {useState} from 'react';

export const AddressForm = ({onUpdateList}) => {
    const [maxDistance, setMaxDistance] = useState("");
    const [location, setLocation] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");

    const formInputs = [{
        id: 1,
        type: 'number',
        placeholder: 'Type the max distance in KM',
        value: maxDistance,
        method: (e) => setMaxDistance(e.target.value)
    }, {
        id: 2,
        type: 'text',
        placeholder: 'Type the location',
        value: location,
        method: (e) => setLocation(e.target.value)
    }, {
        id: 4,
        type: 'number',
        placeholder: 'Type the latitude',
        value: latitude,
        method: (e) => setLatitude(e.target.value)
    }, {
       id: 3,
       type: 'number',
       placeholder: 'Type the longitude',
       value: longitude,
       method: (e) => setLongitude(e.target.value)
   }]

    const handleSubmit = e => {
        e.preventDefault();

        if (!maxDistance) return;

        Meteor.call('address.findByLocation', {
            location: location,
            maxDistance: 100,
            latitude: latitude,
            longitude: longitude
        }, (error, result) => {
            onUpdateList(result);
        });

    };

    return (
        <form className="address-form" onSubmit={handleSubmit}>
            {
                formInputs.map(item =>
                    <input key={item.id}
                           type={item.type}
                           placeholder={item.placeholder}
                           value={item.value}
                           onChange={item.method}
                    />
                )}
            <button type="submit">Find a place</button>
        </form>
    );
};