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

  $('.trash-giftee').click(function() {
      let id = this.getAttribute('data-id');
      events.deleteGiftee(id)
  });
};

const displayDetailsForGiftee = (data) => {
  $("#giftee-notes-here").removeClass('hidden');
  $("#giftee-ideas-here").removeClass('hidden');
  // console.log(data);
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
};

module.exports = {
  displayGifteesForUser,
  displayDetailsForGiftee,
  createNewGiftee,
  addNewIdeaToList
};
