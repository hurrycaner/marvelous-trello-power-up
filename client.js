/* global TrelloPowerUp */

// https://developers.trello.com/reference#card-badges

var Promise = TrelloPowerUp.Promise;

var getIdBadge = function (t) {
    return t
        .card('idShort')
        .get('idShort')
        .then(function (result) {
            return [{
                title: 'Card Number',
                text: '#' + result
            }];
        })
};

// var getCardButtons = function (t) {
//     return t
//             .get('card', 'shared', 'epic', [])
//             .then(function (result) {
//                 if (result.length === 0) {
//                     //
//                 }
//
//                 let done = 0;
//                 let total = 0;
//
//                 for (let i = 0; i < result.length; i++) {
//                     if (result[i] && result[i].name) {
//                         if (done) done++;
//                         total++;
//                     }
//                     if (total > 0) {
//                         return [{
//                             // its best to use static badges unless you need your badges
//                             // to refresh you can mix and match between static and dynamic
//                             title: 'Bla',
//                             text: done + '/' + total,
//                             color: null
//                         }]
//                     }
//
//                     // var feat = {
//                     //     name: "",
//                     //     done: false,
//                     //     cardNum: "",
//                     //     cardId: ""
//                     // }
//                 }
//                 ret.push({
//                     // usually you will provide a callback function to be run on button click
//                     // we recommend that you use a popup on click generally
//                     icon: GRAY_ICON, // don't use a colored icon here
//                     text: 'Add feature',
//                     callback: onBtnClick,
//                     condition: 'edit'
//                 });
//             } else {
//                 // is not epic
//                 ret.push({
//                     // usually you will provide a callback function to be run on button click
//                     // we recommend that you use a popup on click generally
//                     icon: GRAY_ICON, // don't use a colored icon here
//                     text: 'Open Popup',
//                     callback: onBtnClick,
//                     condition: 'edit'
//                 });
//             }
//             if (result[1]) {
//                 // is feature
//                 ret.push({
//                     // usually you will provide a callback function to be run on button click
//                     // we recommend that you use a popup on click generally
//                     icon: GRAY_ICON, // don't use a colored icon here
//                     text: 'Open Popup',
//                     callback: onBtnClick,
//                     condition: 'edit'
//                 });
//             } else {
//                 // is not feature
//                 ret.push({
//                     // usually you will provide a callback function to be run on button click
//                     // we recommend that you use a popup on click generally
//                     icon: GRAY_ICON, // don't use a colored icon here
//                     text: 'Open Popup',
//                     callback: onBtnClick,
//                     condition: 'edit'
//                 });
//             }
//             return ret;
//         });
// };

var onBtnClick = function (t, opts) {
    console.log('Someone clicked the button');
    console.log('t: ', t);
    console.log('opts: ', opts);
};

TrelloPowerUp.initialize({
    'card-buttons': function (t, options) {
        return t
            .get('card', 'shared', 'epic', [])
            .then(function (result) {
                var ret = [{
                    // icon: GRAY_ICON,
                    text: 'Link to feature',
                    callback: onBtnClick,
                    condition: 'edit'
                }];
                if (result.length === 0) {
                    ret.unshift({
                        // icon: GRAY_ICON,
                        text: 'Show Epic',
                        callback: onBtnClick,
                        condition: 'always'
                    })
                } else {
                    ret.unshift({
                        // icon: GRAY_ICON,
                        text: 'Hide Epic',
                        callback: onBtnClick,
                        condition: 'always'
                    })
                }

                return ret
            })
    },
    'card-badges': function (t, options) {
        return getIdBadge(t);
    },
    'card-detail-badges': function (t, options) {
        return getIdBadge(t);
    }
});
