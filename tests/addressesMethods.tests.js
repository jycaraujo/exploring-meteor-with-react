import { Meteor } from 'meteor/meteor';
import { mockMethodCall } from 'meteor/quave:testing';
import { assert } from 'chai';

if (Meteor.isServer) {
    describe("methods", () => {
        const lat1 = 37.784676;
        const lng1 = -122.404979;

        const lat2 = 33.941856;
        const lng2= -118.408541;

        const maxDistance = 1000;
        const location = 'St';

        describe("addressesMethods", function () {
            it("can calculate distance in km", async function () {
//             {lat1, lng1, lat2, lng2})
                const res = mockMethodCall('addresses.findByLocation', {lat1, lng1, maxDistance, location});
                assert.equal(res.length, 2);
            })
        });
    });
}
