import React from 'react';

export const Address = ({ address }) => {
    return (
        <li className="list-group-item list-group-item-action">
        {address.street_number}, {address.route}, {address.locality} {address.administrativeArea}, {address.country}
        </li>
    )
};