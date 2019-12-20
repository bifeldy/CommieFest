// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    mapsAPIKey: 'AIzaSyA6CPcDAI6f5rn2e0gCUq7XIIEKpjqnGdE',
    apiKey: 'AIzaSyA-iyL5g5eVBPIqDQY3Mu4ZF0qUWJuy5IA',
    authDomain: 'commiefest.firebaseapp.com',
    databaseURL: 'https://commiefest.firebaseio.com',
    projectId: 'commiefest',
    storageBucket: 'commiefest.appspot.com',
    messagingSenderId: '639042436654',
    appId: '1:639042436654:web:085c0501230426dbf669bf'
  },
  mapbox: {
    apiKey: 'pk.eyJ1IjoiYmlmZWxkeSIsImEiOiJjam42NWh1cGgwMWR0M3Nvd2M2bXMzbDU2In0.Qipfa9UU3mM3uDtuynNKSw'
  },
  googleMaps: {
    apiKey: 'AIzaSyA6CPcDAI6f5rn2e0gCUq7XIIEKpjqnGdE'
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
