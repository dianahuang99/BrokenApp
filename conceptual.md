### Conceptual Exercise

Answer the following questions below:

- What are some ways of managing asynchronous code in JavaScript?

  - Using promises is a way to manage asynchronous code
  - Using APIs is also a way to manage asynchronous code

- What is a Promise?

  - a Promise is what you get a from an async function if you don't await it and wait for it to finish.

- What are the differences between an async function and a regular function?

  - regular functions are synchronous and don't wait for something to finish to start the next thing while the code in async functions don't run until each one is done

  - async functions return promises while regular functions just return the value

- What is the difference between Node.js and Express.js?

  - Node.js is a server-side javascript environment and Express.js is a framework that Node.js uses

- What is the error-first callback pattern?

  - when you use a callback function app.use in express, the first parameter is an error

- What is middleware?

  - it is code that runs after the request and before our route

- What does the `next` function do?

  - it lets the function proceed to the next step and it's important to use with middleware or it will just stop at the middleware.

- What are some issues with the following code? (consider all aspects: performance, structure, naming, etc)
  - it's waiting for the first one to come back before sending the second one and it's waiting for the second one to come back before the third one. We should get the promises back first and await them at once.

```js
async function getUsers() {
  const elie = await $.getJSON("https://api.github.com/users/elie");
  const joel = await $.getJSON("https://api.github.com/users/joelburton");
  const matt = await $.getJSON("https://api.github.com/users/mmmaaatttttt");

  return [elie, matt, joel];
}
```
