import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import HeaderMenu from "./components/headerMenu";
import AddImage from "./components/addImage";
import Gallery from "./components/gallery";
import Selector from "./components/selector";

import GalleryContract from "./contracts/Gallery.json";
import getWeb3 from "./utils/getWeb3";

class App extends React.Component {
  state = {
    web3: null,
    accounts: null,
    contract: null
  };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();
      console.log("web3.version = ", web3.version);

      // Get the user's accounts.
      const accounts = await web3.eth.getAccounts();
      console.log(accounts);

      // Get the contract
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = GalleryContract.networks[networkId];
      const contract = new web3.eth.Contract(
        GalleryContract.abi,
        deployedNetwork && deployedNetwork.address
      );
      console.log(contract);
      this.setState({ web3, accounts, contract });
    } catch (error) {
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="ui container">
        <BrowserRouter>
          <div>
            <HeaderMenu />
			<Route path ="/addimage" exact render={(props) => <AddImage {...props} contract={this.state.contract} accounts={this.state.accounts} />} />
			<Route path ="/gallery"  exact component={Selector} />
			<Route path ="/gallery"  exact render={(props) => <Gallery {...props} contract={this.state.contract} accounts={this.state.accounts} />} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
