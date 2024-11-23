# Repudiation

The example demonstrates a vulnerability that can lead to repudiation by malicious users attempting to access the services provided by a server.

## Steps to reproduce

1. Install all dependencies

   `$ npm install`

2. Run the server __insecure.ts__.

3. Pretend to be a malicous user and interact with the services by sending requests from the browser.

4. Do you think your actions can be repudiated?

## For you to do

1. Briefly explain the vulnerability.

Ans:

The vulnerability of repudiation occurs when a system does not have sufficient logging and authentication mechanisms to track and verify user actions. This allows malicious users to deny their actions or claim that they did not perform certain operations. In the context of the provided `insecure.ts` file, the lack of authentication and logging means that any user can send messages or retrieve messages without any accountability, making it impossible to trace actions back to specific users.

2. Briefly explain why the vulnerability is addressed in __secure.ts__.

Ans:

The vulnerability is addressed in secure.ts due to the following reasons:  
Logging: The secure.ts file includes middleware for logging requests and actions, which helps in tracking user activities and provides an audit trail. This makes it difficult for users to deny their actions.  
Authentication: The secure.ts file includes a placeholder for user authentication mechanisms, ensuring that only authenticated users can send and retrieve messages. This prevents unauthorized access and ensures accountability.  
Error Handling: The secure.ts file includes error handling middleware that logs errors, providing additional information for tracing and accountability.

3. Which design pattern is used in the secure version to address the vulnerability? Briefly explain how it works?

Ans:

The design pattern used in the secure version to address the vulnerability is the Middleware pattern.  
Explanation:
The Middleware pattern is used to handle various aspects of request processing in a modular and reusable way. In the context of secure.ts, middleware functions are used to:  
Logging: Middleware logs each request and action, providing an audit trail that helps in tracking user activities and ensuring accountability.
Authentication: Middleware can be used to enforce authentication, ensuring that only authenticated users can access certain routes and perform specific actions.
Error Handling: Middleware handles errors and logs them, providing additional information for tracing and accountability.
By using middleware, the application can ensure that these concerns are addressed consistently across all routes, enhancing security and maintainability.