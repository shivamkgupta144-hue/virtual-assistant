import jwt from "jsonwebtoken"

const genToken = async (userId) => {
    const token = jwt.sign(
        { userId },
        process.env.JWT_SECRET,
        { expiresIn: "10d" }
    )

    return token
}

export default genToken