import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import NoteStateProvider from "./Context/Notes/NoteState.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <NoteStateProvider>
      <App />
    </NoteStateProvider>
  </BrowserRouter>
);
