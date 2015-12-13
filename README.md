#To run the application:

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

3. Open a browser and launch index.html.

##Features:
1. Bootstrap navbar and tabs
2. Data stored in Firebase
3. Navigate between days
4. View the total calories for each day in summary
