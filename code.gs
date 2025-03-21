function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index');
}

function processCSV(csvData) {
  try {
    Logger.log('Processing CSV Data');
    var customerId = 'my_customer'; // Use 'my_customer' or your actual customer ID
    var csvRows = Utilities.parseCsv(csvData);

    var url = 'https://admin.googleapis.com/admin/directory/v1/customer/' + customerId + '/devices/chromeos?projection=FULL';
    var options = {
      'method': 'GET',
      'headers': {
        'Authorization': 'Bearer ' + ScriptApp.getOAuthToken()
      },
      "muteHttpExceptions": true
    };

    var devices = [];
    var pageToken = null;
    var deviceMap = {};

    // Build a map of serial numbers to devices
    do {
      var response = UrlFetchApp.fetch(url + (pageToken ? '&pageToken=' + pageToken : ''), options);
      var result = JSON.parse(response.getContentText());
      devices = result.chromeosdevices;
      pageToken = result.nextPageToken;

      devices.forEach(function(device) {
        deviceMap[device.serialNumber] = device;
      });
    } while (pageToken);

    var updatedDevicesCount = 0;
    var log = [];
    var updatePayloads = [];

    // Iterate through the CSV data and prepare updates
    csvRows.slice(1).forEach(function(row) { // Skip header row
      var newUser = row[0];
      var serialNumber = row[1];

      var device = deviceMap[serialNumber];
      if (device) {
        var updateUrl = 'https://admin.googleapis.com/admin/directory/v1/customer/' + customerId + '/devices/chromeos/' + device.deviceId;
        var updateOptions = {
          'method': 'PATCH',
          'headers': {
            'Authorization': 'Bearer ' + ScriptApp.getOAuthToken(),
            'Content-Type': 'application/json'
          },
          'payload': JSON.stringify({
            'annotatedUser': newUser
          }),
          "muteHttpExceptions": true
        };

        updatePayloads.push({url: updateUrl, options: updateOptions});
        log.push("Updated device: " + device.serialNumber + " with new user: " + newUser);
        updatedDevicesCount++;
      } else {
        log.push("Device with serial number " + serialNumber + " not found.");
      }
    });

    // Execute updates in batches
    updatePayloads.forEach(function(payload) {
      UrlFetchApp.fetch(payload.url, payload.options);
    });

    return log.join('<br>') + "<br>Updated " + updatedDevicesCount + " devices.";
  } catch (error) {
    Logger.log("Error processing CSV: " + error.message);
    throw error;
  }
}
