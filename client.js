/* global TrelloPowerUp */

var Promise = TrelloPowerUp.Promise;

var getIdBadge = function(t){
    return t
        .card('idShort')
        .get('idShort')
        .then(function(result){
            return [{
                title: 'Card Number', // for detail badges only
                text: result[1]
            }];
        })
};

TrelloPowerUp.initialize({
    'card-badges': function(t, options){
        return getIdBadge(t);
    },
    'card-detail-badges': function(t, options) {
        return getIdBadge(t);
    }
});
