import { signedByte } from "../helpers";

const N_BIT /* */ = 0b10000000;
const V_BIT /* */ = 0b01000000;
const B1_BIT /**/ = 0b00100000;
const B2_BIT /**/ = 0b00010000;
const D_BIT /* */ = 0b00001000;
const I_BIT /* */ = 0b00000100;
const Z_BIT /* */ = 0b00000010;
const C_BIT /* */ = 0b00000001;

export default class FlagsRegister {
	constructor() {
		this.n = false; // negative
		this.v = false; // overflow
		this.b1 = false; // break command (1)
		this.b2 = false; // break command (2)
		this.d = false; // decimal mode
		this.i = false; // interrupt disable
		this.z = false; // zero
		this.c = false; // carry
	}

	updateZeroAndNegative(byte) {
		if (signedByte.isZero(byte)) this.z = true;
		if (signedByte.isNegative(byte)) this.n = true;
	}

	load(byte) {
		this.n = !!(byte & N_BIT);
		this.v = !!(byte & V_BIT);
		this.b1 = !!(byte & B1_BIT);
		this.b2 = !!(byte & B2_BIT);
		this.d = !!(byte & D_BIT);
		this.i = !!(byte & I_BIT);
		this.z = !!(byte & Z_BIT);
		this.c = !!(byte & C_BIT);

		return this;
	}

	toByte() {
		return (
			(this.n && N_BIT) |
			(this.v && V_BIT) |
			(this.b1 && B1_BIT) |
			(this.b2 && B2_BIT) |
			(this.d && D_BIT) |
			(this.i && I_BIT) |
			(this.z && Z_BIT) |
			(this.c && C_BIT)
		);
	}
}
