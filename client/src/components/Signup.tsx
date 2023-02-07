import React from 'react'
import { TextField, Box, Button } from '@mui/material';
import { useState } from 'react';

function Signup() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>('');
  const [signedUp, setSignedup] = useState<boolean>(false);
  const [errors, setErrors] = useState<string>('');

  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    setSignedup(false);
    setErrors('');
    fetch('/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
        password_confirmation: passwordConfirmation,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data['errors']) {
          setErrors(data['errors']);
        } else {
          setSignedup(true);
        }
      });
  }

  return (
    <div className="app">
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <TextField
          label="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          label="confirm password"
          type="password"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
        />
        <Button className="button" variant="contained" type="submit">
          Sign me up!
        </Button>
      </Box>
      {signedUp && (
        <div>
          <p>You did it! Now you can login.</p>
        </div>
      )}
      {errors[0] === 'Username has already been taken' && (
        <div>
          <p>Sorry, that name is taken. Please pick a different one.</p>
        </div>
      )}

      {errors[0] === "Password confirmation doesn't match Password" && (
        <div>
          <p>
            Sorry, it seems you mistyped when you confirmed your password.
            Please try again.
          </p>
        </div>
      )}
    </div>
  );
}

export default Signup;
