import { isExpired, decodeToken } from "react-jwt";
import env from "react-dotenv";
export const getCurrentUid = ()=>{
    console.log(env.JWT_SECRET)
    const myDecodedToken = decodeToken(localStorage.getItem('token'));
    // const decoded = jwt.verify(localStorage.getItem('token'),env.JWT_SECRET)
    console.log(myDecodedToken)
    return myDecodedToken.id
}

