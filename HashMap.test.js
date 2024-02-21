const { HashMap} = require('./HashMap'); // Import your HashMap implementation


describe('HashMap.resize', () => {
  test('doubles the size of the bucket array and rehashes elements correctly', () => {
    const hashMap = new HashMap(2);
    hashMap.set('key1', 'value1');
    hashMap.set('key2', 'value2');
    
    // Resize the HashMap
    hashMap.resize();

    // Assert the size of the bucket array
    expect(hashMap.bucketArray.length).toBe(4); // Initial size * 2

    // Assert that all key-value pairs are still present
    expect(hashMap.get('key1')).toBe('value1');
    expect(hashMap.get('key2')).toBe('value2');
  });

  // Add more tests for other scenarios...
});