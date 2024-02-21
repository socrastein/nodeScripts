const { HashMap } = require("./HashMap"); // Import your HashMap implementation

describe("HashMap.resize", () => {
  test("doubles the size of the bucket array and rehashes elements correctly", () => {
    const hashMap = new HashMap(4);
    hashMap.set("key1", "value1");
    hashMap.set("key2", "value2");

    // Resize the HashMap
    hashMap.resize();

    // Assert the size of the bucket array
    expect(hashMap.bucketArray.length).toBe(8); // Initial size * 2

    // Assert that all key-value pairs are still present
    expect(hashMap.get("key1")).toBe("value1");
    expect(hashMap.get("key2")).toBe("value2");
  });

  test("checks load factor and resizes when needed", () => {
    const hashMap = new HashMap(10);
    hashMap.set("key1", "value1");
    hashMap.set("key2", "value2");
    hashMap.set("key3", "value3");
    hashMap.set("key4", "value4");
    hashMap.set("key5", "value5");
    hashMap.set("key6", "value6");
    hashMap.set("key7", "value7");

    expect(hashMap.bucketArray.length).toBe(10);

    hashMap.set("key8", "value8");

    expect(hashMap.bucketArray.length).toBe(20);
  });

  
});
