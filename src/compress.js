import {createBrotliCompress} from 'zlib';
import {pipeline} from 'stream/promises';
import {createReadStream, createWriteStream} from 'fs';
import {resolve} from 'path';

export const compress = async (file_to_compress, destination, current_dir) => {
	const file_path = resolve(current_dir, file_to_compress);
	const file_comp_path = resolve(current_dir, destination);
	const rs = createReadStream(file_path);
	const ws = createWriteStream(file_comp_path);
	try {
		await pipeline(
			rs,
			createBrotliCompress(),
			ws
		);
	} catch (err) {
		console.log('Operation failed');
	}
};
