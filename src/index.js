'use strict';

var Alexa = require('alexa-sdk');
var APP_ID = "amzn1.ask.skill.58e32896-98e7-4952-bd72-b0ee40ef11ee";

exports.handler = function (event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        console.log("LaunchRequest");
        this.attributes['speechOutput'] = this.t("WELCOME_MESSAGE", this.t("SKILL_NAME"));
        // If the user either does not reply to the welcome message or says something that is not
        // understood, they will be prompted again with this text.
        this.attributes['repromptSpeech'] = this.t("WELCOME_REPROMPT");
        this.emit(':ask', this.attributes['speechOutput'], this.attributes['repromptSpeech']);
    },
    'WantRoomIntent': function () {
        console.log("WantRoomIntent");
        this.attributes['speechOutput'] = this.t("RESPONSE_WANT_ROOM");
        this.attributes['repromptSpeech'] = this.t("RESPONSE_WANT_ROOM");
        this.emit(':ask', this.attributes['speechOutput'], this.attributes['repromptSpeech']);
    },
    'HowManyPeopleIntent': function () {
        console.log("HowManyPeopleIntent "+this.event.request.intent.slots.numberOfPeople);
        var itemSlot = this.event.request.intent.slots.numberOfPeople;
        var itemName;
        if (itemSlot && itemSlot.value) {
            itemName = itemSlot.value.toLowerCase();
        }

        if (itemName) {
            this.attributes['speechOutput'] = this.t("RESPONSE_HOW_MANY_PEOPLE", itemName);
            this.attributes['repromptSpeech'] = this.t("RESPONSE_HOW_MANY_PEOPLE", itemName);
            this.emit(':ask', this.attributes['speechOutput'], this.attributes['repromptSpeech']);
        }
        else {
            console.log("error HowManyPeopleIntent no slots");
            this.attributes['speechOutput'] = this.t("HELP_MESSAGE");
            this.attributes['repromptSpeech'] = this.t("HELP_REPROMPT");
            this.emit(':ask', this.attributes['speechOutput'], this.attributes['repromptSpeech']);
        }
    },
    'BookRoomIntent': function () {
        console.log("BookRoomIntent");
        var itemSlot = this.event.request.intent.slots.roomColour;
        var itemName;
        if (itemSlot && itemSlot.value) {
            itemName = itemSlot.value.toLowerCase();
        }

        if (itemName) {
            this.attributes['speechOutput'] = this.t("RESPONSE_BOOK_ROOM", itemName);
            this.attributes['repromptSpeech'] = this.t("RESPONSE_BOOK_ROOM", itemName);
            this.emit(':ask', this.attributes['speechOutput'], this.attributes['repromptSpeech']);
        }
        else {
            console.log("error BookRoomIntent no slots");
            this.attributes['speechOutput'] = this.t("HELP_MESSAGE");
            this.attributes['repromptSpeech'] = this.t("HELP_REPROMPT");
            this.emit(':ask', this.attributes['speechOutput'], this.attributes['repromptSpeech']);
        }
    },
    'WantCateringIntent': function () {
        console.log("WantCateringIntent");
        var itemSlot = this.event.request.intent.slots.food;
        var itemName;
        if (itemSlot && itemSlot.value) {
            itemName = itemSlot.value.toLowerCase();
        }

        if (itemName) {
            this.attributes['speechOutput'] = this.t("RESPONSE_WANT_CATERING", itemName);
            this.emit(':tell', this.attributes['speechOutput']);
        }
        else {
            console.log("error BookRoomIntent no slots");
            this.attributes['speechOutput'] = this.t("HELP_MESSAGE");
            this.attributes['repromptSpeech'] = this.t("HELP_REPROMPT");
            this.emit(':ask', this.attributes['speechOutput'], this.attributes['repromptSpeech']);
        }

    },
    'AMAZON.HelpIntent': function () {
        this.attributes['speechOutput'] = this.t("HELP_MESSAGE");
        this.attributes['repromptSpeech'] = this.t("HELP_REPROMPT");
        this.emit(':ask', this.attributes['speechOutput'], this.attributes['repromptSpeech']);
    },
    'AMAZON.StopIntent': function () {
        this.emit('SessionEndedRequest');
    },
    'AMAZON.CancelIntent': function () {
        this.emit('SessionEndedRequest');
    },
    'SessionEndedRequest': function () {
        this.emit(':tell', this.t("STOP_MESSAGE"));
    },
    'Unhandled': function () {
        this.attributes['speechOutput'] = this.t("HELP_MESSAGE");
        this.attributes['repromptSpeech'] = this.t("HELP_REPROMPT");
        this.emit(':ask', this.attributes['speechOutput'], this.attributes['repromptSpeech']);
    }
};

var languageStrings = {
    "en": {
        "translation": {
            "SKILL_NAME": "RGA Room booking service",
            "WELCOME_MESSAGE": "Welcome to %s. You can say something like I need a room or any rooms availabble",
            "WELCOME_REPROMPT": "For instructions on what you can say, please say help me.",

            "HELP_MESSAGE": "You can ask to book a room like this I need a room or any rooms availabble",
            "HELP_REPROMPT": "You can say I need a room or any rooms availabble",

            "RESPONSE_WANT_ROOM": "How many people is the room for",

            "RESPONSE_BOOK_ROOM": "You have booked the %s room. What catering would you like?",

            "RESPONSE_HOW_MANY_PEOPLE": "A room for %s, the current room available are red and blue. Which one would you like to book?",

            "RESPONSE_WANT_CATERING": "Great, all done. %s will be order for your meeting. Goodbye!",

            "STOP_MESSAGE": "Goodbye!",

            "RECIPE_REPEAT_MESSAGE": "Sorry I did not catch that please try again.",
        }
    },
    "en-US": {
        "translation": {
            "SKILL_NAME": "RGA Room booking service"
        }
    },
    "en-GB": {
        "translation": {
            "SKILL_NAME": "RGA Room booking service"
        }
    }
};