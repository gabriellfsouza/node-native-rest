import http from 'node:http';
import { Transform } from 'node:stream';

class InverseNumberStream extends Transform {
    _transform(chunk, encoding, callback) {
        const transformed = Number(chunk.toString()) * -1;
        console.log(transformed)
        callback(null, Buffer.from(String(transformed)));
    }
}

const server = http.createServer(async (req, res) => {
    const buffers = [];

    const inverse = new InverseNumberStream();
    req.pipe(inverse)

    for await (const chunk of inverse) {
        buffers.push(chunk);
    }

    const fullStreamContent = Buffer.concat(buffers).toString('utf8');
    console.log(fullStreamContent);
    return res.end(fullStreamContent);
});

server.listen(3334);