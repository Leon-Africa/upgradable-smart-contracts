const { expect } = require("chai");

let USC;
let usc;

describe("USC", function () {

    beforeEach(async function () {
        USC = await ethers.getContractFactory("USC");
        usc = await upgrades.deployProxy(USC);
      });

      it("returns upgrade var", async function () {
        await usc.upgrade_var();
        expect(await usc.upgrade_var()).to.equal("ValueOne");
      });

});