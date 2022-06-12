import {resolve} from 'path';
import {stat} from 'fs/promises';

export const cd = async (current_dir, path) => {
	try {
		const result_path = resolve(current_dir, path);
		if ((await stat(result_path)).isDirectory()) return result_path
		else {
			console.log('Operation failed');
			return current_dir;
		}
	} catch (error) {
		console.log('Operation failed');
		return current_dir;
	}
}
