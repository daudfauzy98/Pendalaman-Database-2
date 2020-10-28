// Menggunakan kurung kurawal karena library firebase-admin bertipe struct
import admin, { firestore } from 'firebase-admin'
import { serviceAccountCredentials } from '../serviceAccountKey'

const serviceAccount = serviceAccountCredentials as admin.ServiceAccount

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://pendalaman-database-2.firebaseio.com'
})

// admin.firestore() -> Jenis database
// collection() -> memilih collection di database
const antrianCSRef = admin.firestore().collection('antrianCS')

// Method menambahkan angka 0 dengan digit tertentu di depan sebuah angka
function padFunction(angka: number, padStr: string, len: number) {
  var str = angka.toString()
  while (str.length < len)
    str = padStr + str;
  return str;
}

export class AntrianCSClient {
  // Deklarasi tipe data variabel "antrianCSRef"
  private antrianCSRef:
    FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>

  constructor() {
    this.antrianCSRef = antrianCSRef
  }
    
  async addData(counter: number) {
    const time = firestore.Timestamp.now().seconds
    const data = {
      nomor_antrian: "CS"+padFunction(counter, "0", 3),
      waktu_antri: time
    }
    
    try {
      await antrianCSRef.add(data)
    } catch (error) {
      throw error
    }
    return
  }

  async getData() {
    let snapshot
    try {
      snapshot = await this.antrianCSRef.orderBy('nomor_antrian').get()
    } catch (error) {
      throw error
    }
    console.log(snapshot)
    //return snapshot
    return snapshot.docs.map(doc => doc.data())
  }

  async getDataById(id: string) {
    let snapshot
    try {
      snapshot = await antrianCSRef.doc(id).get()
    } catch (error) {
      throw error
    }
    return snapshot.data()
  }

  async deleteData() {
    let snapshot
    let batch = admin.firestore().batch()
    try {
      snapshot = await this.antrianCSRef.get()
      snapshot.docs.forEach((doc) => {
        batch.delete(doc.ref)
      })
    } catch (error) {
      throw error
    }
    return batch.commit()
  }

  async deleteDataById(id: string) {
    try {
      await antrianCSRef.doc(id).delete()
    } catch (error) {
      throw error
    }
    return
  }
}