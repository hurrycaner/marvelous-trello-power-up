/* global TrelloPowerUp */

// we can access Bluebird Promises as follows
window.Promise = TrelloPowerUp.Promise;

// helper function to fetch data and generate card badges
// var getBadge = function(t, detail) {
//     return t.getAll()
//         .then(function(storedData){
//             if (!storedData || !storedData.card || !storedData.card.shared) {
//                 return [];
//             }
//
//             var data = storedData.card.shared;
//             if (!data.unixTime || new Date(data.unixTime * 1000) < Date.now()) {
//                 return [];
//             }
//
//             return t.card('id', 'closed')
//                 .then(function(card){
//                     if (data.idCard !== card.id || !card.closed) {
//                         $.post('/snooze/' + card.id + '/verify', function(){
//                             t.set('card', 'shared', { idCard: null, time: null, unixTime: null });
//                         });
//                         return [];
//                     }
//                     var badge = {
//                         icon: 'https://cdn.hyperdev.com/07656aca-9ccd-4ad1-823c-dbd039f7fccc%2Fzzz-grey.svg'
//                     };
//                     if (detail) {
//                         badge.title = 'Card Snoozed Until';
//                         badge.text = data.time;
//                     }
//                     return [badge];
//                 })
//                 .catch(function(){
//                     return [];
//                 });
//         })
//         .catch(function(){
//             return [];
//         });
// };

// We need to call initialize to get all of our capability handles set up and registered with Trello
TrelloPowerUp.initialize({
    'card-badges': function(t){
        console.log('card-badges', t.getAll());
    },
    'card-buttons': function(t, opts) {
        // console.log('card-buttons', t, opts);
        console.log('card-buttons', t.getAll(), t.getContext(), t.getCapabilities(), t.getConfiguration());
    },
    'card-detail-badges': function(t, opts){
        console.log('card-detail-badges', t, opts);
        // var editable = opts.context.permissions.board === 'write';
        // var clickCallback = function(context){
        //     return context.popup({
        //         title: 'Change Snooze Time',
        //         url: './set-snooze.html',
        //         height: 411 // initial height of popup window
        //     });
        // };
        // return getBadge(t, true)
        //     .then(function(badges){
        //         if (badges && badges.length === 1 && editable) {
        //             // add callback if editable
        //             badges[0].callback = clickCallback;
        //         }
        //         return badges;
        //     })
        //     .catch(function(){
        //         return [];
        //     });
    }
});