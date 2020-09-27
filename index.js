require('dotenv').config()

const express= require('express');

const bodyParser=require('body-parser');

const mongoose= require('mongoose');
const fileupload= require('express-fileupload')
const { config, engine } = require('express-edge');
config({ cache: process.env.NODE_ENV === 'production' });
const createPostController=require('./controller/createPost')
const homePageController=require('./controller/homePage')
const storePostController=require('./controller/storePost')
const getPostController=require('./controller/getPost')
const app = new express();
const createUserController=require('./controller/createUser')
const storeUserController= require('./controller/storeUser')
const loginController=require('./controller/login')
const loginUserController= require('./controller/loginUser')
const expresSession=require('express-session')
const connectMongo=require('connect-mongo')
const connecctFlash=require('connect-flash')
const edge=require('edge.js')
const LogoutController=require('./controller/logout')
mongoose.connect(process.env.DB_URI)

const validateCreatePostMiddleware= require('./middleware/storePost')
const auth=require('./middleware/auth')
const redirectIfAuthenticateMiddleware= require('./middleware/redirectIfAuthenticated')

const storeMongo= connectMongo(expresSession)
app.use(connecctFlash())
app.use(express.static('public'))
app.use(engine);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use(fileupload())
app.use(expresSession({
    secret:process.env.EXPESS_SESSION_KEY,
    store:new storeMongo({
        mongooseConnection:mongoose.connection
    })
}))
app.set('views',`${__dirname}/views`)

app.use('*',(req,res,next)=>{
    edge.global('auth',req.session.userId)
    next()

})

app.get('/',homePageController)
app.get('/post/new',auth,createPostController)
app.get('/post/:id',getPostController)
app.post('/post/store',auth,validateCreatePostMiddleware,storePostController)
app.get('/auth/register',redirectIfAuthenticateMiddleware,createUserController)
app.post('/users/register',redirectIfAuthenticateMiddleware,storeUserController)
app.get('/auth/logout',auth,LogoutController)
app.get('/auth/login',redirectIfAuthenticateMiddleware,loginController)
app.post('/users/login',redirectIfAuthenticateMiddleware,loginUserController)
app.use((req,res)=>res.render('notFound'))
app.listen(process.env.PORT,()=>{
    console.log(`app listening on port ${process.env.PORT}`);
})
