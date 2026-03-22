import axios from 'axios';

// Khi deploy: VITE_API_URL = https://your-app.up.railway.app
// Khi dev local: để trống, Vite proxy sẽ forward /api → localhost:5009
const baseURL = import.meta.env.VITE_API_URL || '';

export default axios.create({ baseURL });
