// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'https://mykittycafeback.azurewebsites.net/api',
  blobBaseUrl: 'https://publicstoragemkc.blob.core.windows.net/demoblob/',
  sasToken: 'sv=2022-11-02&ss=bfqt&srt=co&sp=rwdlacupiytfx&se=2025-05-01T08:51:18Z&st=2024-10-31T00:51:18Z&spr=https,http&sig=G%2F3EyjsnSrrNfKhFOAxnDEw7WGQ8J4EgWmFqK6PYjPk%3D',
  paypalSdkUrl: 'https://www.paypal.com/sdk/js?currency=CAD&client-id=AWNsfCPi0LJItEVWoIorEiFKjkueyzlSoaQEetYFidIAdFQdzIYbiksFwGP3YN4cUFrCerjsAVk-wo-m'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
