async function main() {
    const proxyAddress = 'your_proxy_address';
   
    const USC2 = await ethers.getContractFactory("USC2");
    console.log("Preparing upgrade...");
    const usc2Address = await upgrades.prepareUpgrade(proxyAddress, USC2);
    console.log("USC2 at:", usc2Address);
  }
   
  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });