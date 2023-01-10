import Logging from '../library/Logging';
import jwt from 'jsonwebtoken';
import { config } from '../config/config';

const NAMESPACE = 'Auth';

const signJWT = (user: any, callback: (error: Error | null, token: string | null) => void): void => {
    const timeSinchEpoch = new Date().getTime();
    const expirationtime = timeSinchEpoch + Number(config.token.expireTime) * 100000;
    const expirationTimeInSeconds = Math.floor(expirationtime / 1000);

    Logging.info(`${NAMESPACE} : Attempting to sign token for  ${user.username}`);

    try {
        jwt.sign(
            {
                _id: user._id.toString(),
                username: user.username
            },
            config.token.secret,
            {
                issuer: config.token.issuer,
                algorithm: 'HS256',
                expiresIn: expirationTimeInSeconds
            },
            (error, token) => {
                if (error) {
                    callback(error, null);
                } else if (token) {
                    callback(null, token);
                }
            }
        );
    } catch (err: any) {
        Logging.error(`${NAMESPACE} : ${err}`);
        callback(err, null);
    }
};

export default signJWT;
