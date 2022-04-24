// Used to simulate some processing delay
function randomTimeout(fct) {
  const n = Math.floor(Math.random()*3000 + 1000); // random delay between 1s and 4s
  return setTimeout(fct, n);
}

const { addToDict } = require("./rogue2");

// (1) Handle messages coming from the parent process
// NodeJS handle serialization-deserialization for you
// behing the scene to send data from one V8 instance
// to annother one
process.on('message', ([id, str]) => {
  console.log("worker receiving message", [id, str]);

  randomTimeout(() => {
    const result = addToDict(str);
    console.log("worker done processing message", [id, str]);

    // send the result of this request to the parent process
    process.send([id, result]);
  });
});

// (2) Graceful termination uppon parent precess request
process.on('exit', () => {
  console.log("worker exiting");
});
