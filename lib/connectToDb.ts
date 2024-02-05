import mongoose from 'mongoose'

let connection: any = {}
export const connectToDB = async () => {
    try {
        if (connection.isConnected) return true;
        const db = await mongoose.connect(process.env.MONGODB_URL!)
        connection.isConnected = db.connections[0].readyState
    } catch (error) {
        console.log(error)
    }

}
