import { Router } from 'express'

const router= Router()

router.get('/', (req,res)=>{
    res.render('addProduct')
})

// module.exports=router
export default router