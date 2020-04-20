function readWriteNfc() {
  if ('nfc' in navigator) {
    navigator.nfc.watch(function (message) {
        var pru = CapturarNFC(message)
        consoleLog(message);
        if (message.data[0].recordType === 'empty') {
          navigator.nfc.push([{
            url: message.url,
            data: [{
              recordType: "text",
              data: 'Hello World'
            }]
          }]);
        }
        processMessage(message);
      }, {mode: 'any'})
      .then(() => consoleLog("Added a watch."))
      .catch(err => consoleLog("Adding watch failed: " + err.name));
  } else {
    consoleLog('NFC API not supported.');
  }
}

function CapturarNFC(data){
  var logElement = document.getElementById('codigoNFC');
  logElement.value =  data.records[0].data();
    return data.records[0].data();
}
function consoleLog(data) {
  var logElement = document.getElementById('log');
  var result = '';
  for (var i in data.records[0].mediaType){
      result +=i + " ; " ;
  }  
}

function processMessage(message) {
  message.data.forEach(function (record) {
      consoleLog(record.data);
    if (record.recordType == "string") {
      consoleLog('Data is string: ' + record.data);
    } else if (record.recordType == "json") {
      processJSON(record.data);
    } else if (record.recordType == "url") {
      consoleLog("Data is URL: " + record.data);
    } else if (record.recordType == "opaque" && record.mediaType == 'image/png') {
      processPng(record.data);
    } else if (record.recordType == "text"){
        consoleLog('Data is a text');
    };
  });
}

function processPng(data) {
  consoleLog("Known image/png data");
  var img = document.createElement("img");
  img.src = URL.createObjectURL(new Blob(data, 'image/png'));
  img.onload = function () {
    window.URL.revokeObjectURL(this.src);
  };
};

function processJSON(data) {
  var obj = JSON.parse(data);
  consoleLog("JSON data: " + obj.myProperty.toString());
};