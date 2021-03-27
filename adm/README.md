# Adm Game Tracker

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Some considerations

  1. According to the price validation rule, it would not be possible to add any offer that was free.
Thus, it was necessary to add price validation as its value must be at least one. However, in the mock provided,
there was an offer that was free, causing some confusion for the user.

  2. Ideally, if an external service were used (instead of a mock one), price values ​​should be typed as
numbers. Thus, the conversion from number to string would be up to the front.
