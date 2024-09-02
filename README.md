# Weather App

This is a weather forecast application built with Angular 18.2.1 and Angular Material. The app allows users to get current weather conditions and a 5-day weather forecast for their location or any searched city. The app integrates with the [OpenWeatherMap API](https://openweathermap.org/api) to fetch weather data.

## Features

- **Search by City:** Users can search for any city by name and get its current weather and 5-day forecast.
- **Favorite Cities:** Users can save a list of favorite cities and quickly view their weather data.
- **Responsive Design:** The app is responsive and works on both desktop and mobile devices.
- **Error Handling:** Proper error handling is implemented for invalid city names and failed API requests.

### Bonus Features

- **Get Weather by Location:** Users can view the current weather and a 5-day forecast based on their current location, if they grant permission to access their location.
- **Data Caching:** Weather data is cached for each searched city, and new data is fetched only if it's older than 1 hour.
- **Unit Tests:** Unit tests are written for components and services.

## Installation

To run this project locally, follow these steps:

1. **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd <project-directory>
    ```

2. **Install dependencies:**

    Make sure you have [Node.js](https://nodejs.org/) installed. Then, run:

    ```bash
    npm install
    ```

    Additionally, ensure that you have Angular CLI installed globally. If not, you can install it with:

    ```bash
    npm install -g @angular/cli
    ```

    After that, install Angular Material in your project by running:

    ```bash
    ng add @angular/material
    ```

    This command will guide you through the setup process for Angular Material, including choosing a theme and setting up global styles.


3. **Run the development server:**

    Start the Angular development server:

    ```bash
    ng serve
    ```

    The app will be available at `http://localhost:4200/`.

4. **Build the project (optional):**

    If you want to build the project for production, run:

    ```bash
    ng build --prod
    ```

    The build artifacts will be stored in the `dist/` directory.

## Usage

- **Search for a City:** Use the search input field to enter a city name. The app will display the current weather and a 5-day forecast for the searched city.
- **View Weather by Location:** If you allow location access, the app will automatically display the weather for your current location.
- **Save Favorite Cities:** You can save cities to your favorites list and quickly view their weather by selecting them from the list.


