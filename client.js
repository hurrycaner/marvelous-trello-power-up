/* global TrelloPowerUp */

// var Promise = TrelloPowerUp.Promise;

TrelloPowerUp.initialize({
    'card-badges': function(t, options){
        return t.card('idShort').get('idShort');
    },
    'card-detail-badges': function(t, options) {
        return t.card('idShort').get('idShort');
    }
});
