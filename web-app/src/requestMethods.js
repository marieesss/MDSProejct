import axios from "axios";

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZWNkNmM2NzQxZmMxZWJkZDVkNjQ4ZiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY3Njk3NDQ1NywiZXhwIjoxNjc3MjMzNjU3fQ.GfLLfHSWY5fe6-Z19MFKHRaxX2oPPiMFsbs4LceoYNk"
const URL = process.env.REACT_APP_API_URL;
export const publicRequest= axios.create({
    baseURL: URL,
})

export const userRequest= axios.create({
    baseURL: URL,
    header:{token : `Bearer ${TOKEN}`}
})