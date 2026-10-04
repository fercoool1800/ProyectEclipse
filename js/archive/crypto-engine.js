// =========================================================
// ECLIPSE CRYPTO ENGINE
// =========================================================
//
// PBKDF2-SHA256
//        ↓
// AES-256-GCM
//
// La contraseña NO se almacena.
// Una contraseña correcta produce una clave capaz
// de autenticar y descifrar el archivo.
//
// =========================================================


const EclipseCrypto = (() => {

    const encoder = new TextEncoder();
    const decoder = new TextDecoder();


    // -----------------------------------------------------
// BASE64 → BYTES
// -----------------------------------------------------

    function base64ToBytes(base64) {

        const binary =
            atob(base64);

        const bytes =
            new Uint8Array(binary.length);


        for (
            let i = 0;
            i < binary.length;
            i++
        ) {

            bytes[i] =
                binary.charCodeAt(i);
        }


        return bytes;
    }


    // -----------------------------------------------------
// DERIVAR CLAVE
// -----------------------------------------------------

    async function deriveKey(
        password,
        salt,
        iterations
    ) {

        const passwordMaterial =
            await crypto.subtle.importKey(

                "raw",

                encoder.encode(password),

                {
                    name: "PBKDF2"
                },

                false,

                ["deriveKey"]

            );


        return crypto.subtle.deriveKey(

            {
                name: "PBKDF2",

                salt: salt,

                iterations: iterations,

                hash: "SHA-256"
            },

            passwordMaterial,

            {
                name: "AES-GCM",

                length: 256
            },

            false,

            ["decrypt"]

        );
    }


    // -----------------------------------------------------
// DESCIFRAR ARCHIVO
// -----------------------------------------------------

    async function decryptArchive(
        encryptedPackage,
        password
    ) {

        const salt =
            base64ToBytes(
                encryptedPackage.salt
            );


        const iv =
            base64ToBytes(
                encryptedPackage.iv
            );


        const ciphertext =
            base64ToBytes(
                encryptedPackage.data
            );


        const iterations =
            encryptedPackage.iterations;


        const key =
            await deriveKey(
                password,
                salt,
                iterations
            );


        /*
            AES-GCM verifica automáticamente
            la autenticidad.

            Contraseña incorrecta:
            decrypt() lanza una excepción.
        */

        const decryptedBuffer =
            await crypto.subtle.decrypt(

                {
                    name: "AES-GCM",
                    iv: iv
                },

                key,

                ciphertext

            );


        const jsonText =
            decoder.decode(
                decryptedBuffer
            );


        return JSON.parse(jsonText);
    }


    // -----------------------------------------------------
// CARGAR .ENC
// -----------------------------------------------------

    async function loadEncryptedArchive(
        path
    ) {

        const response =
            await fetch(path, {
                cache: "no-store"
            });


        if (!response.ok) {

            throw new Error(
                "Archive could not be loaded."
            );
        }


        return response.json();
    }


    // =====================================================
    // API PÚBLICA
    // =====================================================

    return {

        loadEncryptedArchive,
        decryptArchive

    };

})();