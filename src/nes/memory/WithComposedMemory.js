import _ from "lodash";

/** A mixin for composed memory handling, with multiple chunks. */
export default {
	/** Applies the mixin. */
	apply(obj) {
		_.defaults(obj, _.omit(this, "apply"));
		obj.chunks = null;
	},

	/** Defines the `chunks` of the memory map. */
	defineChunks(chunks) {
		this.chunks = chunks;
	},

	/** Reads a byte from `address`, using the correct `chunk`. */
	readAt(address) {
		const chunk = this._getChunkFor(address);
		const offset = this._toRelativeAddress(address, chunk);
		return chunk.readAt(offset);
	},

	/** Writes a `byte` to `address`, using the correct `chunk`. */
	writeAt(address, byte) {
		const chunk = this._getChunkFor(address);
		const offset = this._toRelativeAddress(address, chunk);
		return chunk.writeAt(offset, byte);
	},

	_getChunkFor(address) {
		if (!this.chunks) throw new Error("Undefined chunks.");

		for (let chunk of this.chunks) {
			const { startAddress } = chunk;

			if (address >= startAddress && address < startAddress + chunk.size)
				return chunk;
		}

		throw new Error(`Unreachable address: 0x${address.toString(16)}.`);
	},

	_toRelativeAddress(address, chunk) {
		return address - chunk.startAddress;
	}
};
