// import * as admin from 'firebase-admin';
// // const admin = require('firebase-admin');

// const adminConfig: any = {
//   type: "service_account",
//   project_id: "police-dispatch-2ede5",
//   private_key_id: "ea1e7ce3211afdfcbc8a964cf64bfdf6feb6402b",
//   private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDTKB3995wQVcjF\nZPry6obBa5vS/JiAgMcUEI2oPpy54NQOgHt8YSmLeVmKij4CNDMiM3eSYCmjpERD\ncyBvZNeNy9qLb6fQecP9Iq3Ry5ALurW1wBJHqoY3aByYi+82cmiqGFXfWYFVTKOe\n8oQe4g7186ILNxX925+Of14H2RgweWYi7I82mGj6mDNPXe5MIJqyKe4Gq8Ug8V2U\n38O+K/hKuMkxhjIQc84nsKMPpFgpiK8eIL7hdOsFdYm4tB25A+APUzheESlAzS7F\nUF3CIAaqlf8qdeEVqyKDR6DPaWyJF/4yVKONbfFwspffSwy0J4S/lpt+EQIqukEI\n2if3oq8vAgMBAAECggEAJ6AHJNIzGMOoZhahmzVUrXZuqwTY74B7G3JRywlY6u7c\njI4i3j/zhmdy3LM9mLdIAzqKTU87cSiR4OB5bT4Mz2C6deExqkc3dsjruouLUBAt\nKlrNc2J2Rm6Es0HLVbnZl1Xyw3Ot+B5mNB1JmuwMJ66dMaKYP2fYBOs0758XUX0X\nPE75mpUml6VCEVrD5AZVAd8OnU0wV0laacrSBrBTpx+ZJPFjXVkbAdP18wVHPCaW\ntgFEl8H65kwD3FseNxIrsZGQI/NXCAXfxCNiapUFzg+a4eK6RB3xJwJhYKqv3ErW\nQln/OMGmuGaX+NFBNYZtaJX06dcE1cnKhujbsmOvFQKBgQD2O3WwrKyYaCUeEzvR\nQo1MwYVrvq3gCNz3o8j2n5fLlV4vbh15GcFRghjrtGUa2pmyQdQLVEvGiNGnTJFz\n6/Vj11JSwlQOzxnLqnLcsVwWZGdKJTYvWag+rnJ45/CVFo3WttncFVWbTkbK7ah8\nWvRbNxDH2/FA4RItnrYrFE5EIwKBgQDbiHUyCgPFELhCTFd1ZLOEDmL+Ba1zQ8cj\nHEQcLTxrapGe92KDWSpwg0S6sp2UpDVGORXZsgNb6bR7SLfbc9qbfThjBZC5lPQu\nDmdtRUYcZsAQMVrK/1BkG7LQBRyuIQWZiYZXN0yFgnJ0KtzWIHGEP0aRea5L1wsk\nEBhMNf2jhQKBgG5vEoSvnSUpqGQJuk1LLPZc4QsG1RLixr/mXE6IG1t6XWimWV+j\n9nkpASZNnP7jRgWV0pVWNDoRyP3gsGeuTzt9KfXmJC8UIXyfsK5ceXGtjEnL0LaB\n3pxmPv8M/3DOUcUX8zPq+Z8TB1siJevIG0oBs2v/r/8qMq31PbyqecPDAoGAOH87\nue793V9aLCW9dEbANEIHk9weMUXGH/EMTjwOCo7YfxKnVapC08XUkD+bcj94PmQ+\njVHUr3jLq9ahCmccYVuugT1Ta4878AZg86waSQDgeMpa1Vczdy/xqrtGEEILUOIl\nophmpw1VKzREtQ6QaDpojNPF2Vq0UUmbFzHl3okCgYAIo8FnWdbw6qgOCsIXfG/m\nEi35I+FNfOQZlsARt+w0BqpNtjBL0A4E5W/bhCyZd001YAMVlXsVLpl+7I5WA4Gm\n1qyk4DUgVvx+Vbwlw7S2sX9HRjm/ju7D1Sdz2pHhpgyvSb7KVS7T1eKoSLhYY8LK\nlQTFq5fTHmjDOha27mVfiQ==\n-----END PRIVATE KEY-----\n",
//   client_email: "firebase-adminsdk-gvqp3@police-dispatch-2ede5.iam.gserviceaccount.com",
//   client_id: "118036710509228255815",
//   auth_uri: "https://accounts.google.com/o/oauth2/auth",
//   token_uri: "https://oauth2.googleapis.com/token",
//   auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
//   client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-gvqp3%40police-dispatch-2ede5.iam.gserviceaccount.com"
// }

// admin.initializeApp({
//   credential: admin.credential.cert(adminConfig),
//   databaseURL: "https://police-dispatch-2ede5.firebaseio.com"
// })

// admin.initializeApp({
//   credential: admin.credential.cert(adminConfig),
//   databaseURL: "https://police-dispatch-2ede5.firebaseio.com"
// })
// export const auth = admin.auth();