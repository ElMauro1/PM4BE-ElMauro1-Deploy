import { v2 } from "cloudinary";
import { config as dotenvConfig } from "dotenv"

dotenvConfig({ path: '.env.development'});

const API_SECRET = "gJ8mz_ghRmXuyae-4uv7HAQoAAQ"; 
const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const API_KEY = process.env.CLOUDINARY_API_KEY;

export const CloudinaryConfig = {
    provide: 'CLOUDINARY',
    useFactory: () => {
        // ...
        return v2.config({
            cloud_name: CLOUD_NAME,
            api_key: API_KEY,
            api_secret: API_SECRET
        });
    }
}
