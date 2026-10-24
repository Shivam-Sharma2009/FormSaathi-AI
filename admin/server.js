import 'dotenv/config';
import app from './app.js';

const PORT = Number(process.env.PORT || 3001);

app.listen(PORT, () => console.log(`FormSaathi API listening on port ${PORT}`));
