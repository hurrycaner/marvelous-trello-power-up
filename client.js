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
    'card-badges': function (t, options) {
        return getIdBadge(t);
    },
    'card-back-section': function (t, options) {
        const cardBackSection = {
            title: 'My Card Back Section',
            // icon: GRAY_ICON, // Must be a gray icon, colored icons not allowed.
            content: {
                type: 'iframe',
                url: t.signUrl('./card-back.html'),
                height: 230 // Max height is 500
            }
        };
        return Promise.all([
            t.get('card', 'private', 'epic', null),
            t.get('card', 'shared', 'feat', [])
        ]).then(function (result) {
            if (result[0] === true) {
                // mostra
                return cardBackSection;
            } else if (result[0] === false) {
                // oculta
                return null;
            } else if (result[1] > 0) {
                // mostra
                return cardBackSection;
            } else {
                // oculta
                return null;
            }
        });
    },
    'card-buttons': function (t, options) {
        const epicBtnShow = {
            // icon: GRAY_ICON,
            text: 'Epic (show)',
            condition: 'always',
            callback: function (t, opts) {
                return t.set('card', 'private', 'epic', true)
            }
        };
        const epicBtnHide = {
            // icon: GRAY_ICON,
            text: 'Epic (hide)',
            condition: 'always',
            callback: function (t, opts) {
                return t.set('card', 'private', 'epic', false)
            }
        };
        return Promise.all([
            t.get('card', 'private', 'epic', null),
            t.get('card', 'shared', 'feat', [])
        ]).then(function (result) {
            let ret = [{
                // icon: GRAY_ICON,
                text: 'Link to feature',
                callback: onBtnClick,
                condition: 'edit'
            }];
            if (result[0] === true) {
                ret.push(epicBtnHide);
            } else if (result[0] === false) {
                ret.push(epicBtnShow);
            } else if (result[1] > 0) {
                ret.push(epicBtnHide);
            } else {
                ret.push(epicBtnShow);
            }
            return ret
        })
    },
    'card-detail-badges': function (t, options) {
            return getIdBadge(t);
        }
    });
