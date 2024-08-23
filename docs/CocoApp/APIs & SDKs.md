---
sidebar_position: 1
---

# APIs & SDKs

### intro

CocoAPP API is a set of interfaces designed to facilitate communication between third-party applications (i.e., CocoAPP) and the CocoCat platform. This API supports various functions from basic data exchange to executing complex operations. Depending on the functionality, the API interfaces are categorized into different levels, and access to each level requires the corresponding official authorization.



### Installation

To start using the CocoAPP API, you first need to integrate the *MessageHandler.js* library into your project. This library can be downloaded from the official website. Once downloaded, you can include it in your project and start using it. Here is an example of how to import it in Vue:

```javascript
import { MessageHandler } from "@/utils/MessageHandler";
```

Next, you can initialize a *MessageHandler* object globally to use it throughout your application.

```javascript
let messageHandler = new MessageHandler();
```

The *MessageHandler* object contains a *sendMessageToParent* method used to call CocoAPP API methods. The parameters for this method include:

- **cmd**：The name of the CocoAPP API interface method.
- **payload**：The parameters object to be passed to the CocoAPP API interface method.
- **callback**：A callback function to execute the corresponding business logic after CocoAPP completes the operation.

Example：

```javascript
let cmd = "onload";
let payload = {
    "data": {
        "name": "Test1",
        "version": "v1.0.0"
    },
    "messageId": new Date().getTime()
};
let callback = (response) => {
    // Handle the response from the CocoAPP API
    console.log("Received response from CocoAPP API:", response);
};

messageHandler.sendMessageToParent(cmd, payload, callback);
```



## API Overview

Our API interfaces are categorized from Level 0 to Level 9, and users with different levels can call different functions. Please note that, except for Level 0, access to other levels requires corresponding level official authorization signature certification.

### Call Description

#### Request Parameters

Request parameters are in JSON object format, including the following fields:

|           |        |      |                                                              |
| --------- | ------ | ---- | ------------------------------------------------------------ |
| data      | String | Yes  | The parameter data for calling the API, the specific data structure varies depending on the *cmd* of the API interface. |
| sign      | Object | No   | Certificate data for specific message certification. Contains the following fields: - *content*：The original signature data, including substation address, validity period, level, version number, etc., in JSON string format. - *signature*：Signature data in Base64 encoding format. For Level 0, the *sign* parameter in the request payload will not be validated, so there is no need to pass the *sign* parameter. |
| messageId | Int    | No   | Message ID, represented as a timestamp (in milliseconds). Used for repeated API calls, corresponding to the callback method. |

Complete request structure

```json
{
    "data": {
        // Parameter data...
    },
    "sign": {
        "content": "",
        "signature": ""
    },
    "messageId": 0
}
```

#### Return Parameters

Response parameters are in JSON object format, including the following fields:

| Field     | Type   | Description                                                  |
| --------- | ------ | ------------------------------------------------------------ |
| code      | Int    | Response status code, refer to the status codes table below for detailed information. |
| cmd       | String | The name of the API interface method being called.           |
| result    | Object | The data received in the callback, different *cmd* return different data formats. |
| messageId | Int    | Message ID in milliseconds, corresponding to the *messageId* in the request parameters. |

Complete response structure

```json
{
    "code": 200,
    "cmd": "",
    "result": specific data...,
    "messageId": 0
}
```

#### Status Codes Table

Here is the status codes table to explain the status codes in the response:

|       |                                                |
| ----- | ---------------------------------------------- |
| 200   | Request succeeded                              |
| 30001 | Incorrect request format or invalid parameters |
| 30002 | Certificate not provided                       |
| 30003 | Certificate validation exception               |
| 30004 | API method does not exist                      |
| 30005 | Resource not found                             |
| 30006 | chainId exception                              |
| 30007 | Download failed                                |
| 30100 | Exception error                                |



## Interface Details

### onload

Used to execute necessary operations after the *window.onload* event of the CocoAPP page is triggered. The main purpose is to load and update the data of CocoAPP.

> **Important Note：To ensure the normal display of CocoAPP on CocoCat, you must call the **onload** method once when launching CocoAPP. Failure to call this method may result in abnormal display of CocoAPP.**

#### Level

Level 0

#### Request Parameters

|         |        |      |                                                              |
| ------- | ------ | ---- | ------------------------------------------------------------ |
| name    | String | true | The specified CocoAPP name. Used to identify the currently loading or updating application. |
| version | String | true | The current application version of CocoAPP. This parameter helps to verify whether the loaded version is the latest after the CocoAPP upgrade. |

#### Return Parameters

None

**Example**

```javascript
javascriptCopy code
let payload = {
  "data": {
    "name": "Test1",
    "version": "v1.0.0"
  }
};

messageHandler.sendMessageToParent("onload", payload, function (res) {
  // Return result
  // {
  //   "code": 200,
  //   "cmd": "onload",
  //   "messageId": 0
  // }
});
```



### connectCocoPay

Used to connect to the CocoPay wallet, mainly supporting Ethereum chains. The connection uses Trust Wallet, an application that supports Ethereum and multi-chain.

**Note**：The connection is considered successful only after calling this interface and returning successfully. After successful connection, assign to *window.ethereum* or *window.tronWeb* based on different chains:

- For Ethereum chains:：

  ```javascript
  window.ethereum = window.parent.top.ethereum;
  ```

- For Tron chains:

  ```javascript
  window.tronWeb = window.parent.top.tronWeb;
  ```

After the connection is complete, you can perform regular DAPP operations, such as using libraries like *web3.js*, *ethers.js*.

#### Level

Level 0

#### Supported Chains

| Full name of the blockchain | Abbreviation of the blockchain symbol |
| --------------------------- | ------------------------------------- |
| Ethereum                    | ETH                                   |
| BNB Chain                   | BSC                                   |
| Polygon                     | POLYGON                               |
| Avalanche-C                 | AVAXC                                 |
| TRON                        | TRON                                  |
| Arbitrum One                | ARBITRUM                              |
| Poly Smart Chain            | PSC                                   |
| Viction                     | VIC                                   |

#### Request Parameters:

|           |       |      |                                                              |
| --------- | ----- | ---- | ------------------------------------------------------------ |
| chainList | Array | true | The abbreviation symbols of the chains passed in, refer to the supported blockchains table. When passing multiple chains, CocoPay will display multiple blockchain options. |

#### Return Parameters:

|           |        |                                       |
| --------- | ------ | ------------------------------------- |
| chainType | String | Returns the linked chain abbreviation |
| account   | String | Returns the linked account address    |

#### Example:

```javascript
javascriptCopy code
let payload = {
  "data": {
    "chainList": ["ETH", "BSC"],
  },
  "messageId": new Date().getTime()
};

messageHandler.sendMessageToParent("connectCocoPay", payload, function (res) {
  // Return result
  // {
  //   "code": 200,
  //   "cmd": "connectCocoPay",
  //   "result": {
  //			"chainType": "ETH",
  //      "account": "0xbF579fe8539D45....."
	//	  },
  //   "messageId": 1703143355158
  // }
})
```



### getSafeAreaInsets

Used to return the safe area dimensions at the top and bottom of mobile devices.

#### Level

Level 0

#### Request Parameters:

None

#### Return Parameters:

|                |      |                                          |
| -------------- | ---- | ---------------------------------------- |
| safeAreaTop    | Int  | The height value of the top safe area    |
| safeAreaBottom | Int  | The height value of the bottom safe area |

#### Usage Example:

```javascript
messageHandler.sendMessageToParent("getSafeAreaInsets", {}, function (res) {
  // Return example
  // {
  //   "code": 200,
  //   "cmd": "getSafeAreaInsets",
  //   "result": {
  //     "safeAreaTop": 80,
  //     "safeAreaBottom": 40  
  //   }
  // }
});
```



### getLanguage

Used to get the current language setting of CocoCat.

#### Level

Level 0

#### Request Parameters

None

#### Return Parameters

|        |        |                        |
| ------ | ------ | ---------------------- |
| result | String | Current language code. |

#### Supported Languages

|       |                     |
| ----- | ------------------- |
| en    | English             |
| zh-cn | Simplified Chinese  |
| zh-tw | Traditional Chinese |
| th    | Thai                |
| es    | Spanish             |
| ko    | Korean              |
| ja    | Japanese            |
| ar    | Arabic              |



#### Example

```javascript
messageHandler.sendMessageToParent("getLanguage", {}, function (res) {
  // Return example
  // {
  //   "code": 200,
  //   "cmd": "getLanguage",
  //   "result": "en"
  // }
});
```



### readFile

Used to read all resource files under CocoAPP.

> **Note**：Reading too large resource files will directly affect the performance of CocoAPP.

#### Level

Level 0

#### Request Parameters:

|      |        |       |                                                              |
| ---- | ------ | ----- | ------------------------------------------------------------ |
| path | String | true  | The relative path of the resource file, starting with the CocoAPP address, followed by the file name, the path should not start with "/". Cannot be used to read folders. Examples: - Read CocoAPP resources:*1BX9T97qS47zN1Wqqv2dfGiR3ahgUqiGRX/test.txt* - Read CocoAPP folder resources:*1BX9T97qS47zN1Wqqv2dfGiR3ahgUqiGRX/common/test.txt* |
| type | String | false | File type. For text files, the default is UTF-8 encoding, this item does not need to be filled in. For files that need to be returned in Base64 format (such as images, videos, etc.), this parameter should be set to Base64. |



#### Return Parameters:

|        |        |                                        |
| ------ | ------ | -------------------------------------- |
| result | String | The content of the resource file read. |

#### Example

```javascript
javascriptCopy code
let payload = {
  "data": {
    "path": "1BX9T97qS47zN1Wqqv2dfGiR3ahgUqiGRX/icon.png",
    "type": "Base64"
  },
  "messageId": new Date().getTime()
};

messageHandler.sendMessageToParent("readFile", payload, function (res) {
  // Return result
  // {
  //   "code": 200,
  //   "cmd": "readFile",
  //   "result": "iVBORw0KGgoAAAANSUhEUgAAA9gAAABYCAY....",
  //   "messageId": 1703143355158
  // }
});
```



### openURL

Used to open a specified third-party URL, achieving a jump to an external HTTPS website. For security reasons, only URLs using the HTTPS protocol are supported.

#### Level

Level 0

#### Request Parameters

|      |        |      |                                    |
| ---- | ------ | ---- | ---------------------------------- |
| url  | String | true | The third-party HTTPS URL to open. |

#### Return Parameters

None

#### Example

```javascript
let payload = {
  "data": {
    "url": "https://www.google.com"
  },
  "messageId": new Date().getTime()
};

messageHandler.sendMessageToParent("openURL", payload, function (res) {
  // Return result
  // {
  //   "code": 200,
  //   "cmd": "openURL",
  //   "messageId": 1703143355158
  // }
});
```



### scanQRCode

Used to start the QR code scanning function.

#### Level

Level 0

#### Request Parameters

None

#### Return Parameters

|        |        |                                                |
| ------ | ------ | ---------------------------------------------- |
| result | String | The value returned after scanning the QR code. |

#### Example

```javascript
messageHandler.sendMessageToParent("scanQRCode", {}, function (res) {
  // Return result
  // {
  //   "code": 200,
  //   "cmd": "scanQRCode",
  //   "result": "Hello World!"
  // }
})
```



### copyToClipboard

Used to copy text to the clipboard.

#### Level

Level 0

#### Request Parameters:

|      |        |      |                          |
| ---- | ------ | ---- | ------------------------ |
| text | String | true | The text content copied. |

#### Return Parameters:

None

#### Example

```javascript
let messageHandler = new MessageHandler();
let payload = {
  "data": {
    "text": "Hello World!",
  },
  "messageId": new Date().getTime()
};

messageHandler.sendMessageToParent("copyToClipboard", payload, function (res) {
  // Return result
  // {
  //   "code": 200,
  //   "cmd": "copyToClipboard",
  //   "messageId": 1703143355158
  // }
})
```



### generateQRCode

Used to generate a QR code, allowing you to create a corresponding QR code image through the specified text content.

#### Level

Level 0

#### Request Parameters

|      |        |      |                                                  |
| ---- | ------ | ---- | ------------------------------------------------ |
| text | String | true | The text content to be converted into a QR code. |



#### Return Parameters

|        |        |                                                              |
| ------ | ------ | ------------------------------------------------------------ |
| result | String | The Base64 encoded string of the generated QR code image, including the data type and encoding prefix, such as *data:image/jpeg;base64,* followed by the Base64 encoded string of the QR code image. |



#### Example

```javascript
javascriptCopy code
let payload = {
  "data": {
    "text": "Hello World!"
  },
  "messageId": new Date().getTime()
};

messageHandler.sendMessageToParent("generateQRCode", payload, function (res) {
  // Return result
  // {
  //   "code": 200,
  //   "cmd": "generateQRCode",
  //   "result": "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAA9gAAABYCAY....",
  //   "messageId": 1703143355158
  // }
});
```



### saveImage

Used to save images to the album.

#### Level

Level 0

#### Request Parameters

|       |        |      |                                                              |
| ----- | ------ | ---- | ------------------------------------------------------------ |
| type  | String | yes  | Data type, optional values: - *base64*：The image is in Base64 format and must be accompanied by a URL prefix in the format*data:[&lt;mediatype&gt;][;base64],&lt;data&gt;*。 - *path*：The path of the local image or video. After downloading the file using the *downloadFile* method, read the image from the default download directory using a relative path to save it to the album. |
| image | String | yes  | The content of the image. Supported image formats include PNG, GIF, JPEG. |



> **Note**：When *type* is *path*, the path should be a relative path pointing to the file in the default download directory. For example, if the downloaded image is named *coco.png*, the path should be *coco.png*. If the downloaded resource is a zip file and unzipped, the image path might be *image/coco.png*.

#### Return Parameters

None

#### Example

```javascript
javascript
let payload = {
  "data": {
    "type": "base64",
    "image": "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAA9gAAABYCAY...."
  },
  "messageId": new Date().getTime()
};

messageHandler.sendMessageToParent("saveImage", payload, (res) => {
  // Return result
  // {
  //   "code": 200,
  //   "cmd": "saveImage",
  //   "messageId": 1703143355158
  // }
});
```



### saveVideo

Used to save videos to the album.

#### Level

Level 0

#### Request Parameters

|       |        |      |                                                              |
| ----- | ------ | ---- | ------------------------------------------------------------ |
| type  | String | yes  | Data type, optional values: - *base64*：The video is in Base64 format and must be accompanied by a URL prefix in the format*data:[&lt;mediatype&gt;][;base64],&lt;data&gt;*。 - *path*：The path of the local video. After downloading the video using the *downloadFile* method, read the video from the default download directory using a relative path to save it to the album. |
| video | String | yes  | The content of the video. Supported video formats are MP4, MOV. |



> **Note**：When *type* is *path*, the path should be a relative path pointing to the file in the default download directory. For example, if the downloaded video is named *coco.mp4*, the path should be *coco.mp4*.

#### Return Parameters

None

#### Example

```javascript
let payload = {
  "data": {
    "type": "base64",
    "video": "data:video/mp4;base64,AAAAIGZ0eXBpc29tAAACAGlzb21..."
  },
  "messageId": new Date().getTime()
};

messageHandler.sendMessageToParent("saveVideo", payload, (res) => {
  // Return result
  // {
  //   "code": 200,
  //   "cmd": "saveVideo",
  //   "messageId": 1703143355158
  // }
});
```



### getAccount

Used to get the account address under this CocoAPP, ensuring the unique identity of users under each CocoAPP. Different CocoAPPs will have different account addresses, reflecting the independent identity of users in each application.

> **Note**：If a CocoAPP is uninstalled and re-downloaded after more than 7 days, its account address will be updated to a new one; otherwise, the account address remains unchanged.

#### Level

Level 0

#### Request Parameters

|      |      |       |                                                              |
| ---- | ---- | ----- | ------------------------------------------------------------ |
| type | Int  | false | Request type. The default returns the BTC address; if `1` is passed, it returns the ECC public key (Base64 encoded string). |

#### Return Parameters

|        |        |                                             |
| ------ | ------ | ------------------------------------------- |
| result | String | The returned account address or public key. |

#### Example

```javascript
messageHandler.sendMessageToParent("getAccount", {}, function (res) {
  // Return result
  // {
  //   "code": 200,
  //   "cmd": "getAccount",
  //   "result": "1Cg7aGLnLAjXJiYCGZpbqGEz8SLD2v3Qij"
  // }
});
```



### setExtendedData

This interface allows storing extended data for CocoAPP, providing up to 1M storage space for each CocoAPP. Please note that each storage operation will replace the previous data.

#### Level

Level 0

#### Request Parameters

|        |        |      |                                         |
| ------ | ------ | ---- | --------------------------------------- |
| extend | Object | true | Any type of extended data to be stored. |

#### Return Parameters

None

#### Example

```javascript
let payload = {
  "data": {
    "extend": "{\"address\":\"1Cg7aGLnLAjXJiYCGZpbqGEz8SLD2v3Qij\"}"
  },
  "messageId": new Date().getTime()
};

messageHandler.sendMessageToParent("setExtendedData", payload, function (res) {
  // Return result
  // {
  //   "code": 200,
  //   "cmd": "setExtendedData",
  //   "messageId": 1703143355158
  // }
});
```



### getExtendedData

Used to get the previously stored extended data from CocoAPP.

#### Level

Level 0

#### Request Parameters

None

#### Return Parameters

|        |        |                                |
| ------ | ------ | ------------------------------ |
| result | Object | Gets the stored extended data. |

#### Example

```javascript
messageHandler.sendMessageToParent("getExtendedData", {}, function (res) {
  //  Return result
  // {
  //   "code": 200,
  //   "cmd": "getExtendedData",
  //   "result": "{\"address\":\"1Cg7aGLnLAjXJiYCGZpbqGEz8SLD2v3Qij\"}"
  // }    
})
```



### generateSignature

Used to generate an ECDSA digital signature for a specified text message. The signature process is based on the secp256k1 elliptic curve and utilizes the CocoAPP account obtained from the getAccount method for signing, ensuring the integrity and source verification of the message, and maintaining consistency with the CocoAPP account.

#### Level

Level 0

#### Request Parameters

|         |        |      |                                |
| ------- | ------ | ---- | ------------------------------ |
| message | String | yes  | The text message to be signed. |

#### Return Parameters

|        |        |                                                            |
| ------ | ------ | ---------------------------------------------------------- |
| result | String | The generated digital signature, encoded in Base64 format. |

#### Example

```javascript
let payload = {
  "data": {
    "message": "Hello World!"
  },
  "messageId": new Date().getTime()
};

messageHandler.sendMessageToParent("generateSignature", payload, (res) => {
  // Return result
  // {
  //   "code": 200,
  //   "cmd": "generateSignature",
  //   "result": "3045022100aaabbbcccdddee....",
  //   "messageId": 1703143355158
  // }    
});
```



### verifySignature

Used to verify the validity of a digital signature generated by the *generateSignature* method. It confirms whether the signature is valid based on the provided original message and signature data, ensuring data integrity and consistency of source verification.

#### Level

Level 0

#### Request Parameters

|               |        |      |                                             |
| ------------- | ------ | ---- | ------------------------------------------- |
| message       | String | yes  | The original text message to be verified.   |
| signatureData | String | yes  | Signature data, encoded as a Base64 string. |

#### Return Parameters

|        |         |                                                              |
| ------ | ------- | ------------------------------------------------------------ |
| result | Boolean | Verification result, *true* means the signature is valid, *false* means the signature is invalid. |

#### Example

```javascript
let payload = {
  "data": {
    "message": "Hello World!",
    "signatureData": "3045022100aaabbbcccdddee...."
  },
  "messageId": new Date().getTime()
};

messageHandler.sendMessageToParent("verifySignature", payload, function (res) {
  // Return result
  // {
  //   "code": 200,
  //   "cmd": "verifySignature",
  //   "result": true,
  //   "messageId": 1703143355158
  // }    
});
```



### encrypt

Used to provide encryption for text messages, using the Elliptic Curve Integrated Encryption Scheme (ECIES) to encrypt text messages. The encryption operation ensures the security of message content and is suitable for information that needs to be transmitted confidentially. The encryption result is returned as a Base64 encoded string, convenient for storage or further transmission.

#### Level

Level 0

#### Request Parameters

|         |        |      |                                   |
| ------- | ------ | ---- | --------------------------------- |
| message | String | yes  | The text message to be encrypted. |

#### Return Parameters

|        |        |                                                     |
| ------ | ------ | --------------------------------------------------- |
| result | String | The encrypted message, returned as a Base64 string. |



#### 示例

```javascript
let payload = {
  "data": {
    "message": "Hello World!"
  },
  "messageId": new Date().getTime()
};

messageHandler.sendMessageToParent("encrypt", payload, function (res) {
  // Return result
  // {
  //   "code": 200,
  //   "cmd": "encrypt",
  //   "result": "roZskbq2AKNzRitvIh0a....",
  //   "messageId": 1703143355158
  // }    
});
```



### decrypt

Used to decrypt text encrypted using the *encrypt* interface, ensuring the security and reversibility of encrypted data. By providing the encrypted ciphertext (Base64 encoded string), the interface will restore and return the original plaintext information.

#### Level

Level 0

#### Request Parameters

|               |        |      |                                                            |
| ------------- | ------ | ---- | ---------------------------------------------------------- |
| encryptedData | String | yes  | The text to be decrypted, must be a Base64 encoded string. |

#### Request Parameters

|        |        |                                   |
| ------ | ------ | --------------------------------- |
| result | String | The decrypted original plaintext. |

#### Example

```javascript
let payload = {
  "data": {
    "serviceKey": "eyJhdXRoc2lnbiI6Ik1FVUNJUURxR....",
    "signKey": "xxxxxxxxx"
  },
  "sign": {
        "content": "xxxxxxxx",
        "signature": "xxxxxxx"
  },
  "messageId": new Date().getTime(),
  
};

messageHandler.sendMessageToParent("registerService", payload, function (res) {
  // Return result
  // {
  //   "code": 200,
  //   "cmd": "registerService",
  //   "messageId": 1703143355158
  // }    
});
```



