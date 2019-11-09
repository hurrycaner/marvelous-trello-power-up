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

const onBtnClick = function (t, opts) {
    console.log('Someone clicked the button');
    console.log('t: ', t);
    console.log('opts: ', opts);
};


var goToCardShortId = function (t, opts) {
    console.log('Someone clicked the button goToCardShortId');

    // https://api.trello.com/1/boards/enOm8RT9/cards/?fields=idShort&key=0d7257e46f480534e1d50427e2afb1ee&token=69c07de3b5390280a10e498f6d5de55fcb778404edf8daaa926d17ac24410475
};

const WHITE_ICON = 'https://cdn.hyperdev.com/us-east-1%3A3d31b21c-01a0-4da2-8827-4bc6e88b7618%2Ficon-white.svg';
const BLACK_ICON = 'https://cdn.hyperdev.com/us-east-1%3A3d31b21c-01a0-4da2-8827-4bc6e88b7618%2Ficon-black.svg';
const GRAY_ICON = 'https://cdn.hyperdev.com/us-east-1%3A3d31b21c-01a0-4da2-8827-4bc6e88b7618%2Ficon-gray.svg';


function showAuthorizationIframe(t) {
    return t.popup({
        title: 'Autorize para usar este recurso',
        url: './authorize.html'
    });
}

function showSearchCardButton(t) {
//     return t.popup({
//         title: 'Pull Requests',
//         items: function (t, options) {
    console.log('t: ', t);
    console.log('getRestApi: ', t.getRestApi());
    console.log('board: ', t.getRestApi().board());
//             // use options.search which is the search text entered so far
//             // return a Promise that resolves to an array of items
//             // similar to the items you provided in the client side version above
//         //     return new Promise(function (resolve) {
//         //         // you'd probably be making a network request at this point
//         //         resolve([{
//         //             text: 'Result 1',
//         //             callback: function (t, opts) { ... }
//         //         }, {
//         //             text: 'Result 2',
//         //             callback: function (t, opts) { ... }
//         //         }]);
//         //     });
//         },
//         // search: {
//         //     // optional # of ms to debounce search to
//         //     // defaults to 300, override must be larger than 300
//         //     debounce: 300,
//         //     placeholder: 'Buscar Card #',
//         //     empty: 'Card não encontrado!',
//         //     searching: 'Buscando...'
//         // }
//     });
}

TrelloPowerUp.initialize({
    'board-buttons': function (t, opts) {
        return t.getRestApi()
            .isAuthorized()
            .then(function (isAuthorized) {
                if (isAuthorized) {
                    return [{
                        text: 'Abrir Card #',
                        callback: showSearchCardButton
                    }];
                } else {
                    return [{
                        text: 'Abrir Card #',
                        callback: showAuthorizationIframe
                    }];
                }
            });
    },
    'card-badges': function (t, options) {
        return getIdBadge(t);
    },
    'card-back-section': function (t, options) {
        const cardBackSection = {
            title: 'My Card Back Section',
            icon: GRAY_ICON, // Must be a gray icon, colored icons not allowed.
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
                return cardBackSection;
            } else if (result[0] === false) {
                return null;
            } else if (result[1] > 0) {
                return cardBackSection;
            } else {
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
                icon: GRAY_ICON,
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
}, {
    appKey: "0d7257e46f480534e1d50427e2afb1ee",
    appName: "Hurrycaner's Marvelous Power-Up",
});
