function handleFirebaseError(error) {
  let errorMessage = "An unknown error occurred";

  if (error.code) {
    const errorMessages = {
      "auth/invalid-email": "The email address is not valid.",
      "auth/user-disabled": "The user account has been disabled.",
      "auth/user-not-found": "No user found with this email.",
      "auth/wrong-password": "The password is incorrect.",
      "auth/email-already-in-use": "The email address is already in use.",
      "auth/weak-password": "The password is too weak.",
      "auth/operation-not-allowed": "This operation is not allowed.",
      "auth/invalid-credential": "The credential is invalid.",
    };

    errorMessage = errorMessages[error.code] || error.message || errorMessage;
  }

  return errorMessage;
}

module.exports = handleFirebaseError;
