/**
 * Implementations convert Strings into byte arrays and vice versa.
 * @author Sean sean.snow@live.com
 * @date 2015/12/24
 */
class Interpreter {

    /**
     * Converts the string data into a different interpretation. Standard
     * interpretations are ASCII, EBCDIC, BCD and LITERAL.
     *
     * @param data
     * @param byte
     * @param offset
     */
    interpret(data:String, byte:Array, offset:Number) {
    }

    /**
     * Converts the byte array into a String. This reverses the interpret
     * method.
     *
     * @param rawData
     *            The interpreted data.
     * @param offset
     *            The index in rawData to start interpreting at.
     * @param length
     *            The number of data units to interpret.
     * @return String The uninterpreted data.
     */
    uninterpret(rawData:Array, offset:Number, length:Number):String {
    }

    /**
     * Returns the number of bytes required to interpret a String of length
     * nDataUnits.
     */
    getPackedLength(nDataUnits:Number):Number {
    }
}

export default Interpreter;