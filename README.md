# Chromebook Device Management Web App

This web app allows techs to upload a CSV file containing user email addresses and Chromebook serial numbers to update the assigned user for each device. The app is built using Google Apps Script and provides a simple interface for uploading the CSV file and viewing the update results.

## Features

- Upload CSV file with user email addresses and Chromebook serial numbers
- Update the assigned user for each Chromebook device
- Display a log of the update results in the browser

## Prerequisites

- Google Workspace account with admin privileges
- Google Apps Script project

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/chromebook-device-management.git
   cd chromebook-device-management
Create a new Google Apps Script project:

Go to Google Apps Script.
Click on New project.
Copy the script files:

Copy the contents of Code.gs into the Code.gs file in your Apps Script project.
Copy the contents of Index.html into a new HTML file named Index.html in your Apps Script project.
Set up OAuth scopes:

In the Apps Script project, click on Project Settings (gear icon).
Under Scopes, add the following scopes:
https://www.googleapis.com/auth/admin.directory.device.chromeos
https://www.googleapis.com/auth/admin.directory.device.chromeos.readonly
https://www.googleapis.com/auth/drive.readonly
https://www.googleapis.com/auth/drive
https://www.googleapis.com/auth/script.external_request
https://www.googleapis.com/auth/spreadsheets
Deploy the web app:

Click on Deploy > New deployment.
Select Web app.
Set the access permissions to allow your techs to use it.
Click Deploy and copy the web app URL.
Usage
Open the web app:

Open the web app URL in your browser.
Upload the CSV file:

Click on the Choose File button and select your CSV file.
Click on the Upload button.
View the update results:

The app will display the progress and results of the device updates in the browser window.
CSV File Format
The CSV file should have the following format:

useremail,serialnumber
user1@example.com,serialnumber1
user2@example.com,serialnumber2
...
License
This project is licensed under the MIT License. See the LICENSE file for details.

Contributing
Contributions are welcome! Please open an issue or submit a pull request with your changes.

Acknowledgements
Google Apps Script
Google Admin SDK Directory API
