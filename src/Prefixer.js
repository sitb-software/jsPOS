/**
 * @author Sean sean.snow@live.com
 * @date 2015/12/24
 */


class Prefixer {
    /**
     * Fills a byte array with the field length data in raw form.
     *
     * @param length
     *            The length to be encoded.
     * @param b
     *            The byte array to fill with the encoded length.
     */
    encodeLength(length:Number, b:Array) {
    }

    /**
     * Decodes an encoded length.
     *
     * @param b
     *            The byte array to scan for the length.
     * @param offset
     *            The offset to start scanning from.
     * @return The length in chars of the field data to follow this
     *         LengthPrefix.
     */
    decodeLength(b:Array, offset:Number):Number {
    }

    /**
     * Returns the number of bytes taken up by the length encoding.
     */
    getPackedLength():Number {
    }
}

export default Prefixer;