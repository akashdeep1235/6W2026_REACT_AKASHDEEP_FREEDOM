
const cloudName = 'ypvuaicr';

import axios from "axios";

class CloudinaryService {

    async upload(file) {

        let formData = new FormData();

        formData.append('file', file);
        formData.append('upload_preset', 'freedom');

        let uploadUrl;

        if (file.type.startsWith("image/")) {
            uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
        }
        else {
            uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/raw/upload`;
        }

        const res = await axios.post(uploadUrl, formData);

        return res.data.secure_url;
    }
}

export default new CloudinaryService();
