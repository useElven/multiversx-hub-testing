### MultiversX Webview testing app

An app designed to test the integration of the MultiversX **xPortal Discovery** directory and [Web Wallet Hub](https://wallet.multiversx.com/hub) using the [webview provider](https://github.com/multiversx/mx-sdk-js-webview-provider/tree/main).

It should work with apps built with:
- [sdk-dapp](https://github.com/multiversx/mx-sdk-dapp)
- [useElven](https://www.useelven.com)
- [elven.js](https://www.elvenjs.com)

Only for testing on the devnet, connect apps you know. There is no restriction for loaded domains.

### How to use it

1. Go to [multiversx-apps-hub-testing.netlify.app](https://multiversx-apps-hub-testing.netlify.app)
2. Enter the URL of an app that supports MultiversX Hub and useElven at least v0.20.0
3. The app will be loaded into the iframe and it will be connected already
4. Sign transactions

### Development (local run)

1. Git clone the repository
2. `npm install`
3. `cp .env.example .env.local`
4. `npm run dev`

### Built with

- MultiversX JS SDKs
- useElven.com
