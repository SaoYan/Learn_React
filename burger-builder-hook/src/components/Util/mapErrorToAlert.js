export const authenticationErrorAlert = (error) => {
    switch (error.message) {
        /**
         * Sign-up
         */
        case "EMAIL_EXISTS":
            alert("The email address is already in use by another account.");
            break;
        case "TOO_MANY_ATTEMPTS_TRY_LATER":
            alert("We have blocked all requests from this device due to unusual activity. Try again later.");
            break;
        /**
         * Sign-in
         */
        case "INVALID_PASSWORD":
            alert("Incorrect password.");
            break;
        case "USER_DISABLED":
            alert("The user account has been disabled by an administrator.");
            break;
        /**
         * Refresh token
         */
        case "TOKEN_EXPIRED":
            alert("Session expired. Please sign in again.");
            break;
        case "USER_NOT_FOUND":
            alert("User not found. It is likely the user was deleted.");
            break;
        /**
         * Mixed cases
         */
        case "EMAIL_NOT_FOUND": // sign-in; reset password
            alert("No account found for this email.");
            break;
        default:
            alert(error.message);
    }
};

export const dataErrorAlert = (error) => {
    switch (error.message) {
        case "Unauthorized":
            alert("Unauthorized user.\nYou are not logged in or your session has expired.\nTry reloading the page.");
            break;
        default:
            alert(error.message);
    }
};