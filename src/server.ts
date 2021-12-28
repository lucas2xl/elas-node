import { app } from '@shared/http/app';

const port = process.env.APP_API_PORT || 4000;

app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});
