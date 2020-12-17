const Gallery = artifacts.require("./Gallery.sol");
const truffleAssert = require('truffle-assertions');

contract("Gallery", accounts => {

	const url = "https://random.dog/8b28a6b8-2711-47ef-b8b8-fd557464a1ed.jpg";
	const caption = "Dodge Baby";

	console.log("testing using web3.version =", web3.version)

	before(async () => {
		this.gallery = await Gallery.deployed();
	})


	it('deploys successfully', async () => {
		const address = await this.gallery.address;
		assert.notEqual(address, 0x0);
		assert.notEqual(address, '');
		assert.notEqual(address, null);
		assert.notEqual(address, undefined);
	  })


	it("should add an item and return an events with new number of items", async () => {
		// const this.gallery = await Gallery.deployed();
		const length_before = await this.gallery.getNumberofItems();

		const result = await this.gallery.addItem(url, caption); // , { from: accounts[0] });

		// console.log("event = result.logs[0].args = ", event = result.logs[0].args)

		truffleAssert.eventEmitted(result, 'ItemAdded', (event) => {
			// console.log("truffleAssert.eventEmitted event = ", event);
			return event.length.toNumber() === length_before.toNumber() + 1;
		}, 'Contract should return event with new contract length.');

		const length_after = await this.gallery.getNumberofItems();
		assert.equal(length_after.toNumber(), length_before.toNumber() + 1,
			"The number of gallery items did not increase by one.");
	});


	it("should retrieve item", async () => {
		// const this.gallery = await Gallery.deployed();
		const length = await this.gallery.getNumberofItems();
		const result = await this.gallery.getItemByIndex(length.toNumber() - 1);

		const url_retrieved = result[0];
		const caption_retrieved = result[1];

		assert.equal(url, url_retrieved, "Retrieved url should be identical to stored url.");
		assert.equal(caption, caption_retrieved, "Retrieved caption should be identical to stored caption.");
	});


	it('should throw error if getItemByIndex was called with index out of bounds', async () => {
		let err = null
		try {
		  await this.gallery.getItemByIndex(Number.MAX_SAFE_INTEGER);
		} catch (error) {
		  err = error
		}
		assert.ok(err instanceof Error)
	})

});
