import {copyFile} from 'fs/promises';
import {resolve, basename, join} from 'path';
import {stat} from 'fs/promises';

export const copy = async (path_to_file, new_filename, current_dir) => {

	const _path = resolve(current_dir, path_to_file);
	const _new_path = resolve(current_dir, new_filename);
	let isDir = false;
	try {
		isDir = (await stat(_new_path)).isDirectory();
	} catch (error) {
		//pass
	}
	try {
		if (isDir) {
			await copyFile(_path, join(_new_path, basename(path_to_file)));
		} else {
			await copyFile(_path, _new_path);
		}
	} catch (err) {
		console.log('Operation failed');
	}
};
