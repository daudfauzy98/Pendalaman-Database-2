import { firestore } from 'firebase-admin'
import { Router } from 'express'
import { AntrianCSClient } from '../databases/antrianCS'

const antrianCSClient = new AntrianCSClient()
const router = Router()
var counter = 0

//@route    POST /simple-bank/antrian-cs
//@desc     Tambahkan data antrian CS
router.post('/', async (req, res, next) => {
   if (req)
      counter++
   try {
      await antrianCSClient.addData(counter)
   } catch (error) {
      return next(error)
   }
   res.json({ success: 'Berhasil menambahkan antrian CS!' })
})

//@route    GET /simple-bank/antrian-cs
//@desc     Ambil semua antrian CS
router.get('/', async (req, res, next) => {
   let cussers
   try {
      cussers = await antrianCSClient.getData()
   } catch (error) {
      return next(error)
   }
   res.json(cussers)
})

//@route    GET /simple-bank/antrian-cs/:id
//@desc     Ambil antrian CS sesuai ID
router.get('/:id', async (req, res, next) => {
  const id = req.params.id
  let cusser
  try {
     cusser = await antrianCSClient.getDataById(id)
  } catch (error) {
     return next(error)
  }
  res.json(cusser)
})

//@route    DELETE /simple-bank/antrian-cs/
//@desc     Hapus semua antrian CS
router.delete('/', async (req, res, next) => {
   let cussers
   try {
      cussers = await antrianCSClient.deleteData()
   } catch (error) {
      return next(error)
   }
   res.json({ message: 'Semua antrian CS berhasil dihapus!'})
})

//@route    DELETE /simple-bank/antrian-cs/:id
//@desc     Hapus antrian CS sesuai ID
router.delete('/:id', async (req, res, next) => {
   const id = req.params.id
   let cusser
   try {
      cusser = await antrianCSClient.deleteDataById(id)
   } catch (error) {
      return next(error)
   }
   res.json({ message: `Antrian CS ${id} berhasil dihapus!`})
})

export default router