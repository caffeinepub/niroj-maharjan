import List "mo:core/List";
import Iter "mo:core/Iter";
import Order "mo:core/Order";

actor {
  type Submission = {
    name : Text;
    email : Text;
    message : Text;
  };

  module Submission {
    public func compare(s1 : Submission, s2 : Submission) : Order.Order {
      Text.compare(s1.email, s2.email);
    };
  };

  let submissions = List.empty<Submission>();

  // Add new contact form submission
  public shared ({ caller }) func submitContactForm(name : Text, email : Text, message : Text) : async () {
    let submission : Submission = { name; email; message };
    submissions.add(submission);
  };

  // Get all contact submissions - sorted by submission order
  public query func getAllContactSubmissions() : async [Submission] {
    submissions.values().toArray();
  };
};
