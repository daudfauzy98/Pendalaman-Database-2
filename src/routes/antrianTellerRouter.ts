import { Router } from 'express';
import { AntrianTellerClient } from '../databases/antrianTeller';

const antrianTellerClient = new AntrianTellerClient();
const router = Router();
var counter = 0

//@route    POST /simple-bank/antrian-teller
//@desc     Tambahkan data antrian Teller
router.post('/', async (req, res, next) => {
   if(req) {
      counter++
   }
   try {
      await antrianTellerClient.addData(counter)
   } catch (error) {
      return next(error)
   }
   res.json({ success: 'Berhasil menambahkan antrian Teller!' })
})

//@route    GET /simple-bank/antrian-teller
//@desc     Ambil semua antrian Teller
router.get('/', async (req, res, next) => {
   let tellers
   try {
      tellers = await antrianTellerClient.getData()
   } catch (error) {
      return next(error)
   }
   res.json(tellers)
})

//@route    GET /simple-bank/antrian-teller/:id
//@desc     Ambil antrian Teller sesuai ID
router.get('/:id', async (req, res, next) => {
  const id = req.params.id
  let teller
  try {
     teller = await antrianTellerClient.getDataById(id)
  } catch (error) {
     return next(error)
  }
  res.json(teller)
})

//@route    DELETE /simple-bank/antrian-cs/
//@desc     Hapus semua antrian Teller
router.delete('/', async (req, res, next) => {
   let tellers
   try {
      tellers = await antrianTellerClient.deleteData()
   } catch (error) {
      return next(error)
   }
   res.json({ message: 'Semua antrian Teller berhasil dihapus!'})
})

//@route    DELETE /simple-bank/antrian-teller/:id
//@desc     Hapus antrian Teller sesuai ID
router.delete('/:id', async (req, res, next) => {
   const id = req.params.id
   let teller
   try {
      teller = await antrianTellerClient.deleteDataById(id)
   } catch (error) {
      return next(error)
   }
   res.json({ message: `Antrian Teller ${id} berhasil dihapus!`})
})

export default router;