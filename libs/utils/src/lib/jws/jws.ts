import { s } from '@constants';
import { KJUR } from 'jsrsasign';

export const jwsSign = async (spPayload: any): Promise<string> => {
  try {
    const alg = 'HS256';
    const header = { alg, typ: 'JWT' };
    const signature = await KJUR.jws.JWS.sign('HS256', JSON.stringify(header), JSON.stringify(spPayload), s.client);

    return signature;
  } catch (error) {
    const err = error as any;
    return err.message;
  }
};

export const jwsDecode = async (sJWS: any): Promise<any> => {
  try {
    return await KJUR.jws.JWS.parse(sJWS);
  } catch (error) {
    const err = error as any;
    return err.message;
  }
};

export const jwsVerify = async (sJWS: any, key: string): Promise<any> => {
  try {
    return await KJUR.jws.JWS.verify(sJWS, key);
  } catch (error) {
    const err = error as any;
    return err.message;
  }
};
