# Country Encyclopedia SPA

A single-page application (SPA) that provides detailed information about countries using the [REST Countries API](https://restcountries.com/). This project is built with Angular, styled with SCSS, and utilizes Zod for TypeScript schema validation. Lucide is used for iconography.

## Table of Contents

- [Country Encyclopedia SPA](#country-encyclopedia-spa)
  - [Table of Contents](#table-of-contents)
  - [Demo](#demo)
  - [Technologies Used](#technologies-used)
  - [Features](#features)
  - [Installation](#installation)
    - [Prerequisites](#prerequisites)
    - [Steps](#steps)
  - [Usage](#usage)
  - [Feedback](#feedback)

## Demo

A live demo of this application can be found [here](https://rv-countries-enc.vercel.app/home).

## Technologies Used

- **[Angular](https://angular.io/)** - A platform and framework for building single-page client applications using HTML and TypeScript.
- **[SCSS](https://sass-lang.com/)** - A CSS preprocessor for more maintainable and readable styling.
- **[Lucide](https://lucide.dev/)** - Icon library used for UI elements.
- **[Zod](https://zod.dev/)** - TypeScript-first schema declaration and validation library.
- **[REST Countries API](https://restcountries.com/)** - Provides detailed information about countries.

## Features

- Search countries by translations.
- Display detailed information on each country.
- Population ranking system for countries.
- Add and manage favorite countries with local storage.

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [Angular CLI](https://angular.io/cli) (version 12 or higher)

### Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/country-encyclopedia-spa.git
   cd country-encyclopedia-spa
   ```

2. **Install dependencies**
   ```bash
   npm install
   or
   npm i
   ```
3. **Set up the environment**

   No additional environment configuration is required as the app fetches data from the public REST Countries API.

4. **Run the app**

   ```bash
   ng serve
   or
   ng serve --open

   ```

   I utilized ng serve --open

5. **Open the app**

   Open your browser and go to [http://localhost:4200](http://localhost:4200).

## Usage

1. Search Functionality: Use the search bar to filter countries by name.
2. Favorites: Mark a country as favorite and view it in the favorites list.
3. Population Rank: Each country has a ranking based on population size.

## Feedback

This is my first Angular application, and I am excited to share it with YOU!. Any feedback, suggestions, or constructive criticism would be greatly appreciated to help me improve my skills and enhance the app. Feel free to open an issue or reach out if you have any comments or ideas!
