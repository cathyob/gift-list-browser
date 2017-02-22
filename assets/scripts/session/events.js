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

const selectedGiftee = (id) => {
  if(lastId !== id) {
    lastId = id;
    api.getGifteeDetails(id)
      .then(ui.displayDetailsForGiftee);
  }
};

const updateGifteeData = (id) => {
    api.getGifteeDetails(id)
      .then(ui.displayDetailsForGiftee);
};

const onCreateGiftee = () => {
  let name = $('.giftee-name-taker').val();
  let body = {};
  body.giftee = {"name": name};

  api.createGiftee(body)
    .then(ui.createNewGiftee);
    $('.giftee-name-taker').val("");
};

const onUpdateNotes = () => {
  // to get out of general notes of part of save function
  let notes = {};

  notes.favorites = $('#notesFavoritesInput').val();
  notes.sizes = $('#notesSizesInput').val();
  notes.general = $('#notesGeneralInput').val();

  // console.log({"notes": notes});
  api.updateNotes({"note": notes}, lastId)
    .then(ui.notesUpdated);
};

const onAddIdea = () => {
  console.log("bam")
  let idea = {};
  idea.giftee_id = lastId;
  idea.title = $('#ideasTitleInput').val();
  idea.where = $('#ideasSourceInput').val();
  idea.price = $('#ideasPriceInput').val();
  idea.notes = $('#ideasNotesInput').val();
  idea.status = 0;

  console.log({"idea": idea});
  api.createNewIdea({"idea":idea})
    .then(ui.addNewIdeaToList);

    $('.idea-title-taker').val("");
    $('.idea-where-taker').val("");
    $('.idea-price-taker').val("");
    $('.idea-notes-taker').val("");
};

const addHandlers = () => {
  $('#giftee-create').on('click', onCreateGiftee);
  $('#notes-update').on('click', onUpdateNotes);
  $('#idea-create').on('click', onAddIdea);
};

const startSession = () => {
  addHandlers();
  getGifteesForUser();
};

module.exports = {
  addHandlers,
  startSession,
  selectedGiftee,
  updateGifteeData,
  getGifteesForUser,
  onUpdateNotes,
  onAddIdea
};
