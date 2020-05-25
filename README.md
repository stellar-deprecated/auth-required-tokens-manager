# Auth Required Tokens Manager

This app is used to manage testnet auth required tokens and to generate
[SEP-7](https://github.com/stellar/stellar-protocol/blob/master/ecosystem/sep-0007.md)
QRCodes with payment and path payment operations.

## Features

* Configure token to be auth required.
* Establish trustlines between accounts and token.
* Make the market (create offers) between the token and XLM.
* Send payments using the token.
* Create SEP7 QRCode to send payments.
* Send path payments with the path: `auth required token => XLM`.
* Create SEP7 QRCode to send path payments with the path: `auth required token => XLM`.

## Configuring Keys and Assets

You can check the pre-loaded keys and the asset name in the [.env](.env) file.

It's recommended to generate new keys in [Stellar Lab](https://laboratory.stellar.org/#?network=test)
and populate [.env](.env) with them.

## UI Sample

![Alt text](UI_Screenshot.png?raw=true "UI Sample")

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br /> Open
[http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br /> You will also see any lint errors
in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br /> See the section
about
[running tests](https://facebook.github.io/create-react-app/docs/running-tests)
for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br /> It correctly bundles
React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br /> Your app is
ready to be deployed!

See the section about
[deployment](https://facebook.github.io/create-react-app/docs/deployment) for
more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can
`eject` at any time. This command will remove the single build dependency from
your project.

Instead, it will copy all the configuration files and the transitive
dependencies (webpack, Babel, ESLint, etc) right into your project so you have
full control over them. All of the commands except `eject` will still work, but
they will point to the copied scripts so you can tweak them. At this point
you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for
small and middle deployments, and you shouldn’t feel obligated to use this
feature. However we understand that this tool wouldn’t be useful if you couldn’t
customize it when you are ready for it.

## Learn More

You can learn more in the
[Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
