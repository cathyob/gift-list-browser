'use strict';

const getFormFields = require(`../../../lib/get-form-fields`);

const api = require('./api');
const ui = require('./ui');

const store = require('../store');

let lastId = 0;

const startSession = () => {
  addHandlers();
  getGifteesForUser();
};

const getGifteesForUser = () => {
  // TODO: Needs to be an api call once this works with mock data
  ui.displayGifteesForUser(
    {
      "giftees": [
        {
          "id": 24,
          "name": "new-test-user",
          "user": {
            "id": 6,
            "email": "mike@test.com"
          }
        },
        {
          "id": 25,
          "name": "new-test-user-2",
          "user": {
            "id": 6,
            "email": "mike@test.com"
          }
        }
      ]
    }
  )
};

const selectedGiftee = (id) => {
  if(lastId != id) {
    lastId = id;
    // TODO: Needs to be an api call once this works with mock data
    ui.displayDetailsForGiftee({
      "ideas": [{
        "title": "Item 1",
        "where": "Online",
        "price": 14.99,
        "notes": "Test Note"
      },
      {
        "title": "Item 2",
        "where": "Online",
        "price": 145.00,
        "notes": "Expensive"
      }],
      "notes": {
        "id": 8,
        "giftee_id": 24,
        "favorites": "",
        "sizes": "",
        "general": "",
        "created_at": "2017-02-20T03:18:54.389Z",
        "updated_at": "2017-02-20T03:18:54.389Z"
      }
    });
  }
};

const addHandlers = () => {
  // TODO: Setup buttons on click for Create Giftee, Save Note and Add Idea
  // and create functions for them
};

module.exports = {
  startSession,
  selectedGiftee
};
