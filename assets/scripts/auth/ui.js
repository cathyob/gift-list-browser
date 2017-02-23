'use strict';

const store = require('../store');
const session = require('../session/events.js');

const signInSuccess = (data) => {
  // these remove text from input fields and messages when successfully submitted
  $('.email-sign-in').val("");
  $('.pass-sign-in').val("");
  $('.email-sign-up').val("");
  $('.password-sign-up').val("");
  $('.password-confirmation-sign-up').val("");
  $('.sign-in-message').text("");
  $('.sign-up-message').text("");
  // hide the sign-in and sign-up forms once someone is logged in
  $('#waiting-options').hide();
  $('.waiting').hide();

  session.startSession();

  // reveal the sign-out, change password, and who is logged in as the button name once someone is logged in
  $("#logged-in-options").removeClass('hidden');
  $("#user-logged-in").removeClass('hidden');
  $('.logged-in-name').text(store.user.email);

  // hides waiting image and please sign in message once logged in
  $("#waiting-on-user").removeClass('hidden');
  $("#waiting-on-user").addClass('hidden');
  // displays giftee contenet sign in is successfull
  // $("#user-logged-in").removeClass('hidden');
};

const signInFailure = (error) => {
  // this will show the password was invalid
  $('.sign-in-message').text("Sorry, that username or password was incorrect");
};

const changePasswordSuccess = (data) => {
  // these two remove text from input field when successfully submitted
  $('.current-password-change').val("");
  $('.new-password-change').val("");
  // this will show the active user name
  $('.change-pw-message').text("Your password was updated!");
};

const changePasswordFailure = (error) => {
  // this removes text from input field when unsuccessfully submitted
  $('.current-password-change').val("");
  // this will show the password was invalid
  $('.change-pw-message').text("Sorry, that current password was incorrect.");
};

const signUpSuccess = (data) => {
  // these three remove text from input field when successfully submitted
  $('.email-sign-up').val("");
  $('.password-sign-up').val("");
  $('.password-confirmation-sign-up').val("");
  // this will confirm their sign up was sucessful
  $('.sign-up-message').text("Thank you for joining! Please log in to start playing");
  // choosing NOT to hide the sign up form so user can make another account
};

const signUpFailure = (error) => {
  // this removes text from input field when unsuccessfully submitted
  $('.email-sign-up').val("");
  $('.password-sign-up').val("");
  $('.password-confirmation-sign-up').val("");
  // this will show the password was invalid
  $("#user-status").removeClass('hidden');
  $('.sign-up-message').text("Sorry, that username has been used or your passwords did not match.");
};

const signOutSuccess = (data) => {
  // remove text from change password input fields and message when successfully signed out
  $('.current-password-change').val("");
  $('.new-password-change').val("");
  $('.change-pw-message').text("");
  // reveal the sign-in and sign-up options once signed out
  $('#waiting-options').show();
  // hide the sign-out, change password, and who is logged in once user is
  $("#logged-in-options").removeClass('hidden');
  $("#user-logged-in").removeClass('hidden');
  $("#logged-in-options").addClass('hidden');
  $("#user-logged-in").addClass('hidden');
  $('.logged-in-name').text("");
  // reveals please sign in message and waiting image once signed out
  $("#waiting-on-user").removeClass('hidden');
  $('.waiting').show();
  // clear and hide the ideas list
  $('#notesFavoritesInput').val("");
  $('#notesSizesInput').val("");
  $('#notesGeneralInput').val("");
  $("#giftee-notes-here").removeClass('hidden');
  $("#giftee-notes-here").addClass('hidden');
  $('.idea-message').text("");
  $('.idea-message').removeClass('hidden');
  $('.idea-message').addClass('hidden');
  // clear and hide the notes
  $('#ideasTitleInput').val("");
  $('#ideasPriceInput').val("");
  $('#ideasSourceInput').val("");
  $('#ideasNotesInput').val("");
  $("#giftee-ideas-here").removeClass('hidden');
  $("#giftee-ideas-here").addClass('hidden');
  $('.pending-ideas-holder').empty();

};

const signOutFailure = (error) => {
  // this will show the sign out didn't work
  $('.sign-out-message').text("Sorry that sign out failed, please try again.");
};




module.exports = {
  signInSuccess,
  signInFailure,
  changePasswordSuccess,
  changePasswordFailure,
  signUpSuccess,
  signUpFailure,
  signOutSuccess,
  signOutFailure
};
