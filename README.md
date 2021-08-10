# upgradable-smart-contracts
This project implements the base logic for an upgradable smart contract.

# Structure
This project uses the [OpenZeppelin Upgrades Plugins](https://docs.openzeppelin.com/upgrades-plugins/1.x/) which implements the [Proxy Upgrade Pattern](https://docs.openzeppelin.com/upgrades-plugins/1.x/proxies).

Effectively there are three smart contracts:

Implementation contract containing the logic. (The one you code)
ProxyAdmin to be the admin of the proxy.
Proxy to the implementation contract (the contract you interact with).

[Further elaboration](https://ethereum.stackexchange.com/a/106298/56328)

There are [various Upgrades Patterns](https://blog.openzeppelin.com/the-state-of-smart-contract-upgrades/) aside from the Proxy Upgrade Pattern.

# Prerequisite 
[Node.js LTS](https://nodejs.org/en/)
[MetaMask](https://metamask.io/)

# Environment Setup
````npm install -g yarn````
````yarn tsc````

# How to use (Locally)
Clone this repository 
````git clone https://github.com/Leon-Africa/upgradable-smart-contracts.git````
````yarn install````

You will have to install a local instance of Hardhat 
````npx install hardhat````
````yarn add --dev "hardhat@^2.1.2"````

NOTE: If you are on Windows ensure that you install hardhat via cmd as there is a [known bug](https://github.com/nomiclabs/hardhat/issues/1400) when installing with GitBash.

Create an Account on [Alchemy](https://www.alchemy.com/) an setup an Archive node. After obtaining the keys create a file ````.secrets.json```` in the project root dir with the folliwng structure

````
{
	"mainnet": {
		"eth-mainnet": "ethmainnet_private_key",
		"bsc-mainnet": "your_bscmainnet_private_key"
	},

	"testnet": {
		"eth-testnet": {
			"ropsten": "ropsten_private_key",
			"kovan": "kovan_private_key",
			"rinkeby": "rinkeby_private_key",
			"görli": "görli_private_key"
		},

        "alchemy": {
            "ropsten": "ropsten_NODE_KEY",
			"kovan": "kovan_NODE_KEY",
			"rinkeby": "rinkeby_NODE_KEY",
			"görli": "görli_NODE_KEY"
        }

		"bsc-testnet": "your_bsctestnet_private_key"
	},

	"fork": "your_Alchemy_Archive_Node_API_Key"

}

````
Ensure to replace ````"your_Alchemy_Archive_Node_API_Key"```` with the key you obtained from Alchemy.


Once complete start up a Hardhat Node running 
````npx hardhat node````
In the [````hardhat-config.js````](https://hardhat.org/config/) configuration has been applied for forking therefore starting up the node by default invokes a [mainnet fork](https://hardhat.org/hardhat-network/guides/mainnet-forking.html) utilizing the Alchemy Archive Node. 

Note: There is an additional recommnedation where you can [pin a specific](https://hardhat.org/hardhat-network/guides/mainnet-forking.html#pinning-a-block) block for the mainnet fork.

Run the the smart contract test:
````npx hardhat test````

Deploy the smart contract to the mainnet fork.
````npx hardhat deploy -network localhost scripts/deploy.js````

NOTE: Copy the output proxy smart contract address and store it somewhere

Interact with the deployed smart contract
````npx hardhat console````

Once the console opens:
````const USC = await ethers.getContractFactory("USC")```` 
````const usc = await USC.attach("proxy_address_here")```` 

Then you can start calling functions i.e ````(await usc.name()).toString()````

# How to use (Test Net)
Given that you already followed the above steps the smart contract is already compile. Therefore you start here from the deployment step. The only difference when deploying to testnet is the network url that you specify. Suppose you are deploying to ````rinkeby``` -  go to Alchemy and create a node for Rinkeby. 

Paste the key for that node in ````.secrets.json```` at ````"ropsten": "ropsten_NODE_KEY"````

Next you have to fund the account that will perform the deployment. Navigate to the [Ropsten Faucet](https://faucet.rinkeby.io/) and follow the instructions on the website specifiying your [eth-address](https://metamask.zendesk.com/hc/en-us/articles/360015289512-How-to-copy-your-MetaMask-account-public-address-)

[Obtain your MetaMask  private key](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key) and paste it in ````.secrets.json```` at ````"rinkeby": "rinkeby_private_key"````

Deploy your smart contract to Rinkeby:
````npx hardhat run --network rinkeby scripts/deploy.js````

NOTE: Copy the output proxy smart contract address and store it somewhere

# Create a Gnosis Safe
We create a Gnosis Safe on the Rinkeby Network. Gnosis safe markets themseleves as "The most trusted platform to manage digital assets on Ethereum". Navigate to [https://gnosis-safe.io/](https://gnosis-safe.io/). After clicking "Open App" make sure that your change the network from "Mainnet" to "Rinkeby" and connect your Metamask wallet. Follow all the steps after selecting "Create Safe". (You need funds in your wallet from the Rinkeby Faucet mentioned previously)


# Transfer Ownership to Gnosis Safe
Copy the address for your Gnosis Safe and navigate to the file ````transfer_ownership.js```` and add in your Gnosis Safe Address  ````const gnosisSafe = 'your_gnosis_safe_address'````. This script will transfer ownership of the ProxyAdmin contract to your Gnosis Safe.

To complete the transfer run:
````npx hardhat run --network rinkeby scripts/transfer_ownership.js````

# Setup OpenZeppen Defender
[OpenZeppelin Defender](https://openzeppelin.com/defender/) is effectvely DevSecOps for your smart contracts. Sign up for free at [https://defender.openzeppelin.com/](https://defender.openzeppelin.com/). Once you have signed up select "Add Contract" -> "Import Contract" and connect your wallet. 

Give your contract any name (This is for display purposes only) and ensure that you select the network as ````"Rinkeby"````. In the "Address" input field paste in the address for your deployed proxy smart contract. (NOT your Gnosis safe address, the deployed proxy smart contract address is the address when you initially deployed to the tesnet). Once the the smart contract ABI has been pulled in click "ADD".

You can now manange Upgrades through OpenZeppelin Defender and also invoke the Pause Function. 


# Create and Deploy a New Implementation Contract
Create a file "USC2.sol" copy all the code from "USC.sol" and paste it in the file "USC2.sol".
Add a function to "USC2.sol" i.e

````
function number777 returns (unint256){
    return 777;
}
````

Do the same with the unit tests for the implementation and proxy contract. Creating files "usc2.test.js", "usc2.proxy.js". add the test for the new function:

````
  it('Should return 777', async function () {
    await uscv2.number777();
    expect((uscv2.number777()).toString()).to.equal('777');
  });
````

Next Create the script that deploys the upgraded smart contract - or more accurately - the new implementation contract. Navigate to the file ````upgrade.js```` and provide your proxy address ````  const proxyAddress = 'your_proxy_address';```` (NOT your Gnosis safe address, the deployed proxy smart contract address is the address when you initially deployed to the tesnet).

Deploy to the upgraded implementation contract Rinkeby.
````npx hardhat run --network rinkeby scripts/upgrade.js````

NOTE: In practice before deploying to testnet you should first perform due diligince by redeploying your initial contract on the node with ```deploy.js``` then input that proxy address in ````upgrade.js````. After which you would run the tests, deploy ````upgrade.js```` to the mainnet fork and make sure that you can call the new function you just added.


# Perform the Upgrade
Now that we have deployed the new implementation contract to the testnet it is time to perform the upgrade.
The upgrade can be performed using OpenZeppelin Defender. Copy the new implentation smart contract address. (The new implementation contract address is the address from the implementation contract you deployed in the previous step).

In OpenZeppelin Defender Navigate to the contract for which you set the display name earlier and the select "New Proposal" -> "Upgrade". Paste in the New implementation address - create a title and add a few notes in the description about the upgrade. Finaly select "Create upgrade Proposal"


# Interact with the Upgraded Smart Contract
To interact with the upgraded smart contract use the Hardhat console specififying the Rinkeby network and utilizing the proxy smart contract address. (NOT your Gnosis safe address, the deployed proxy smart contract address is the address when you initially deployed to the tesnet). i.e

Interact with the upgraded smart contract
````npx hardhat console --network rinkeby````
````const USC2 = await ethers.getContractFactory("USC2")```` 
````const usc2 = await USC2.attach("proxy_address_here")```` 
````(await usc2.number777()).toString()````

# Additional Features
This base smart contract also implements [ReentrancyGuard](https://docs.openzeppelin.com/contracts/4.x/api/security#ReentrancyGuard) and also [Pausable](https://docs.openzeppelin.com/contracts/4.x/api/security#Pausable).

Functionals that use ReentrancyGuard specifiy the ````nonReentrant()```` modifier. 
Functions that can be called when the smart contract is not paused specify the ````whenNotPaused()```` modifier. Whereas functions that can be called when the smart contract is paused specify the ````whenPaused()```` modifier

# Conclusion
You can use this code as a base code to setup your Upgradable Smart Contract Project on any EVM based blockchain. The upgrades process for any new implementationn contracts that you create will follow the logic as specified above. 