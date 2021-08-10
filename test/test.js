const { expect } = require("chai");

let USC;
let usc;

describe("USC", function () {

    beforeEach(async function () {
        USC = await ethers.getContractFactory("USC");
        usc = await USC.deploy();
      });

      it("returns my name", async function () {
        await usc.name();
        expect(await usc.name()).to.equal("Leon");
      });

      it("returns my surname", async function () {
        await usc.surname();
        expect(await usc.surname()).to.equal("Africa");
      });

      it("returns decimals", async function () {
        await usc.decimals();
        expect(await usc.decimals()).to.equal(7);
      });

      it("returns number777()", async function () {
        await usc.number777();
        expect(await usc.number777()).to.equal(777);
      });

});