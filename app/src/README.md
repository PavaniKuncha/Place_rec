# Development Log

## Backend related
### TODO
- endpoints for feteching question
- endpoints for pushing users answers
  
### Known issues
- Expo Go in iOS doesn't support http for requests; need to use https


## Frontend related
### Note

### TODO
- Fix cases when network connection is unstable (axios catech error: Network error). 
- 
- Login: email addr w/ correct password won't work if some characters in email addr are upper case.
- revise UI designs
- highlight selected choices for multiple choices; highlight previous question's choices
- make answer choices into bubbles?
- highlight `submit` button
- ...
- Delete user information after logout? SecureStore.deleteItemAsync(key, options)

### Known issues
- compoent `components/Sliders` doesn't work as intended. Multiple problems are using the same sliders. Need to find a way to render sliders for each question and record the value.
- ...
