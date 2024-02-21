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

  test("add values and verifies number of entries then subtracts values and reverifies", () => {
    const hashMap = new HashMap(10);
    hashMap.set("key1", "value1");
    hashMap.set("key2", "value2");
    hashMap.set("key3", "value3");
    hashMap.set("key4", "value4");
    hashMap.set("key5", "value5");
    hashMap.set("key6", "value6");
    hashMap.set("key7", "value7");

    expect(hashMap.entries().length).toBe(7);

    hashMap.remove("key1");
    hashMap.remove("key2");

    expect(hashMap.entries().length).toBe(5);
    expect(hashMap.has("key1")).toBe(false);
    expect(hashMap.has("key2")).toBe(false);
    expect(hashMap.has("key3")).toBe(true);
  });

  test("check that keys function returns the correct keys", () => {
    const hashMap = new HashMap(10);
    hashMap.set("key1", "value1");
    hashMap.set("key2", "value2");
    hashMap.set("key3", "value3");

    const sorted = hashMap.keys().sort();
    expect(sorted).toEqual(["key1", "key2", "key3"]);
  });

  test("check that values function returns the correct values", () => {
    const hashMap = new HashMap();
    hashMap.set("key1", "value1");
    hashMap.set("key2", "value2");
    hashMap.set("key3", "value3");

    const sorted = hashMap.values().sort();
    expect(sorted).toEqual(["value1", "value2", "value3"]);
  });
});
