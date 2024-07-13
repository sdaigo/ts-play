// create a new name to refer to some type:
type UserId = string;

type Document = {
  name: string;
  author?: string; // = string | undefined
};

// Newtype
type Email = string & { readonly __tag: unique symbol };
type City = string & { readonly __tag: unique symbol };

function sendMessage(email: Email) {
  //
}

sendMessage("message"); // Error: Type '"message"' is not assignable to type 'Email'
sendMessage("Tokyo" as City); // Error: Argument of type 'City' is not assignable to parameter of type 'Email'.

// with `as`, cast base type to tagged type
sendMessage("john@example.com" as Email); // Ok
