/**
 * @author Sean sean.snow@live.com
 * @date 2015/12/24
 */
import Prefixer from './Prefixer';

class NullPrefixer extends Prefixer {

    encodeLength(length, b) {
    }

    /**
     * Returns -1 meaning there is no length field.
     *
     */
    decodeLength(b, offset) {
        return -1;
    }

    /**
     */
    getPackedLength() {
        return 0;
    }
}

export default new NullPrefixer();