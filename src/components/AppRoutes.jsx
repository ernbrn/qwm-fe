import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Homepage from 'pages/Homepage';
import AddWork from 'pages/AddWork';
import EditWork from 'pages/EditWork';
import AddCreator from 'pages/AddCreator';
import AddReference from 'pages/AddReference';
import AddCollection from 'pages/AddCollection';
import About from 'pages/About';
import ViewCreator from 'pages/ViewCreator';
import EditCreator from 'pages/EditCreator';
import ViewWork from 'pages/ViewWork';

export default function AppRoutes() {
  return (
    <Switch>
      <Route exact path="/" component={Homepage} />
      <Route exact path="/works/new" component={AddWork} />
      <Route exact path="/works/:id/edit" component={EditWork} />
      <Route exact path="/works/:id" component={ViewWork} />
      <Route exact path="/creators/new" component={AddCreator} />
      <Route exact path="/creators/:id" component={ViewCreator} />
      <Route exact path="/creators/:id/edit" component={EditCreator} />
      <Route exact path="/collections/new" component={AddCollection} />
      <Route exact path="/references/new" component={AddReference} />
      <Route exact path="/about" component={About} />
    </Switch>
  );
}
