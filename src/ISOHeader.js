/**
 * @author Sean sean.snow@live.com
 * @date 2015/12/25
 */


class ISOHeader {

    /**
     * Return this header as byte array.
     */
    pack():Array {
    }

    /**
     * Create a new ISOHeader from a byte array.
     *
     * @return Number The Number of bytes consumed.
     */
    unpack(b:Array):Number {
    }

    /**
     * Set the Destination address in this ISOHeader.
     */
    setDestination(dst:String) {
    }

    /**
     * Return the destination address in this ISOHeader.
     * returns null if there is no destination address
     */
    getDestination():String {
    }

    /**
     * Set the Source address in this ISOHeader.
     */
    setSource(src:String) {
    }

    /**
     * Return the source address in this ISOHeader.
     * returns null if there is no source address
     */
    getSource():String {
    }

    /**
     * return the number of bytes in this ISOHeader
     */
    getLength():Number {
    }

    /**
     * Swap the source and destination addresses in this ISOHeader
     * (if they exist).
     */
    swapDirection() {
    };

    /**
     * Allow object to be cloned.
     */
    clone() {
    };

}

export default ISOHeader;