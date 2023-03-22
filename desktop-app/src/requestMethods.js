import axios from "axios";

const BASE_URL = "http://localhost:5000/api/"
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZWNkNmM2NzQxZmMxZWJkZDVkNjQ4ZiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY3Njk3NDQ1NywiZXhwIjoxNjc3MjMzNjU3fQ.GfLLfHSWY5fe6-Z19MFKHRaxX2oPPiMFsbs4LceoYNk"

export const publicRequest= axios.create({
    baseURL: BASE_URL,
})

export const userRequest= axios.create({
    baseURL: BASE_URL,
    header:{token : `Bearer ${TOKEN}`}
})