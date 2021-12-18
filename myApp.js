Onrequire('dotenv').config();
let mongoose = require("mongoose");

// connection to mongodb
// mongoose.connect(process.env.MONGO_URI, { useNewURLParser: true, useUnifiedTopology: true })

// mongoos schema
const Schema = mongoose.Schema;

// person schema
const personSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
})

// Person schema model
const Person = mongoose.model("Person", personSchema);

const createAndSavePerson = (done) => {
  const SilverFox = new Person({ name: "Silver Fox", age: 43, favoriteFoods: ["chocolate", "root beer", "french fries"] });
  SilverFox.save((err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
};

const arrayOfPeople = [{ name: "Roberto Joven", age: 46, favoriteFoods: ["thai", "italian", "ice cream"] },
{ name: "Wild Bill", age: 17, favoriteFoods: ["thai", "indian", "milk shake"] },
{ name: "Brig Young", age: 15, favoriteFoods: ["chicken", "string cheese", "chets"] }];

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, personFound) => {
    if (err) return console.error(err);
    done(null, personFound);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
};

const findPersonById = (personId, done) => {
  Person.findById({ _id: personId }, (err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  Person.findById(personId, (err, person) => {
    if (err) console.error(err);
    person.favoriteFoods.push(foodToAdd);
    person.save((err, updatedPerson) => {
      if (err) return console.error(err)
      done(null, updatedPerson)
    });
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({ name: personName }, { age: ageToSet }, { new: true }, (err, updatedDoc) => {
    if (err) console.error(err);
    done(null, updatedDoc);
  });
};

const removeById = (personId, done) => {
  Person.removeById({ _id: personId }, (err, data) => {
    if (err) console.error(err);
    done(null, data);
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({ name: nameToRemove }, (err, response) => {
    if (err) console.error(err)
    done(null, response);
  })
};


// sort: 1 for ascending	order and -1 for descending order.
// select: 0 means false and thus hide name property; 1 means true so age property will show.
const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({ favoriteFoods: foodToSearch }).sort({ name: 1 }).limit(2).select({ age: 0 }).exec((err, docs) => {
    if (err) console.error(err);
    done(null, docs);
  });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
