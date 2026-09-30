import { createApp } from './app.js';

const PORT = process.env.PORT || 3847;
const app = createApp();

app.listen(PORT, () => {
  console.log(`[Drop Taste API] Server running on http://localhost:${PORT}`);
});
