const secrets = require('./.secrets.json');

require("@nomiclabs/hardhat-web3");
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-web3");
require('@openzeppelin/hardhat-upgrades');

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  defaultNetwork: "localhost",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545"
    },
    hardhat: {
      forking: {
        url: `https://eth-mainnet.alchemyapi.io/v2//${secrets.fork}`
      },
    },
    ethmainet: {
      url: `https://eth-mainnet.alchemyapi.io/v2/${secrets['alchemy-MAINNET'].ethereum}`,
      chainId: 56,
      gasPrice: 20000000000,
      accounts: [secrets.mainnet['eth-mainnet']]
    },
    // bscmainet: {
    //   url: "https://bsc-dataseed.binance.org/",
    //   chainId: 56,
    //   gasPrice: 20000000000,
    //   accounts: [secrets.mainnet['bsc-mainnet']]
    // },
    // bsctestnet: {
    //   url: "https://data-seed-prebsc-1-s1.binance.org:8545/",
    //   chainId: 97,
    //   gasPrice: 20000000000,
    //   accounts: [secrets.testnet['bsc-testnet']]
    // },
    // ropsten: {
    //   url: `https://eth-ropsten.alchemyapi.io/v2/${secrets['alchemy-testnet'].ropsten}`,
    //   chainId: 3,
    //   gasPrice: 20000000000,
    //   accounts: [secrets.testnet['eth-testnet'].ropsten]
    // },
    // kovan: {
    //   url: `https://eth-kovan.alchemyapi.io/v2/${secrets['alchemy-testnet'].kovan}`,
    //   chainId: 42,
    //   gasPrice: 20000000000,
    //   accounts: [secrets.testnet['eth-testnet'].kovan]
    // },
    rinkeby: {
      url: `https://eth-rinkeby.alchemyapi.io/v2/${secrets['alchemy-testnet'].rinkeby}`,
      chainId: 4,
      gasPrice: 20000000000,
      accounts: [secrets.testnet['eth-testnet'].rinkeby]
    },
    // goerli: {
    //   url: `https://eth-goerli.alchemyapi.io/v2/${secrets['alchemy-testnet'].goerli}`,
    //   chainId: 5,
    //   gasPrice: 20000000000,
    //   accounts: [secrets.testnet['eth-testnet'].goerli]
    // },
  },
  solidity: {
    compilers: [
      {
        version: "0.8.0",
        settings: {
          optimizer: {
            enabled: true,
            runs: 1000,
          },
        },
      },
      {
        version: "0.8.3",
        settings: {
          optimizer: {
            enabled: true,
            runs: 1000,
          },
        },
      },
    ],

  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  mocha: {
    timeout: 20000
  }
};