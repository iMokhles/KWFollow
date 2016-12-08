import { Injectable } from '@angular/core';

import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';


@Injectable()
export class UserData {
  _favorites = [];
  HAS_LOGGED_IN = 'hasLoggedIn';
  HAS_SEEN_TUTORIAL = 'hasSeenTutorial';

  constructor(public events: Events, public storage: Storage) {}

  hasFavorite(sessionName) {
    return (this._favorites.indexOf(sessionName) > -1);
  };

  addFavorite(sessionName) {
    this._favorites.push(sessionName);
  };

  removeFavorite(sessionName) {
    let index = this._favorites.indexOf(sessionName);
    if (index > -1) {
      this._favorites.splice(index, 1);
    }
  };

  login(spent, id, role, enabled, username, email, token, ip, balance) {
    this.storage.set(this.HAS_LOGGED_IN, true);
    this.setUserValue('spent',token);
    this.setUserValue('id',id);
    this.setUserValue('role',role);
    this.setUserValue('enabled',enabled);
    this.setUserValue('username',username);
    this.setUserValue('email',email);
    this.setUserValue('token',token);
    this.setUserValue('ip',ip);
    this.setUserValue('balance',balance);
    this.events.publish('user:login');
  };

  signup(spent, id, role, enabled, username, email, token, ip, balance) {
    this.storage.set(this.HAS_LOGGED_IN, true);
    this.setUserValue('spent',token);
    this.setUserValue('id',id);
    this.setUserValue('role',role);
    this.setUserValue('enabled',enabled);
    this.setUserValue('username',username);
    this.setUserValue('email',email);
    this.setUserValue('token',token);
    this.setUserValue('ip',ip);
    this.setUserValue('balance',balance);
    this.events.publish('user:signup');
  };

  logout() {
    this.storage.remove(this.HAS_LOGGED_IN);
    this.storage.remove('spent');
    this.storage.remove('id');
    this.storage.remove('role');
    this.storage.remove('enabled');
    this.storage.remove('username');
    this.storage.remove('email');
    this.storage.remove('token');
    this.storage.remove('ip');
    this.storage.remove('balance');
    this.events.publish('user:logout');
  };

  setUserToken(token) {
    this.storage.set('token', token);
  };

  setUserValue(key, value) {
    this.storage.set(key, value);
  };
  getUserValue(key) {
    return this.storage.get(key).then((value) => {
      return value;
    });
  };
  getUserToken() {
    return this.storage.get('token').then((value) => {
      return value;
    });
  };
  setUsername(username) {
    this.storage.set('username', username);
  };

  getUsername() {
    return this.storage.get('username').then((value) => {
      return value;
    });
  };

  // return a promise
  hasLoggedIn() {
    return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
      return value === true;
    });
  };

  checkHasSeenTutorial() {
    return this.storage.get(this.HAS_SEEN_TUTORIAL).then((value) => {
      return value;
    })
  };
}