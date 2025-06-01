// src/lib/supabase.ts - Updated signUp function

export async function signUp(email: string, password: string) {
  try {
    console.log("Starting signup process for:", email);
    
    // First try to sign in directly in case user already exists
    const { data: existingUser, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    // If sign in succeeds, user already exists and is now signed in
    if (existingUser?.user) {
      console.log("User already exists and is now signed in");
      return existingUser;
    }
    
    // If user doesn't exist, create a new account with disabled email confirmation
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        // IMPORTANT: These settings disable email confirmation
        emailRedirectTo: undefined,
        data: {
          email_confirmed: true, // Mark email as confirmed
          payment_confirmed: false, // Initialize payment status
          signup_completed: false // Will be set to true after payment
        }
      }
    });
    
    if (error) {
      console.error("Signup error:", error.message);
      throw error;
    }
    
    // Add a delay before attempting to sign in
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // After signup, explicitly sign in the user
    const { data: signInData, error: autoSignInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (autoSignInError) {
      console.error("Auto sign-in error:", autoSignInError.message);
      
      // Try one more time with a longer delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const { data: retrySignInData, error: retryError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (retryError) {
        console.error("Retry sign-in error:", retryError.message);
        throw new Error('Account created but failed to sign in automatically. Please try signing in manually.');
      }
      
      return retrySignInData;
    }
    
    console.log("User created and signed in successfully");
    return signInData;
  } catch (err) {
    console.error("Signup process error:", err);
    throw err;
  }
}
