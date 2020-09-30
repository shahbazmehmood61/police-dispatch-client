// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // baseURL: 'https://us-central1-police-dispatch-2ede5.cloudfunctions.net/',
  baseURL: "http://localhost:5000/police-dispatch-2ede5/us-central1/",
  firebase: {
    apiKey: "AIzaSyBMUlm_C5ZGtcOr5FPqA8WszQebnJGolOA",
    authDomain: "police-dispatch-2ede5.firebaseapp.com",
    databaseURL: "https://police-dispatch-2ede5.firebaseio.com",
    projectId: "police-dispatch-2ede5",
    storageBucket: "police-dispatch-2ede5.appspot.com",
    messagingSenderId: "812848255718",
    appId: "1:812848255718:web:acc9d509f750e229796127",
    measurementId: "G-QXJYCX6186"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
