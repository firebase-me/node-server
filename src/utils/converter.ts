import zlib from 'zlib';

// Convert JSON object to string
export const jsonToString = (data: any): string => {
    return JSON.stringify(data);
};

// Compress JSON object to a compressed string
export const compressJson = (data: any): string => {
    const jsonString = JSON.stringify(data);
    
    // Compress the string using gzip
    const compressedBuffer = zlib.gzipSync(jsonString);
    
    // Convert the compressed buffer to a base64-encoded string
    const compressedString = compressedBuffer.toString('base64');

    return compressedString;
};

// Decompress and convert the compressed string back to JSON
export const decompressJson = (compressedString: string): any => {
    // Decode the base64 string to a Buffer
    const compressedBuffer = Buffer.from(compressedString, 'base64');
    
    // Decompress the Buffer using gzip
    const decompressedBuffer = zlib.gunzipSync(compressedBuffer);
    
    // Convert the decompressed buffer to a JSON object
    const decompressedJson = JSON.parse(decompressedBuffer.toString('utf-8'));

    return decompressedJson;
};

export const base64ToString = (str: string): string => {
    // Decode base64 to Buffer
    const buffer = Buffer.from(str, 'base64');

    // Convert Buffer to UTF-8 string
    return buffer.toString('utf-8');
};

export const stringToBase64 = (str: string): string => {
    // Encode string to Buffer
    const buffer = Buffer.from(str, 'utf-8');

    // Convert UTF-8 string to base64
    return buffer.toString('base64');
};

export const base64ToFixedN = (str: string, n: number): number => {
    // Decode base64 to Buffer
    const buffer = Buffer.from(str, 'base64');

    // Convert Buffer to decimal number with a fixed length (n bytes)
    const decimalValue = buffer.readUIntBE(0, n);

    return decimalValue;
};
