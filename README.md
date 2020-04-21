## Strategic Machines
### Experimental WEB APIs

#### Bridging the Divide between the Physical and Digital

This app scans QR codes, performs OCR and reads NFC triggers from the smartphone.

#### Usage

Open the web app on your smart phone and select a function

Important note.- With respect to the NFC function of this App, as of 10/09/2019, the only browser that allowed (experimentally) access to the NFC system of the smartphone was the Chrome and had to activate the WebNFC flag, passing it to enable, from the following chl url: chrome://flags. 

* Make sure your device supports NFC and that NFC option is turned on from your device settings.
* Confirm your browser version supports reading and writing NFC tags. For the best support, use the latest version of Chrome (Beta).
* Select "Activate" on the home page. A popup should open, asking for your permission to use your device NFC. Grant permission.
* Note that if your browser does not support NFC, the application will emulate an NFC reader and provide a random test result on each scan. 
* If NFC is functional for your browser, scan any NFC tag with your device, with this page open.
* If a tag was read successfully, a new page displays the results

##### Demo

[QR code examples](https://www.google.com/search?q=qr&sxsrf=ACYBGNQvf2CHElh29Efs517GpRNnkVDWHQ:1571075556440&source=lnms&tbm=isch&sa=X&ved=0ahUKEwj6v9PDqJzlAhUrDWMBHYD0CRcQ_AUIEigB&biw=1280&bih=650).

To test the NFC reader, select and read a tag configured configured for NDEF

#### references
https://www.npmjs.com/package/tesseract.js
https://blog.logrocket.com/how-to-extract-text-from-an-image-using-javascript-8fe282fb0e71/

https://docs.deistercloud.com/content/Axional%20development%20libraries.20/Axional%20JS%20Script/AX%20Library.10/barcode/barcode.xml

