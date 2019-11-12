const graphql = require("graphql");
const Person = require("../models/person");
const { PubSub } = require("graphql-subscriptions");

const _ = require("lodash");

const pubsub = new PubSub();

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = graphql;

const PersonType = new GraphQLObjectType({
  name: "Person",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    checkin: { type: GraphQLString },
    checkout: { type: GraphQLString }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    person: {
      type: PersonType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Person.findById(args.id);
      }
    },
    people: {
      type: new GraphQLList(PersonType),
      resolve(parent, args) {
        return Person.find({});
      }
    }
  }
});

const Subscription = new GraphQLObjectType({
  name: "Subscription",
  fields: {
    addPerson: {
      type: PersonType,
      subscribe() {
        console.log("subscribe da subrciptiosn");
        return pubsub.asyncIterator("added_person");
      },
      resolve(payload) {
        return payload;
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addPerson: {
      type: PersonType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: GraphQLInt },
        checkin: { type: new GraphQLNonNull(GraphQLString) },
        checkout: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        let person = new Person({
          name: args.name,
          age: args.age,
          checkin: args.checkin,
          checkout: args.checkout
        });
        pubsub.publish("added_person", { somethingChanged: { ...person } });
        return person.save();
      }
    },
    updatePerson: {
      type: PersonType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
        checkin: { type: new GraphQLNonNull(GraphQLString) },
        checkout: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        return Person.findByIdAndUpdate(args.id, {
          $set: {
            name: args.name,
            age: args.age,
            checkin: args.checkin,
            checkout: args.checkout
          }
        }).exec();
      }
    },
    deletePerson: {
      type: PersonType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        return Person.findByIdAndRemove(args.id);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
  subscription: Subscription
});
