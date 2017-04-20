'use strict';


const gifteeList = require ('../templates/gifteelist.handlebars');
const ideasList = require('../templates/ideaslist.handlebars');

let currentGiftee = null

const displayGifteesForUser = (data) => {
  currentGiftee = null // added due to displayDetailsForGiftee
  const events = require('../session/events.js');
  $('.giftees-lister').empty();
  let html = gifteeList({people: data.giftees});
  $('.giftees-lister').append(html);

  $('.giftee-selectable').click(function() {
      let id = this.getAttribute('data-id');
      events.selectedGiftee(id)
  });

  $('.trash-giftee').click(function() {
      let id = this.getAttribute('data-id');
      events.deleteGiftee(id)
  });
};

const displayDetailsForGiftee = (data) => {
  // added if to address how addNewIdeaToList idea-message was removed immediately by updateGifteeData > displayDetailsForGiftee //

  if (currentGiftee === data.notes.giftee_id) {
    return
  }
  currentGiftee = data.notes.giftee_id

  // clear and hide the ideas list
  $('#ideasTitleInput').val("");
  $('#ideasPriceInput').val("");
  $('#ideasSourceInput').val("");
  $('#ideasNotesInput').val("");
  $('.idea-message').text("");
  $('.idea-message').removeClass('hidden');
  $('.idea-message').addClass('hidden');
  // clear notes
  $("#giftee-notes-here").removeClass('hidden');
  $("#giftee-ideas-here").removeClass('hidden');
  $('#notesGeneralInput').val(data.notes.general);
  $('#notesFavoritesInput').val(data.notes.favorites);
  $('#notesSizesInput').val(data.notes.sizes);

  let html = ideasList({ideas: data.ideas});
  $('.pending-ideas-holder').empty();
  $('.pending-ideas-holder').append(html);
};

const createNewGiftee = (data) => {
  const events = require('../session/events.js');
  events.getGifteesForUser();
};


const addNewIdeaToList = (data) => {
  const events = require('../session/events.js');
  events.updateGifteeData(data.idea.giftee.id);
  $('.idea-title-taker').val("");
  $('.idea-where-taker').val("");
  $('.idea-price-taker').val("");
  $('.idea-notes-taker').val("");
  $('#idea-message').removeClass('hidden');
  $('.idea-message').text("Your idea was saved!");
  setTimeout(function() {
      $('#idea-message').addClass('hidden');
      $('.idea-message').text("");
  }, 5000);
};

const addNewIdeaFail = () => {
  $('#idea-message').removeClass('hidden');
  $('.idea-message').text("Sorry, your idea must have a title");
  setTimeout(function() {
      $('#idea-message').addClass('hidden');
      $('.idea-message').text("");
  }, 5000);
};

const notesUpdated = (notes) => {
  $('#notes-message').removeClass('hidden');
  $('.notes-message').text("Your notes were updated!");
  setTimeout(function() {
      $('#notes-message').addClass('hidden');
  }, 5000);
};

const notesNotUpdated = (notes) => {
  $('#notes-message').removeClass('hidden');
  $('.notes-message').text("Your notes were not updated, please try again later.");
  setTimeout(function() {
      $('#notes-message').addClass('hidden');
  }, 5000);
};

module.exports = {
  displayGifteesForUser,
  displayDetailsForGiftee,
  createNewGiftee,
  addNewIdeaToList,
  addNewIdeaFail,
  notesUpdated,
  notesNotUpdated
};
