// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  firebase: {
    projectId: 'angular-la-post',
    appId: '1:239727561339:web:c613ea8792ed1dc69570de',
    storageBucket: 'angular-la-post.appspot.com',
    locationId: 'us-central',
    apiKey: 'AIzaSyC7ig-dZDtj4T6Dn1SjUKBiULKGMCNnq94',
    authDomain: 'angular-la-post.firebaseapp.com',
    messagingSenderId: '239727561339',
  },
  production: false,
  herokuPost: 'https://simon-juarez-endpoint.herokuapp.com'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
