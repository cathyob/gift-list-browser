'use strict';

const getFormFields = require(`../../../lib/get-form-fields`);

const api = require('./api');
const ui = require('./ui');

const store = require('../store');

let lastId = 0;

const getGifteesForUser = () => {
  api.getGiftees()
    .then(ui.displayGifteesForUser);
};

const startSession = () => {
  addHandlers();
  getGifteesForUser();
};

const selectedGiftee = (id) => {
  if(lastId !== id) {
    lastId = id;
    api.getGiftees(id)
      .then(ui.displayDetailsForGiftee)
  }
};

const onCreateGiftee = () => {
  let name = $('.giftee-name-taker').val();
  let body = {};
  body.giftee = {"name": name};

  api.createGiftee(body)
    .then(ui.createNewGiftee)
    $('.giftee-name-taker').val("");
};

const onUpdateNotes = () => {
  // to get out of general notes of part of save function
  let favoritesNotes = $('#notesFavoritesInput').val();
  let sizesNotes = $('#notesSizesInput').val();
  let generalNotes = $('#notesGeneralInput').val();
  console.log(favoritesNotes);
  console.log(sizesNotes);
  console.log(generalNotes);
  // need to get data out of the notes/ideas like above and console log, then after that
  // will need to actually send to server
  console.log(body);
  api.updateNotes(body)
    .then(ui.notesUpdated)
    $('#notesFavoritesInput').val(favoritesNotes);
    $('#notesSizesInput').val(sizesNotes);
    $('#notesGeneralInput').val(generalNotes);
};

const onAddIdea = () => {
};

const addHandlers = () => {
  // TODO: Setup buttons on click for Create Giftee, Save Note and Add Idea
  // and create functions for them
  $('#giftee-create').on('click', onCreateGiftee);
  $('.giftee-notes').on('submit', onUpdateNotes);
  $('.giftee-ideas').on('submit', onAddIdea);
};

module.exports = {
  addHandlers,
  startSession,
  selectedGiftee,
  getGifteesForUser,
  onUpdateNotes
};
