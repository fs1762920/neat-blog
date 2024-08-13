package cn.fan.neat.utils;

import cn.hutool.crypto.asymmetric.KeyType;
import cn.hutool.crypto.asymmetric.RSA;

public class RSAUtils {

    public static String encrypt(String publicKey, String src) {
        RSA rsa = new RSA(null, publicKey);
        return rsa.encryptBase64(src, KeyType.PublicKey);
    }

    public static String decrypt(String privateKey, String src) {
        RSA rsa = new RSA(privateKey, null);
        return rsa.decryptStr(src, KeyType.PrivateKey);
    }
}
