# Privilege Escalation

The example demonstrates a privilege escalation vulnerability and how to exploit it.

## Steps to reproduce

1. Install all dependencies

   `$ npm install`

2. Start the **insecure.ts** server

   `$ npx ts-node insecure.ts`

3. In the browser, send a GET request

    ```
        http://localhost:3000/send-form
    ```

4. Try different UserIds and see which one gives you authorized access to change the role of that user.

## For you to do

Answer the following:

1. Briefly explain the potential vulnerabilities in **insecure.ts**

Ans:

The potential vulnerabilities in insecure.ts for Privilege Escalation are:  
Insecure Authentication: The authentication mechanism is simulated and not properly implemented, allowing any user to potentially bypass authentication checks.  
Insecure Authorization: The authorization check is based on user role but is not securely enforced. An attacker can manipulate the request to escalate privileges.  
Lack of Session Management: There is no session management to track authenticated users, making it easier for attackers to impersonate other users and escalate privileges.  
These vulnerabilities allow a malicious attacker to gain unauthorized access and perform actions that should be restricted to higher-privileged users.

2. Briefly explain how a malicious attacker can exploit them.

Ans:A malicious attacker can exploit the privilege escalation vulnerability in insecure.ts by manipulating the userId parameter in the request to the /update-role endpoint.
Lack of Proper Authentication: The insecure.ts file does not properly authenticate users. It only checks if the user exists in the simulated database, but it does not verify if the user making the request is actually logged in or has the right credentials.  
Insecure Authorization: The authorization check is based on the user's role, but since there is no proper authentication, any user can potentially manipulate the userId parameter to impersonate an admin user.  
Direct Role Update: The code directly updates the user's role without verifying if the request is made by an authenticated admin user. This allows any user to escalate their privileges by sending a request with a different userId and newRole.  
By exploiting these vulnerabilities, an attacker can send a request to the /update-role endpoint with a userId of an admin user and change their own role to admin, thereby gaining unauthorized access to admin functionalities.


3. Briefly explain the defensive techniques used in **secure.ts** to prevent the privilege escalation vulnerability?

Ans:

The defensive techniques used in secure.ts to prevent the privilege escalation vulnerability are:  
Session Management: The secure.ts file uses session management to track authenticated users. This ensures that only logged-in users can perform certain actions.  
Proper Authentication: The code checks if the user is logged in by verifying the session data (req.session.userId). If the user is not authenticated, the request is denied.  
Secure Authorization: The code verifies that the logged-in user has the appropriate role (admin) before allowing them to update user roles. This prevents unauthorized users from performing admin actions.  
Error Handling: The code includes proper error handling to return appropriate status codes and messages for unauthorized or forbidden actions