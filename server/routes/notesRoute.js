import express from 'express'
import router from express.Router()
import notesController from '../controllers/notesController'
import verifyJWT from '../middleware/verifyjwt'

router.use(verifyJWT)


router.route('/')
    .get(notesController.getAllNotes)
    .post(notesController.createNote)
    .patch(notesController.updateNote)
    .delete(notesController.deleteNote)

export { module as router }