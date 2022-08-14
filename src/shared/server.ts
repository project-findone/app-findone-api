import cors from 'cors'
import 'express-async-errors'

const app = express()

app.use(cors())
app.use(express.json())
