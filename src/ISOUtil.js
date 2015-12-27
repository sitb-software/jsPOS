/**
 * ISO 工具类
 * @author Sean sean.snow@live.com
 * @date 2015/12/24
 */
import BitSet from 'jsdk/util/BitSet';
import { Character } from 'jsdk';

let hexStrings = new Array(256);
for (let i = 0; i < 256; i++) {
    let d = '';
    let ch = Character.forDigit(i >> 4 & 0x0F, 16);
    d += ch.toUpperCase();
    ch = Character.forDigit(i & 0x0F, 16);
    d += ch.toUpperCase();
    hexStrings[i] = d;
}

class ISOUtil {

    /**
     * 16 进制字符串转化为2进制数组
     * @param msg 16 进制字符串
     * @returns {Array} 二进制数组
     */
    static hex2byte(msg:String) {
        let result = [];

        let length = msg.length;
        if (length % 2 != 0) {
            console.error('error hex string.');
            return null;
        }

        let pos = 0;
        length /= 2;

        for (let i = 0; i < length; i++) {
            let byteStr = msg.substr(pos, 2);
            result.push(parseInt(byteStr, 16));
            pos += 2;
        }

        return result;
    }

    /**
     * 转换一个字节数组为十六进制字符串
     * @param msg 二进制数组
     * @returns {string} 十六进制字符串
     */
    static hexString(msg:Array) {
        let result = '';
        msg.forEach(aB => {
            result += hexStrings[parseInt(aB & 0xFF)];
        });
        return result;
    }

    /**
     * converts to BCD
     * @param s - the number
     * @param padLeft - flag indicating left/right padding
     * @param d copy data to d
     * @param offset Where to start copying into.
     * @return Array BCD representation of the number
     */
    static str2bcd(s:String, padLeft:Boolean, d:Array, offset:Number) {
        let len = s.length;
        let start = (len & 1) === 1 && padLeft ? 1 : 0;
        for (let i = start; i < len + start; i++) {
            d[offset + (i >> 1)] |= s.charAt(i - start) - '0' << ((i & 1) === 1 ? 0 : 4);
        }
        return d;
    }

    /**
     * converts a BCD representation of a number to a String
     * @param b - BCD representation
     * @param offset - starting offset
     * @param len - BCD field len
     * @param padLeft - was padLeft packed?
     * @return the String representation of the number
     */
    static bcd2str(b:Array, offset:Number, len:Number, padLeft:Boolean):String {
        let d = '';
        let start = (len & 1) == 1 && padLeft ? 1 : 0;
        for (let i = start; i < len + start; i++) {
            let shift = (i & 1) == 1 ? 0 : 4;
            let c = Character.forDigit(b[offset + (i >> 1)] >> shift & 0x0F, 16);
            if (c === 'd') {
                c = '=';
            }
            d += c;
        }
        return d.toString();
    }

    static str2bytes(str:String):Array {
        let ch, st, re = [];
        for (let i = 0; i < str.length; i++) {
            ch = str.charCodeAt(i);
            st = [];
            do {
                st.push(ch & 0xFF);
                ch = ch >> 8;
            } while (ch);
            re = re.concat(st.reverse());
        }

        return re;
    }

    static byte2str(byte:Array, offset:Number, length:Number):String {
        let result = '';
        for (let i = offset; i < offset + length; i++) {
            result += String.fromCharCode(byte[i]);
        }

        return result;
    }

    static bitSet2byte(b:BitSet, bytes:Number):Array {
        let len = bytes * 8;

        let d = new Array(bytes);
        for (let i = 0; i < len; i++) {
            if (b.get(i + 1)) {
                d[i >> 3] |= 0x80 >> i % 8;
            }
        }
        if (len > 64) {
            d[0] |= 0x80;
        }
        if (len > 128) {
            d[8] |= 0x80;
        }
        return d;
    }

    static byte2BitSet(b:Array, offset:Number, maxBits:Number):BitSet {
        let len = maxBits > 64 ? (b[offset] & 0x80) === 0x80 ? 128 : 64 : maxBits;
        if (maxBits > 128 && b.length > offset + 8 && (b[offset + 8] & 0x80) === 0x80) {
            len = 192;
        }
        let bmap = new BitSet(len);
        for (let i = 0; i < len; i++) {
            if ((b[offset + (i >> 3)] & 0x80 >> i % 8) > 0) {
                bmap.set(i + 1);
            }
        }
        return bmap;
    }

    /**
     * pad to the left
     * @param s - original string
     * @param len - desired len
     * @param c - padding char
     * @return String padded string
     */
    static padleft(s:String, len:Number, c:String):String {
        s = s.trim();
        if (s.length > len) {
            throw Error(`invalid len ${s.length} / ${len}`);
        }
        let d = '';
        let fill = len - s.length;
        while (fill-- > 0) {
            d += c;
        }
        d += s;
        return d;
    }

    static zeropad(s:String, len:Number):String {
        return ISOUtil.padleft(s, len, '0');
    }

}


export default ISOUtil;