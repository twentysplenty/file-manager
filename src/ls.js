import {readdir} from 'fs/promises';

export const ls = async (current_dir) => {
	try {
		const files = await readdir(current_dir);
		for (const file of files) {
			console.log(file);
		}
	} catch (error) {
		console.log('Invalid input');
	}
}
