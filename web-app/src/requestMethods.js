import axios from "axios";

const BASE_URL = "http://localhost:5000/api/"
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZWNkNmM2NzQxZmMxZWJkZDVkNjQ4ZiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY3NjQ2NTkwMiwiZXhwIjoxNjc2NzI1MTAyfQ._WY07h0sJletd3QVFcCpZgULI12iSYfTuQbGElGMZBs"

export const publicRequest= axios.create({
    baseURL: BASE_URL,
})

export const userRequest= axios.create({
    baseURL: BASE_URL,
    header:{token : `Bearer ${TOKEN}`}
})