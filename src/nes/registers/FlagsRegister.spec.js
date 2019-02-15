import { FlagsRegister } from ".";
const should = require("chai").Should();

describe("registers", () => {
	describe("FlagsRegister", () => {
		it("can load the flags from a byte", () => {
			new FlagsRegister().load(0b00001010).should.include({
				n: false,
				v: false,
				b1: false,
				b2: false,
				d: true,
				i: false,
				z: true,
				c: false
			});
		});

		it("can encode itself into a byte", () => {
			const flags = new FlagsRegister();
			flags.d = true;
			flags.z = true;
			flags.toByte().should.equal(0b00001010);
		});
	});
});
