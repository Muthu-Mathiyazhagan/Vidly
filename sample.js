
 
 
 const fullOrder = {
   "buyerLanguage": "en",
   "cartId": "055e1808-b236-48dc-94d5-45288e06ef9c",
   "currency": "USD",
   "weightUnit": "KG",
   "billingInfo": {
     "address": {
       "formatted": "235 W 23rd St New York, NY 10011, USA",
       "city": "New York",
       "country": "US",
       "addressLine": "235 W 23rd St",
       "postalCode": "10011",
       "subdivision": "NY"
     },
     "lastName": "Doe",
     "firstName": "John",
     "email": "john.doe@somedomain.com",
     "phone": "+15555555555",
     "company": "My company name",
     "paymentMethod": "VISA",
     "paymentGatewayTransactionId": "29A06193U6234935D",
     "paymentProviderTransactionId": "7c03ca74-eaf5-4541-8678-9b857634fdcb"
   },
   "totals": {
     "subtotal": 5,
     "total": 5,
     "shipping": 0
   },
   "channelInfo": {
     "type": "WEB"
   },
   "paymentStatus": "PAID",
   "shippingInfo": {
     "deliverByDate": "2019-06-23T13:58:47.871Z",
     "deliveryOption": "Free Shipping",
     "shippingRegion": "Domestic",
     "estimatedDeliveryTime": "4:30pm",
     "shipmentDetails": {
       "address": {
         "formatted": "235 W 23rd St, New York, NY 10011, USA",
         "city": "New York",
         "country": "US",
         "addressLine": "235 W 23rd St",
         "postalCode": "10011",
         "subdivision": "NY"
       },
       "lastName": "Doe",
       "firstName": "John",
       "email": "john.doe@somedomain.com",
       "phone": "5555555555",
       "company": "company name",
       "shipmentPriceData": {
         "price": 5,
         "taxIncludedInPrice": false
       }
     }
   },
   "lineItems": [{
     "customTextFields": [{
       "title": "Notes for delivery",
       "value": "Please leave at front door"
     }],
     "productId": "3fb6a3c8-988b-8755-04bd-5c59ae0b18ea",
     "lineItemType": "PHYSICAL",
     "mediaItem": {
       "altText": "This is a description of the image",
       "src": "wix:image://v1/689fa9...ccdc8a.jpg/file.jpg#originWidth=5760&originHeight=3840"
     },
     "name": "my product's name",
     "options": [{
       "option": "Size",
       "selection": "Medium"
     }],
     "quantity": 1,
     "sku": "36523641234523",
     "weight": 1.42,
     "translatedName": "Nombre traducido",
     "discount": 0,
     "tax": 5,
     "priceData": {
       "price": 5,
       "taxIncludedInPrice": true
     }
   }],
   "customField": {
     "title": "Notes for delivery",
     "translatedTitle": "Notas de entrega",
     "value": "Please call when outside"
   },
   "discount": {
     "appliedCoupon": {
       "code": "47d259d6-7d1e-4ea5-a75c79ca9bb1",
       "couponId": "d293d777-5aad-4f70-aa91-36c7c5f16740",
       "name": "Summer sale"
     }
   }
 }
 
 /* Example of returned order object
  *
  *  {
  *    "_id": "d5d43d01-d9a4-4cc2-b257-61184b881447",
  *    "_updatedDate": "2020-05-27T12:20:37.994Z",
  *    "buyerLanguage": "en",
  *    "cartId": "055e1808-b236-48dc-94d5-45288e06ef9c",
  *    "channelInfo": {
  *      "type": "WEB"
  *    },
  *    "enteredBy": {
  *      "id": "f6c2c0f9-4e9f-a58d-a02d-9af2497294d9",
  *      "identityType": "MEMBER"
  *    },
  *    "billingInfo": {
  *      "address": {
  *        "formatted": "My company name\n235 W 23rd St\nNew York, New York 10011\nUnited States\n+15555555555",
  *        "city": "New York",
  *        "country": "USA",
  *        "addressLine": "235 W 23rd St",
  *        "postalCode": "10011",
  *        "subdivision": "NY"
  *      },
  *      "firstName": "John",
  *      "lastName": "Doe",
  *      "email": "john.doe@somedomain.com",
  *      "phone": "+15555555555",
  *      "company": "My company name",
  *      "externalTransactionId": "7c03ca74-eaf5-4541-8678-9b857634fdcb",
  *      "paidDate": "2020-05-27T12:20:37.994Z",
  *      "paymentMethod": "VISA",
  *      "paymentGatewayTransactionId": "29A06193U6234935D",
  *      "paymentProviderTransactionId": "7c03ca74-eaf5-4541-8678-9b857634fdcb"
  *    },
  *    "buyerInfo": {
  *      "id": "f6c2c0f9-4e9f-a58d-a02d-9af2497294d9",
  *      "identityType": "MEMBER",
  *      "firstName": "John",
  *      "lastName": "Doe",
  *      "phone": "+15555555555",
  *      "email": "john.doe@somedomain.com"
  *    },
  *    "_dateCreated": "2020-05-27T12:20:37.966Z",
  *    "currency": "ILS",
  *    "fulfillmentStatus": "NOT_FULFILLED",
  *    "archived": false,
  *    "activities": [
  *      {
  *        "type": "ORDER_PLACED",
  *        "timestamp": "2020-05-27T12:20:37.966Z"
  *      },
  *      {
  *        "type": "ORDER_PAID",
  *        "timestamp": "2020-05-27T12:20:37.994Z"
  *      }
  *    ],
  *    "number": 10019,
  *    "paymentStatus": "PAID",
  *    "shippingInfo": {
  *      "deliveryOption": "Free Shipping",
  *      "estimatedDeliveryTime": "4:30pm",
  *      "shippingRegion": "Domestic",
  *      "shipmentDetails": {
  *        "address": {
  *          "formatted": "company name\n235 W 23rd St\nNew York, New York 10011\nUnited States\n5555555555",
  *          "city": "New York",
  *          "country": "USA",
  *          "addressLine": "235 W 23rd St",
  *          "postalCode": "10011",
  *          "subdivision": "NY"
  *        },
  *        "firstName": "John",
  *        "lastName": "Doe",
  *        "email": "john.doe@somedomain.com",
  *        "phone": "5555555555",
  *        "company": "company name",
  *        "tax": 0,
  *        "discount": 0,
  *        "priceData": null
  *      },
  *      "pickupDetails": null
  *    },
  *    "lineItems": [
  *      {
  *        "index": 1,
  *        "quantity": 1,
  *        "price": 5,
  *        "name": "my product's name",
  *        "translatedName": "Nombre traducido",
  *        "productId": "3fb6a3c8-988b-8755-04bd-5c59ae0b18ea",
  *        "totalPrice": 5,
  *        "lineItemType": "PHYSICAL",
  *        "options": [
  *          {
  *            "option": "Size",
  *            "selection": "Medium"
  *          }
  *        ],
  *        "customTextFields": [
  *          {
  *            "title": "Notes for delivery",
  *            "value": "Please leave at front door"
  *          }
  *        ],
  *        "weight": 1.42,
  *        "sku": "36523641234523",
  *        "discount": 0,
  *        "tax": 5,
  *        "taxIncludedInPrice": true,
  *        "priceData": {
  *          "price": 5,
  *          "totalPrice": 5,
  *          "taxIncludedInPrice": true
  *        },
  *        "mediaItem": {
  *          "altText": "This is a description of the image",
  *          "id": "fac9dc352bf7d54ed0458d64ce41a3ec.jpg",
  *          "src": "wix:image://v1/fac9dc352bf7d54ed0458d64ce41a3ec.jpg/file.jpg#originWidth=1348&originHeight=899",
  *          "type": "IMAGE"
  *        }
  *      }
  *    ],
  *    "totals": {
  *      "discount": 0,
  *      "quantity": 1,
  *      "shipping": 0,
  *      "subtotal": 5,
  *      "tax": 0,
  *      "total": 5,
  *      "weight": 1.42
  *    },
  *    "weightUnit": "KG",
  *    "customField": {
  *      "value": "Please call when outside",
  *      "title": "Notes for delivery",
  *      "translatedTitle": "Notas de entrega"
  *    },
  *    "discount": {
  *      "appliedCoupon": {
  *        "code": "47d259d6-7d1e-4ea5-a75c79ca9bb1",
  *        "couponId": "d293d777-5aad-4f70-aa91-36c7c5f16740",
  *        "name": "Summer sale"
  *      }
  *    }
  *  }
  *
  */