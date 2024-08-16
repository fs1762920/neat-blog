import { JSEncrypt } from "jsencrypt";

const publicKey =
  "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCTZLiJ7zy0fjGm1vTOzLKH0dJMo8K2DDfRdB9Pg6VHK7CQ69arLRh0KN6ker8Wi9pVuuzGsDQWOqKJmjJ9sAM0szJ2AsAddjFz2np1V5vOg/L7BNMvnFX2LVWTwUQm5Q45fbjZGOZYc6EARM/1/4wNPDp/D2wiZJn2xy8FZkqbrwIDAQAB";

let jsencrypt = new JSEncrypt();
jsencrypt.setPublicKey(publicKey);

export const encrypt = (src: string) => {
  return jsencrypt.encrypt(src);
};
