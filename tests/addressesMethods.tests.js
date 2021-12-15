import { Meteor } from 'meteor/meteor';
import { assert } from 'chai';
import {calculateGreatCircleDistance, findLocationsAround} from "../imports/api/addressesMethods";

if (Meteor.isServer) {
    describe("methods", () => {
        const lat1 = 37.784676;
        const lng1 = -122.404979;

        const lat2 = 33.941856;
        const lng2= -118.408541;

        const maxDistance =1000;
        const location = 'St';

        describe("addressesMethods", function () {
            it("finds locations around", async function () {
                const result = findLocationsAround({
                    location: location,
                    maxDistance: maxDistance,
                    latitude: lat1,
                    longitude: lng1
                })
                assert.equal(result.length, 1);
            })
            it("finds distance between two coordinates", async function () {
                const result = calculateGreatCircleDistance(lat1, lng1, lat2, lng2)
                assert.equal(parseInt(result, 10), 558);
            })
        });
    });
}
