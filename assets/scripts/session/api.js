'use strict';

const config = require('../config');
const store = require('../store');

const getGiftees = function () {
  return $.ajax({
    url: config.apiOrigin + '/giftee',
    method: 'GET',
    headers: {
      Authorization: `Token token=${store.user.token}`,
    }
  });
};

const getGifteeDetails = function (id) {
  return $.ajax({
    url: config.apiOrigin + '/giftee/' + id,
    method: 'GET',
    headers: {
      Authorization: `Token token=${store.user.token}`,
    }
  });
};

const createGiftee = function(data) {
  return $.ajax({
    url: config.apiOrigin + '/giftee/',
    method: 'POST',
    headers: {
      Authorization: `Token token=${store.user.token}`,
    },
    data
  });
};

const updateNotes = function (id) {
  return $.ajax({
    url: config.apiOrigin + '/note/' + id,
    method: 'PATCH',
    headers: {
      Authorization: `Token token=${store.user.token}`,
    },
  });
};

module.exports = {
  getGiftees,
  getGifteeDetails,
  createGiftee,
  updateNotes
};
