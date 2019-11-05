/* global TrelloPowerUp */

// var Promise = TrelloPowerUp.Promise;

TrelloPowerUp.initialize({
    'card-badges': function(t, options){
        return [{
            text: t.card('idShort').get('idShort')
        }];
    },
    'card-detail-badges': function(t, options) {
        return [{
            title: 'Card Number', // for detail badges only
            text: t.card('idShort').get('idShort')
        }];
    }
});
