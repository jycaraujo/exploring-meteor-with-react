const addresses = require('/lib/addresses.json')
import { check } from 'meteor/check';

export const calculateGreatCircleDistance = (latitude1, longitude1, latitude2, longitude2) => {
    check(latitude1, Number)
    check(longitude1, Number)
    check(latitude2, Number)
    check(longitude2, Number)
    const radLatitude1 = (Math.PI * latitude1) / 180;
    const radLatitude2 = (Math.PI * latitude2) / 180;
    const theta = longitude1 - longitude2;
    const radtheta = (Math.PI * theta) / 180;
    let distance = Math.sin(radLatitude1) * Math.sin(radLatitude2) + Math.cos(radLatitude1) * Math.cos(radLatitude2) * Math.cos(radtheta);
    distance = Math.acos(distance);
    distance = (distance * 180) / Math.PI;
    distance = distance * 60 * 1.8531596160000001; // Distance in Km
    return distance;
}

export const findLocationsAround = (args) => {
    args.maxDistance = parseFloat(args.maxDistance);
    args.latitude = parseFloat(args.latitude);
    args.longitude = parseFloat(args.longitude);
    let result = addresses;
    if (args.location) {
        result = addresses.filter(address => address.route.includes(args.location));
    }
    return result.filter(address => {
        const distance = calculateGreatCircleDistance(address.latitude, address.longitude, args.latitude, args.longitude);
        check(distance, Number)
        address.distance = distance;
        if (distance <= args.maxDistance) {
            return address;
        }
    });
}

Meteor.methods({
    findLocations(args) {
        return findLocationsAround(args)
    }
});
