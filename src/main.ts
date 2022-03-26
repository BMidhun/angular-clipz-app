import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

if (environment.production) {
  enableProdMode();
}

// We initialize firebase before bootstrapping the angular app is because we don't want the application to repaint the application when the authentication is resolved.
// If we haven't setup this configuration, then in slow internet the application in split time shows elements that are not supposed to be shown, when user is authenticated.

firebase.initializeApp(environment.firebase);

let isAppInit = false;

firebase.auth().onAuthStateChanged(() => {
  if (!isAppInit) {
    platformBrowserDynamic()
      .bootstrapModule(AppModule)
      .catch((err) => console.error(err));
  }

  isAppInit = true;
});
