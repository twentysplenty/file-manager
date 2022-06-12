import {rm} from 'fs/promises';
import {resolve} from 'path';

export const remove = async (path_to_file, current_dir) => {
	const _path = resolve(current_dir, path_to_file);
	console.log(_path);
	try {
		await rm(_path);
	} catch (err) {
		console.log('Operation failed');
	}
};
