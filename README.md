# Gym Pass API

## Functional Requirements
- [x] Should be possible to sign up
- [x] Should be possible to sign in
- [x] Should be possible to fetch the profile of the authenticated user
- [x] Should be possible to fetch the total of check-ins
- [x] Should be possible to fetch the check-ins history
- [x] Should be possible to get the near gym (until 10 kilometers)
- [x] Should be possible to fetch the gym by name
- [x] Should be possible to do a check-in
- [x] Should be possible to validate the check-in of the user
- [x] Should be possible to create a gym

## Business Rules
- [x] The user can't sign up with e-mail already used
- [x] The user can't do check-in more than once in the same day
- [x] The user can't do check-in more than 100m of the gym
- [x] The check-in just can be validate until 20 minutes after were created
- [x] The check-in just can be validate by an administrator
- [x] The gym just can be register by an administrator

## Not Functional Requirements
- [x] The user password should be encrypted
- [x] The data of the application should be storage in PostgreSQL
- [x] Whole the list should be paginated with 20 items per page
- [x] The user should be identified by a JW (JSON Web Token)
