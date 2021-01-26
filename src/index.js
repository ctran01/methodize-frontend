import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import LogRocket from "logrocket";
// Sentry.init({
//   dsn:
//     "https://4acb30e87b26473babb209dd1ae07e67@o505304.ingest.sentry.io/5593396",
//   autoSessionTracking: true,
//   integrations: [new Integrations.BrowserTracing()],

//   // We recommend adjusting this value in production, or using tracesSampler
//   // for finer control
//   tracesSampleRate: 1.0,
// });

LogRocket.init("mcmykl/methodize");

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

//"start": "node --max_old_space_size=6144 node_modules/.bin/react-scripts start",
// "build": "node --max_old_space_size=6144 node_modules/.bin/react-scripts build",
// "plugin:cypress/recommended"
