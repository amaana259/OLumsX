import mongoose from "mongoose";
export const connectDB = async () => {
    mongoose.connect("mongodb+srv://Ibrahim:q27DTL8u0rD74S1J@olumsx-test.bddt8lm.mongodb.net/?retryWrites=true&w=majority&appName=OLumsX-Test", {
        dbName: "OLumsX",
    }).then((conn) => {
        console.log(`Connected MongoDB to ${conn.connection.host}`);
    }).catch((err) => {
        console.log(err);
    });
};
