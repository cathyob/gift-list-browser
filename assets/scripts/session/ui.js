'use strict';


const gifteeList = require ('../templates/gifteelist.handlebars');
const ideasList = require('../templates/ideaslist.handlebars');

const displayGifteesForUser = (data) => {
  const events = require('../session/events.js');
  $('.giftees-lister').empty();
  let html = gifteeList({people: data.giftees});
  $('.giftees-lister').append(html);

  $('.giftee-selectable').click(function() {
      let id = this.getAttribute('data-id');
      events.selectedGiftee(id)
  });
};

const displayDetailsForGiftee = (data) => {
  $("#giftee-notes-here").removeClass('hidden');
  $("#giftee-ideas-here").removeClass('hidden');
  console.log(data);
  $('#notesGeneralInput').val(data.notes.generalNotes);
  $('#notesFavoritesInput').val(data.notes.favoritesNotes);
  $('#notesSizesInput').val(data.notes.sizesNotes);

// TODO: Style the ideaslist on the right column on the ideas (padding, size, etc), delete button, etc
  let html = ideasList({ideas: data.ideas});
  $('.pending-ideas-holder').empty();
  $('.pending-ideas-holder').append(html);
};

const createNewGiftee = (data) => {
  const events = require('../session/events.js');
  events.getGifteesForUser();
};

const notesUpdated = (data) => {
  const events = require('../session/events.js');
  displayDetailsForGiftee();
};

module.exports = {
  displayGifteesForUser,
  displayDetailsForGiftee,
  createNewGiftee,
  notesUpdated
};
