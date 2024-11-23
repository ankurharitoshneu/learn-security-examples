# Spoofing

This example demonstrates spoofind through two ways -- Stealing cookies programmatically and cross site request forgery (CSRF).

## Steps to reproduce the vulnerability

1. Install dependencies

   `$ npx install`

2. Start the **insecure.ts** server

   `npx ts-node insecure.ts`

3. Start the malicious server **mal.ts**

   `npx ts-node mal.ts`

4. Open __http://localhost:8000__ in a browser, type a name and Submit.

5. Open the __Application__ tab in the Browser's inspect pane. Find the __Cookies__ under __Storage__. You should see a __connect.sid__ cookie being set.

6. Open the HTML file __mal-steal-cookie.html__ file in the same browser (different tab). Open inspect and view the console.

7. Click the link in the HTML file. Do you see the cookie being stolen in the console?

8. Open the HTML file __mal-csrf.html__ file in the same browser (different tab). What do you see if the user has not logged out of **insecure.ts**? What do you see if the user has logged out?


## For you to answer

1. Briefly explain the spoofing vulnerability in **insecure.ts**.

Ans:

The spoofing vulnerability in insecure.ts arises from the following issues:
Insecure Cookie Configuration: The session cookie is configured with httpOnly: false, which makes it accessible via JavaScript, allowing potential theft through XSS attacks.
Lack of CSRF Protection: The application does not implement any CSRF protection mechanisms, making it vulnerable to CSRF attacks where an attacker can trick a logged-in user into performing unwanted actions.
Predictable Secret: The session secret is hardcoded ("SOMESECRET"), making it easier for attackers to guess and potentially hijack sessions.

2. Briefly explain different ways in which vulnerability can be exploited.

Ans:

The vulnerabilities in insecure.ts can be exploited in the following ways:  
Cookie Theft via XSS: Since the session cookie is configured with httpOnly: false, it can be accessed via JavaScript. An attacker can inject malicious scripts into the application (e.g., through an XSS attack) to steal the session cookie and hijack the user's session.  
Cross-Site Request Forgery (CSRF): The lack of CSRF protection allows attackers to trick authenticated users into making unwanted requests to the application. For example, an attacker can create a malicious website that sends a request to the /sensitive endpoint, performing actions on behalf of the user without their consent.  
Session Hijacking via Predictable Secret: The hardcoded session secret ("SOMESECRET") makes it easier for attackers to guess the secret and hijack sessions. This can lead to unauthorized access to sensitive operations within the application.


3. Briefly explain why **secure.ts** does not have the spoofing vulnerability in **insecure.ts**.

Ans:

secure.ts does not have the spoofing vulnerability present in insecure.ts due to the following improvements:
Secure Cookie Configuration: The session cookie is configured with httpOnly: true and sameSite: true, which prevents JavaScript access and mitigates CSRF attacks.
Dynamic Secret: The session secret is passed as a command-line argument (process.argv[2]), making it less predictable and harder for attackers to guess.
CSRF Protection: The sameSite: true cookie attribute helps protect against CSRF attacks by ensuring that cookies are only sent with same-site requests.