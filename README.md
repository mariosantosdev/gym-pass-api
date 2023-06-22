# Gym Pass API

This project was built following the bootcamp [Ignite 2023](https://rocketseat.com.br/ignite) in the chapter of NodeJS.

## Functional Requirements
- [ ] Should be possible to sign up
- [ ] Should be possible to sign in
- [ ] Should be possible to fetch the profile of the authenticated user
- [ ] Should be possible to fetch the total of check-ins
- [ ] Should be possible to fetch the check-ins historical
- [ ] Should be possible to get the near gym
- [ ] Should be possible to fetch the gym by name
- [ ] Should be possible to do a check-in
- [ ] Should be possible to validate the check-in of the user
- [ ] Should be possible to create a gym

## Business Rules
- [ ] The user can't sign up with e-mail already used
- [ ] The user can't do check-in more than once in the same day
- [ ] The user can't do check-in more than 100m of the gym
- [ ] The check-in just can be validate until 20 minutes after were created
- [ ] The check-in just can be validate by an administrator
- [ ] The gym just can be register by an administrator

## Not Functional Requirements
- [ ] The user password should be encrypted
- [ ] The data of the application should be storage in PostgreSQL
- [ ] Whole the list should be paginated with 20 items per page
- [ ] The user should be identified by a JW (JSON Web Token)