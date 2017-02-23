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

  api.updateNotes({"note": notes}, lastId)
    .then(ui.notesUpdated);
};

const onAddIdea = () => {
  let idea = {};
  idea.giftee_id = lastId;
  idea.title = $('#ideasTitleInput').val();
  idea.where = $('#ideasSourceInput').val();
  idea.price = $('#ideasPriceInput').val();
  idea.notes = $('#ideasNotesInput').val();
  idea.status = 0;

  api.createNewIdea({"idea":idea})
    .then(ui.addNewIdeaToList)
    .catch(ui.addNewIdeaFail);
};

const addHandlers = () => {
  $('#giftee-create').on('click', onCreateGiftee);
  $('#notes-update').on('click', onUpdateNotes);
  $('#idea-create').on('click', onAddIdea);
};

const deleteGiftee = (id) => {

  if(id === lastId) {
    $("#giftee-notes-here").removeClass('hidden');
    $("#giftee-ideas-here").removeClass('hidden');
    $("#giftee-notes-here").addClass('hidden');
    $("#giftee-ideas-here").addClass('hidden');
    $('.pending-ideas-holder').empty();
  }

  api.deleteSelectedGiftee(id)
    .then(getGifteesForUser);
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
  onAddIdea,
  deleteGiftee
};
