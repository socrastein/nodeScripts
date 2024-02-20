// Pulled from a chat with ChatGPT about how to implement prototyping into factory functions so that each object can share the same core methods.

// Define the factory function
function createPerson(name, age) {
  // Create an object to represent a person
  const person = Object.create(personPrototype);

  // Initialize properties
  person.name = name;
  person.age = age;

  // Return the created person object
  return person;
}

// Define a prototype object with shared methods
const personPrototype = {
  getDetails: function () {
    return `${this.name}, ${this.age} years old`;
  },

  incrementAge: function () {
    this.age++;
  },
};

// Use the factory function to create multiple objects
const person1 = createPerson("Alice", 25);
const person2 = createPerson("Bob", 30);

// Call the methods on the created objects
console.log(person1.getDetails()); // Output: Alice, 25 years old
console.log(person2.getDetails()); // Output: Bob, 30 years old

// Call a method to increment the age
person1.incrementAge();
console.log(person1.getDetails()); // Output: Alice, 26 years old
