public class HelloWorld {
  public static void main(String[] args) {
    System.out.println("1c0d");
    byte[] b = "1c0d".getBytes();
    System.out.println("bytes: " + b);
    for (int i = 0; i < b.length; i++) {
      System.out.println("b[i]: " + b[i]);
    }

    int len = 2;
    int lenLen = 0;
    int offset = 0;
    byte[] data = uninterpret(b, offset + lenLen, len);
    System.out.println("data: " + data);
    System.out.println("data.length(): " + data.length);
    System.out.println("data[0]: " + data[0]);
    System.out.println("data[1]: " + data[1]);
    // c.setValue(data);
    System.out.println("lenLen + (len * 2): " + lenLen + (len * 2));
    //    return lenLen + (len * 2);

    // byte[] data = c.getBytes();
    // int packedLength = prefixer.getPackedLength();
    int packedLength = 0;
    byte[] ret = new byte[(data.length * 2) + packedLength];
    System.out.println("ret: " + ret);
    interpret(data, ret, packedLength);
    for (int i = 0; i < ret.length; i++) {
      System.out.println("ret[i]: " + ret[i]);
    }
    // return ret;
    System.out.println("ret: " + ret);

  }

  /** 0-15 to ASCII hex digit lookup table. */
  private static final byte[] HEX_ASCII = new byte[] {
    0x30, 0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37,
    0x38, 0x39, 0x41, 0x42, 0x43, 0x44, 0x45, 0x46
  };

  /**
   * Converts the binary data into ASCII hex digits.
   */
  public static void interpret(byte[] data, byte[] b, int offset) {
    //System.out.println("data: " + data);
    //System.out.println("b: " + b);
    //System.out.println("offset: " + offset);
    for (int i = 0; i < data.length; i++) {
      System.out.println("i: " + i);
      //System.out.println("offset + i * 2: " + offset + i * 2);

      //System.out.println("data[i]: " + data[i]);
      //System.out.println("(data[i] & 0xF0): " + (data[i] & 0xF0));
      //System.out.println("(data[i] & 0xF0) >> 4: " + ((data[i] & 0xF0) >> 4));
      //System.out.println("HEX_ASCII[(data[i] & 0xF0) >> 4]: " + HEX_ASCII[(data[i] & 0xF0) >> 4]);
      //System.out.println("b[offset + i * 2]: " + b[offset + i * 2]);
      b[offset + i * 2] = HEX_ASCII[(data[i] & 0xF0) >> 4];
      System.out.println("b[offset + i * 2]: " + b[offset + i * 2]);

      System.out.println("data[i] & 0x0F: " + (data[i] & 0x0F));
      System.out.println("HEX_ASCII[data[i] & 0x0F]: " + HEX_ASCII[data[i] & 0x0F]);

      System.out.println("b[offset + i * 2 + 1]: " + b[offset + i * 2 + 1]);
      b[offset + i * 2 + 1] = HEX_ASCII[data[i] & 0x0F];

      System.out.println("b[offset + i * 2 + 1]: " + b[offset + i * 2 + 1]);
    }
  }

  /**
   * Converts the ASCII hex digits into binary data.
   */
  public static byte[] uninterpret(byte[] rawData, int offset, int length) {
    // System.out.println("rawData: " + rawData);
    // System.out.println("offset: " + offset);
    // System.out.println("length: " + length);

    byte[] d = new byte[length];
    for (int i = 0; i < length * 2; i++) {
      System.out.println("i: " + i);
      int shift = i % 2 == 1 ? 0 : 4;
      // System.out.println("shift: " + shift);
      // System.out.println("rawData[offset + i]: " + rawData[offset + i]);
      // System.out.println("(char)rawData[offset + i]: " + (char) rawData[offset + i]);
      System.out.println("Character.digit((char)rawData[offset + i], 16): " + Character.digit((char) rawData[offset + i], 16));
      System.out.println("Character.digit((char)rawData[offset + i], 16) << shift: " + (Character.digit((char) rawData[offset + i], 16) << shift));
      //System.out.println("d[i >> 1]: " + d[i >> 1]);
      d[i >> 1] |= Character.digit((char) rawData[offset + i], 16) << shift;
      System.out.println("d[i >> 1]: " + d[i >> 1]);
    }

    return d;
  }
}