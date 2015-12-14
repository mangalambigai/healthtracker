# To run the application:

1. Run the following commands in the root directory.

  ```bash
  $> npm install
  $> bower install
  $> grunt
  ```
2. To inspect the site, you need to run a local server. This is required for the proper functioning of polymer chart component.

Add a website in IIS with the root directory or:

  ```bash
  $> cd /path/to/your-project-folder
  $> python -m SimpleHTTPServer 8080
  ```

3. Open a browser and launch index.html.

## Features:

1. Uses Nutritionix for calorie data

2. Uses [Harris Benedict equation](https://en.wikipedia.org/wiki/Harris%E2%80%93Benedict_equation) for calculating calorie needs

3. Bootstrap navbar and tabs

4. Data stored in Firebase

5. Navigate between days

