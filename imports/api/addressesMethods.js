const addresses = require('/lib/addresses.json')
import { check } from 'meteor/check';

var calculateGreatCircleDistance = (latitude1, longitude1, latitude2, longitude2) => {
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


Meteor.methods({
    'address.findByLocation'(args) {
        check(args.maxDistance, Number);
        let result = addresses;
        if (args.location) {
            result = addresses.filter(address => address.route.includes(args.location));
        }
        return result.filter(address => {
            const distance = calculateGreatCircleDistance(address.latitude, address.longitude, args.latitude, args.longitude);
            check(distance, Number)
            address.distance = distance;
            console.log(address)
            if (distance <= args.maxDistance) {
                return address;
            }
        });
    }
});
