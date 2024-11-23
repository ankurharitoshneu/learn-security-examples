# Tampering

This example demonstrates tampering through script injection.

## Steps to reproduce

1. Install all dependencies

   `npm install`

2. Start the **insecure.ts** server

   `npx ts-node insecure.ts`

3. In the browser, type a potentially malicious script in the name field of the form

    ```
        <script> document.body.innerHTML = "<a href='https://google.com'> Gotcha </a>"</script>
    ```

4. Do you see the potentially malicious hyperlink being injected into the form?

## For you to do

Answer the following:

1. Briefly explain the potential vulnerabilities in **insecure.ts**

Ans:

The potential vulnerabilities in insecure.ts for tampering are:  
Lack of Input Sanitization: The application does not sanitize user input, making it vulnerable to script injection attacks. An attacker can inject malicious scripts into the form fields, which can then be executed in the user's browser.  
Insecure Cookie Configuration: The session cookie is configured with httpOnly: false, making it accessible via JavaScript. This can lead to session hijacking if an attacker can inject and execute malicious scripts.  
Predictable Secret: The session secret is hardcoded, making it easier for attackers to guess and potentially hijack sessions.

2. Briefly explain how a malicious attacker can exploit them.

Ans:

A malicious attacker can exploit the vulnerabilities in insecure.ts through the following steps:  
Cross-Site Scripting (XSS): The attacker can inject malicious scripts into the application by submitting a script in the name field of the form. Since the input is not sanitized, the script will be executed by the browser, potentially leading to data theft, session hijacking, or other malicious activities.  
Session Hijacking: The session cookie is not set to httpOnly in insecure.ts, making it accessible via client-side scripts. An attacker can steal the session cookie using XSS and impersonate the user.  
Session Fixation: The session is not regenerated upon login, allowing an attacker to set a session ID before the user logs in. The attacker can then use the same session ID to hijack the user's session.

3. Briefly explain why **secure.ts** does not have the same vulnerabilties?

Ans:

secure.ts does not have the same vulnerabilities as insecure.ts due to the following reasons:  
Input Sanitization: The escapeHTML function is used to sanitize user input, preventing Cross-Site Scripting (XSS) attacks by escaping HTML special characters.  
Secure Cookie Configuration: The session cookie is configured with httpOnly: true and sameSite: 'strict', making it inaccessible via client-side scripts and reducing the risk of session hijacking.  
Dynamic Secret: The session secret is passed as an argument, making it less predictable and harder for attackers to guess, thereby enhancing session security.