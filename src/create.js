import {writeFile} from 'fs/promises';
import {resolve} from 'path';

export const create = async (current_dir, filename) => {

	const _path = resolve(current_dir, filename);
	try {
		await writeFile(_path, "");
	}
	catch (err) {
		console.log('Operation failed');
	}
}



