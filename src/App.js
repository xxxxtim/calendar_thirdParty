import React from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  var gapi = window.gapi;
  console.log("gapi", gapi);
  /* 
    Update with your own Client Id and Api key 
  */
  var CLIENT_ID =
    "1053651962583-0nsvcp5nrj021hb055l2107aslpeu2t2.apps.googleusercontent.com";
  var API_KEY = "AIzaSyAt_lNk8NKn9k5K5uQb2wLPhhjXgzTBxKw";
  var DISCOVERY_DOCS = [
    "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
  ];
  var SCOPES = "https://www.googleapis.com/auth/calendar.events";

  const addEvent = () => {
    gapi.load("client:auth2", () => {
      console.log("loaded client");

      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      });

      gapi.client.load("calendar", "v3", () => console.log("bam!"));

      gapi.auth2
        .getAuthInstance()
        .signIn()
        .then(() => {
          var event = {
            summary: "吃飯飯",
            location: "Taipei 101",
            description: "甲奔",
            start: {
              dateTime: "2021-06-28T09:00:00-07:00",
              timeZone: "Asia/Taipei",
            },
            end: {
              dateTime: "2021-06-29T17:00:00-07:00",
              timeZone: "Asia/Taipei",
            },
            recurrence: ["RRULE:FREQ=DAILY;COUNT=1"],
            attendees: [
              { email: "yachen@example.com" },
              { email: "ken@example.com" },
            ],
            reminders: {
              useDefault: false,
              overrides: [
                { method: "email", minutes: 24 * 60 },
                { method: "popup", minutes: 10 },
              ],
            },
          };

          var request = gapi.client.calendar.events.insert({
            calendarId: "primary",
            resource: event,
          });

          request.execute((event) => {
            console.log(event);
            window.open(event.htmlLink);
          });

          /*
            Uncomment the following block to get events
        */

          // get events
          // gapi.client.calendar.events
          //   .list({
          //     calendarId: "primary",
          //     timeMin: new Date().toISOString(),
          //     showDeleted: false,
          //     singleEvents: true,
          //     maxResults: 10,
          //     orderBy: "startTime",
          //   })
          //   .then((response) => {
          //     const events = response.result.items;
          //     console.log("EVENTS: ", events);
          //   });
        });
    });
  };

  const getEvent = () => {
    gapi.load("client:auth2", () => {
      console.log("loaded client");

      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      });

      gapi.client.load("calendar", "v3", () => console.log("bam!"));

      gapi.auth2
        .getAuthInstance()
        .signIn()
        .then(() => {
          // get events
          gapi.client.calendar.events
            .list({
              calendarId: "primary",
              timeMin: new Date().toISOString(),
              showDeleted: false,
              singleEvents: true,
              maxResults: 10,
              orderBy: "startTime",
            })
            .then((response) => {
              const events = response.result.items;
              console.log("EVENTS: ", events);
            });
        });
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Click to add event to Google Calendar</p>
        <p style={{ fontSize: 18 }}>
          Uncomment the get events code to get events
        </p>
        <p style={{ fontSize: 18 }}>
          Don't forget to add your Client Id and Api key
        </p>
        <button style={{ width: 100, height: 50 }} onClick={addEvent}>
          Add Event
        </button>
        <button style={{ width: 100, height: 50 }} onClick={getEvent}>
          get Event
        </button>
      </header>
    </div>
  );
}

export default App;
