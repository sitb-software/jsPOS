/**
 * @author Sean sean.snow@live.com
 * @date 2015/12/25
 */

class ISOComponent {

    /**
     * Set a field within this message
     * @param c - a component
     */
    set(c) {
    }

    /**
     * valid on Leafs only.
     * The value returned is used by ISOMsg as a key
     * to this field.
     *
     * @return object representing the field number
     */
    getKey() {
    }

    /**
     * valid on Leafs only.
     * @return object representing the field value
     */
    getValue() {
    }

    setValue(value) {
    }

    unset(fldno:Number) {
    }

    /**
     * get Value as bytes (when possible)
     * @return Array byte[] representing this field
     */
    getBytes() {
    }

    pack():Array {
    }

    unpack(b:Array):Number {
    }

    setFieldNumber(fieldNumber:Number) {
    }

    getFieldNumber():Number {
    }

    /**
     * In order to interchange <b>Composites</b> and <b>Leafs</b> we use
     * getComposite(). A <b>Composite component</b> returns itself and
     * a Leaf returns null. The base class ISOComponent provides
     * <b>Leaf</b> functionality.
     *
     * @return ISOComponent
     */
    getComposite():ISOComponent {
        return null;
    }

    /**
     * dummy behaviour - return 0 elements Hashtable
     * @return Object children (in this case 0 children)
     */
    getChildren():Object {
        return {};
    }

    /**
     * a Composite must override this function
     * @return Number the max field number associated with this message
     */
    getMaxField():Number {
        return 0;
    }


}

export default ISOComponent;