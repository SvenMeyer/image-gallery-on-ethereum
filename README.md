# Simple Image Gallery on Ethereum Blockchain

## Table of Contents

   * [Overview](#)
      * [Introduction](#introduction)
      * [Required technology](#required-technology)
      * [Task](#task)
      * [Instructions](#instructions)
   * [Implementation](#implementation)
   * [Back-end Implementation](#back-end-implementation)
   * [Client Implementation](#client-implementation)
      * [Managing State](#managing-state)
         * [React state object / setState](#react-state-object--setstate)
         * [props](#props)
         * [Redux](#redux)
         * [Other Options for State Management](#other-options-for-state-management)
      * [Open Issues](#open-issues)
         * [Tests](#tests)
         * [Programming Language for Client](#programming-language-for-client)
         * [CSS Styling](#css-styling)
   * [Install, test and try out application](#install-test--and-try-out-application)
      * [Backend / smartcontract testing](#backend--smartcontract-testing)
      * [Setup an Ethereum Test Blockchain](#setup-an-ethereum-test-blockchain)
      * [Deploy the SmartContract](#deploy-the-smartcontract)
      * [Setup MetaMask](#setup-metamask)
      * [Setup and start Application Server](#setup-and-start-application-server)
      * [Testing the Application](#testing-the-application)

=======

## Technology used

- Back-end technologies:

  - Soliditity (the Ethereum smart contract language)
  - Ethereum Blockchain

- Front-end technologies:

  - JavaScript
  - React
  - Redux


## Requirements

A basic gallery to display image and video items.

- A responsive fixed-width layout
- The app should consist of two pages:
  - A list view of gallery items
    - For desktop there should be 4 results to a row
    - For mobile there should be 1 result per row
    - A way to filter and/or sort by file type
  - A page to add a gallery item, consisting of:
    - URL to the gallery item
    - Caption for the gallery item
    - An "Add" button to create the item
    - An "Import dog" button that will optionally populate the URL field with a result from:
      https://random.dog/woof.json
- The app should support jpg, gif, png and mp4 gallery items
- A smart contract to store gallery items (url, caption)
- No storage of actual media item in the app
- No edit / delete features for gallery items needed (at the moment)

------------------------------------------------------------------------------

# Implementation

# Back-end Implementation

The smart contract has been implement in Solidity for an Ethereum Blockchain. Truffle and Ganache GUI were used as developement and test blockchains.

# Client Implementation

The client has been implemented using React and Redux.

## Managing State
Various approaches for state management and state sharing between component were used within this project to demonstrate the different options.

### React state object / setState
- The `state` object is used to locally store state within a component and `setState`to ensure that the component, as well as child components will be re-rendered on state changes.

### props
- Props are used for simple propagation of parameters to child components.

### Redux
- Redux is used to share the state of the filter `selector.js` component with the `gallery.js` component which displays the images, as well as for sharing the values of the input fields within `addImage.js`.
- Initially, Redux was also used to store the items/images within the `gallery.js` component. Redux could have been used to cache the data of the blockchain to reduce the number of requests to it. However, that would have added quite some complexity to keep the datasets in sync and (at a later stage) invalidate entries when items have been deleted.
For this application, directly loading the list of images from the blockchain each time the gallery component is loaded is definitely not an issue.
Also the image data, once loaded, stays anyway locally within the `gallery.js` component, which sorts and renders it according to the filter settings.
If caching in larger applications is a requirement, then Drizzle [https://www.trufflesuite.com/drizzle] is definitely worth a look as most of the caching code on top of a Redux store is already provided out of the box.

### Other Options for State Management
Beside that, a few interesting other technologies are available or emerging which might be interesting as alternatives or complementary approaches for state management. Just to name a few ...

- [React Context](https://reactjs.org/docs/context.html)
- [React Hooks](https://reactjs.org/docs/hooks-intro.html)
- [MobX](https://mobx.js.org)
- [Svelte](https://svelte.dev)


## Open Issues

### Tests

-  The only test available for the React client is the default 'renders without crashing' test provided by create-react-app. No additional tests have been developed for the React client.
- [cypress.io](https://www.cypress.io/) would be an interesting option though to set up tests for browser based applications.

### Programming Language for Client

- The project was started using JavaScript ES6/ES2015 with the intention to later migrate to TypeScript. Due to limited time, this was not addressed, but (auto-generated) TypeScript files were left within the project folder to support this process at a later time.

###  CSS Styling

- At the start of the project, Semantic ui, and later Semantic ui React were used for styling the components, which was deemed appropriate for this small application. A planned  migration at a later stage to a module-based CSS solution wasn't conducted due to lack of time.

------------------------------------------------------------------------------

# Install, test and run application

Clone/download this repo and change into that directory.
NodeJS is required. The code has been developed and tested with node v10.16.0

##  Backend / smartcontract testing

If Truffle is not yet installed, install it either locally or global.

When using node v12 , truffle@nodeLTS should be used.
(https://github.com/trufflesuite/truffle/issues/2070)

```
$ npm install truffle
$ npm install -g truffle
$ npm install -g truffle@nodeLTS
```

Within the main directory, the JavaScript-based tests for the smartcontract can be executed. As the tests require the packages `truffle-assertions` and `truffle-hdwallet-provider` (in that order at the moment !), they need to be installed first - which can conveniently be executing in the main directory by:

```
$ npm install
```

The easiest way to execute the tests for the smartcontract is by using the Ethereum development blockchain within Truffle. Compile the smartcontract, start the test blockchain and test environment, and execute the tests.

```
$ truffle compile
$ truffle develop
truffle(develop)> test
```

4 tests will be executed and the output should be similar to this:
```
  Contract: Gallery
    ✓ deploys successfully
    ✓ should add an item and return an events with new number of items (104ms)
    ✓ should retrieve item (66ms)
    ✓ should throw error if getItemByIndex was called with index out of bounds
```

------------------------------------------------------------------------------

## Setup an Ethereum Test Blockchain

Option 1: Just leave the terminal window with the truffle console `truffle(develop)>` up and running, this will provide access to the truffle development blockchain on localhost port 8545 [http://127.0.0.1:8545] by default.

Option 2: Nicer and with better (visual) access to what is going on 'behind the scenes' is provided by Ganache GUI. Get it at [https://www.trufflesuite.com/ganache], install it, start it and choose 'Quickstart'. Ganache GUI will provide a development blockchain on localhost port 7545 [http://127.0.0.1:7545] by default.

Both environments display a 12 word mnemonic which allow to create a wallet with access to the test accounts provided by Truffle or Ganache GUI. The defaults are:

Truffle

```pill few wear village tower boat error taste awful panda entire limb```

Ganache GUI (version 2.10)

```tomorrow draft giggle design purchase daring goddess cute inquiry giant thumb journey```

**WARNING : NEVER use a wallet created with these mnemonics on the Ethereum mainnet with real Ether. Anybody who finds out about it (or just gives it a try) will be able to move your funds!**

By now, a test blockchain should be up and running.

------------------------------------------------------------------------------

## Deploy the SmartContract

Option 1 (running Truffle)
```
truffle(develop)> migrate
```

Option 2 (running Ganache GUI on localhost:7545)

`truffle-config.js` already contains a network configuration for this setup.
 ```
$ truffle migrate --network localhost_7545
```
Thereafter you should see within Ganache GUI that you have spent some parts of your (test) Ether of your first account, 4 additional blocks should be mined as well as 4 transactions visible.
If `truffle-config.js` is added as a project within the Ganache GUI Contracts tab, additional details about the contract state can be displayed.

![Ganache_GUI_Contracts.png](https://github.com/SvenMeyer/innovation-lab-code-test/blob/develop/doc/Ganache_GUI_Contracts.png)

------------------------------------------------------------------------------

## Setup MetaMask

In order to use an Ethereum Blockchain based application, a **_wallet_** to hold accounts and to (directly) interact with the blockchain is required. **_MetaMask_** is currently the most popular plug-in for a standard web browser. Get MetaMask here [https://metamask.io/] and install it in a web browser (Chrome is recommended).

Open MetaMask by clicking on the orange fox icon (top right corner of the browser). Create a new wallet by choosing `Import using account seed phrase` and provide the 12 word mnemonic displayed by Truffle / Ganache GUI.

Click the 'Network' drop-down on the top. If there is no pre-configured network which matches the test blockchain (Truffle: localhost:8545 / Ganache GUI localhost:7545), it has to be added by choosing [Custom RPC] within the drop-down list.

Once connected to the blockchain, clicking on the top-right icon within the MetaMask pop-up should show at least one account with 100 (test) Ether.

------------------------------------------------------------------------------

## Setup and start Application Server

Open a new terminal and change into the `client` directory.
Install the required dependencies and start the server
```
$ npm install
$ npm start
```
This should automatically open a new window within your (default) browser on `localhost:3000`.

A few seconds later, MetaMask will ask for a confirmation to connect and to make its accounts visible to the application. Either the MetaMask pop-up shows up right away or a small number next to the MetaMask icon is displayed, indicating the number of outstanding transactions to be confirmed - in this case you need to click on the icon to bring the MetaMask pop-up forward.

![MetaMask request for connect.png](https://github.com/SvenMeyer/innovation-lab-code-test/blob/develop/doc/MetaMask_request_for_connect.png)

Actually, at the moment there seems to be a (possible) problem with Firefox + MetaMask, so using Chrome + MetaMask is highly recommended.

------------------------------------------------------------------------------

## Testing the Application

On the Homepage [http://localhost:3000/] you should (just) see the header menu.


Type a URL of an image of your choice or generate a link to an image on [http://dog.random].
Add a caption and write the image url & caption to the blockchain by hitting the [add Image] button.
MetaMask should pop-up again or indicate a request for a transaction confirmation by showing a '1' next to the MetaMask icon.
Once the transaction is confirmed, you should see for a short time a browser pop-up.

Choose [Gallery] from the header menu and you should see the image(s). Go back to the [add Image] page to add more images.

Once a few images (actually only image URLSs) have been written to the blockchain, you can try out the filter on the Gallery page and sort the images by file extension.

Videos can be played within the small 'cards'.

On a mobile phone (or Chrome browser in mobile development mode), you should see the images stacked below each other.
