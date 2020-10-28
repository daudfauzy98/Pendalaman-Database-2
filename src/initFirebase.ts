/*import admin from 'firebase-admin'
// Menggunakan kurung kurawal karena file serviceAccountKey memiliki
// definisi objek berbentuk struct
import { serviceAccountCredentials } from './serviceAccountKey'

const serviceAccount = serviceAccountCredentials as admin.ServiceAccount

// Inisialisasi koneksi ke database Firebase Firestore
admin.initializeApp({
   credential: admin.credential.cert(serviceAccount),
   databaseURL: 'https://pendalaman-database-2.firebaseio.com'
 })

const antrianTellerColl = admin.firestore().collection('antrianTeller')
const antrianCSColl = admin.firestore().collection('antrianCS')

export default { antrianTellerColl, antrianCSColl}

var FbApp = admin.initializeApp({
   credential: admin.credential.cert(serviceAccount),
   databaseURL: 'https://pendalaman-database-2.firebaseio.com'
})

module.exports.antrianTellerColl = FbApp.database().ref
module.exports.antrianCSColl = FbApp.firestore().collection('antrianCS')*/