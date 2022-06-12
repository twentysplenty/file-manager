import {rename as _rename} from 'fs/promises';
import {resolve} from 'path';

export const rename = async (path_to_file, new_filename, current_dir) => {

	const _path = resolve(current_dir, path_to_file);
	const _new_path = resolve(current_dir, new_filename);
	try {
		await _rename(_path, _new_path);
	} catch (error) {
		console.log('Operation failed');
	}
};
