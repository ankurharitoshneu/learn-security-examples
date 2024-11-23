# Tampering

This example demonstrates information disclosure by injecting malicious query objects to a NoSQL database.

## Steps to reproduce

1. Install all dependencies

   `$ npm install`

2. Insert test data in the MongoDB database. Make sure the mongod is up and running by typing the `mongosh` command in the termainal. If mongod process is up then you will see that the connection was successful. Command to insert test data:

   `$ npx ts-node insert-test-users.ts`

This will create a database in MongoDB called __infodisclosure__. Verify its presence by connecting with mongosh and running the command `show dbs;`.

2. Start the **insecure.ts** server

   `$ npx ts-node insecure.ts`

3. In the browser, pretend to be a hacker and type a malicious request

    ```
        http://localhost:3000/userinfo?username[$ne]=
    ```

4. Do you see user information being displayed despite the malicious request not having a valid username in the request?

## For you to do

Answer the following:

1. Briefly explain the potential vulnerabilities in **insecure.ts**

Ans:

The potential vulnerabilities in insecure.ts related to information disclosure are:  
NoSQL Injection: The code directly uses user-provided values in the MongoDB query without any validation or sanitization. This allows attackers to inject malicious query objects, potentially gaining unauthorized access to sensitive information.  
Lack of Input Validation: The code does not validate the format or content of the username parameter, making it susceptible to injection attacks.  
Error Handling: The code does not handle errors securely, which could lead to information leakage about the database structure or other internal details.

2. Briefly explain how a malicious attacker can exploit them.

Ans:

A malicious attacker can exploit the vulnerabilities in insecure.ts for information disclosure as follows:  
NoSQL Injection: By injecting malicious query objects into the username parameter, an attacker can manipulate the MongoDB query to bypass authentication and retrieve sensitive information. For example, using a query like username[$ne]= can trick the database into returning user information even if the username is not valid.  
Lack of Input Validation: Since the code does not validate the username parameter, an attacker can input specially crafted strings to exploit the query. This can lead to unauthorized access to user data.  
Error Handling: The code does not handle errors securely, which can result in information leakage. Detailed error messages can reveal internal database structure or other sensitive details, aiding the attacker in crafting more effective attacks.

3. Briefly explain the defensive techniques used in **secure.ts** to prevent the information disclosure vulnerability?

Ans:

The defensive techniques used in secure.ts to prevent the information disclosure vulnerability are:  
Input Validation: The code ensures that the username parameter is a string before using it in the query. This prevents invalid data types from being processed.  
Sanitization: The code sanitizes the username input by removing non-alphanumeric characters. This helps prevent NoSQL injection attacks.  
Error Handling: The code includes proper error handling to avoid leaking sensitive information. It logs errors internally and returns a generic error message to the client.  
These techniques collectively help in securing the application against information disclosure vulnerabilities.