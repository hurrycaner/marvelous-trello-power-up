/* global TrelloPowerUp */
/* global Trello */

// https://developers.trello.com/reference#card-badges

var Promise = TrelloPowerUp.Promise;

const WHITE_ICON = 'https://cdn.hyperdev.com/us-east-1%3A3d31b21c-01a0-4da2-8827-4bc6e88b7618%2Ficon-white.svg';
const BLACK_ICON = 'https://cdn.hyperdev.com/us-east-1%3A3d31b21c-01a0-4da2-8827-4bc6e88b7618%2Ficon-black.svg';
const GRAY_ICON = 'https://cdn.hyperdev.com/us-east-1%3A3d31b21c-01a0-4da2-8827-4bc6e88b7618%2Ficon-gray.svg';

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

function showAuthorizationIframe(t) {
    return t.popup({
        title: 'Autorize para usar este recurso',
        url: './authorize.html'
    });
}

function showSearchCardButton(t, opts) {
    Trello.setKey('0d7257e46f480534e1d50427e2afb1ee');
    return t.getRestApi().getToken().then(function (token) {
        Trello.setToken(token);
        return t.popup({
            title: 'Card #',
            items: function (t, options) {
                return Trello.get("boards/" + t.getContext().board + "/cards",
                    {
                        query: options.search,
                        fields: 'idShort'
                    }).then(function (result) {
                        if (options.search.length === 0) {
                            return [];
                        }
                        return result.filter(function (i) {
                            return i.idShort == options.search
                        }).map(function (i) {
                            return {
                                text: "#" + i.idShort,
                                callback: function (t, opts) {
                                    return t.showCard(i.id)
                                }
                            }
                        })
                    },
                    function (error) {
                        t.alert({
                            message: 'Erro ao recuperar cards do board!',
                            duration: 6,
                            display: 'error'
                        });
                    }
                )
            },
            search: {
                placeholder: '#...',
                empty: 'Card não encontrado!',
                searching: 'Buscando...'
            }
        });
    });
}

TrelloPowerUp.initialize({
        'board-buttons': function (t, opts) {
            return t
                .getRestApi()
                .isAuthorized()
                .then(function (isAuthorized) {
                    if (isAuthorized) {
                        return [{
                            text: 'Abrir Card #',
                            callback: showSearchCardButton
                        }]
                    } else {
                        return [{
                            text: 'Abrir Card #',
                            callback: showAuthorizationIframe
                        }]
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
            const epicBtn = {
                text: 'Epic',
                condition: 'always',
                callback: function (t, opts) {
                    return t.popup({
                        title: 'Epic',
                        url: './card-button.html',
                        args: {myArgs: 'You can access these with t.arg()'},
                        height: 278 // initial height, can be changed later
                    });
                }
            };
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
                let ret = [
                    epicBtn,
                    {
                        icon: GRAY_ICON,
                        text: 'Link to feature',
                        callback: onBtnClick,
                        condition: 'edit'
                    }
                ];
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
    },
    {
        appKey: "0d7257e46f480534e1d50427e2afb1ee",
        appName: "Hurrycaner's Marvelous Power-Up",
    }
);
