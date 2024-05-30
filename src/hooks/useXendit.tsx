// Here is how the Xendit payment processing works

// 1. Submit the form (useCartForm >> submitToXendit),
// 2. Process the form data (submitToXendit)
// 3. Send the data to Xendit to create a token (xenditCreateToken)
// 4. Wait for Xendit to respond with IN_REVIEW (xenditResponseHandler)
// 5. setPayerAuthUrl (useXenditStore)
// 6. Show the 3DS modal
// 7. Wait for Xendit to respond with VERIFIED (xenditResposnseHandler)
// 8. Close the modal and setToken (xenditResponseHandler, useXenditStore)
// 9. When token is set (useFetchPatmentData >> useEffect)
// 10. confirmXenditPyment
// 11. sendBookingConfirmation
// 12. createReservation
// 13. On success setPaymentSuccess, setToken to null
// 14. Redirect to success page
