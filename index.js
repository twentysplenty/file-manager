import * as readline from 'readline';
import * as os from 'os';
import {read} from './src/read.js';
import {create} from './src/create.js';
import {rename} from './src/rename.js';
import {copy} from './src/copy.js';
import {remove} from './src/delete.js';
import {cd} from './src/cd.js';
import {ls} from './src/ls.js';
import {calculateHash} from './src/calcHash.js';
import {compress} from './src/compress.js';
import {decompress} from './src/decompress.js';

const main = async () => {

	let current_dir = os.homedir();
	const first_arg = process.argv.slice(2)[0];
	const username = first_arg.slice(11);
	if (first_arg.startsWith("--username=")) console.log(`Welcome to the File Manager, ${username}!`);
	console.log(`You are now in ${current_dir}`)
	console.log('Please enter your command');

	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	});

	rl.on('line', async (command) => {
		const first_arg = command.trim().split(' ')[0];
		const second_arg = command.trim().split(' ')[1];
		const third_arg = command.trim().split(' ')[2];

		switch (first_arg) {
			case 'os':
				switch (second_arg) {
					case '--EOL':
						console.log(JSON.stringify(os.EOL));
						break;
					case '--cpus':
						console.log('Overall amout of CPUS is: ', os.cpus().length);
						for (const cpu of os.cpus()) console.log(cpu.model);
						break;
					case '--homedir':
						console.log(os.homedir());
						break;
					case '--username':
						console.log(os.userInfo().username);
						break;
					case '--architecture':
						console.log(process.arch);
						break;
					default:
						console.log('Invalid input');
				}
				break;
			case 'compress':
				await compress(second_arg, third_arg, current_dir);
				break;
			case 'decompress':
				await decompress(second_arg, third_arg, current_dir);
				break;
			case 'mv':
				await copy(second_arg, third_arg, current_dir);
				await remove(second_arg, current_dir);
				break;
			case 'rm':
				await remove(second_arg, current_dir);
				break;
			case 'cp':
				await copy(second_arg, third_arg, current_dir);
				break;
			case 'rn':
				await rename(second_arg, third_arg, current_dir);
				break;
			case 'add':
				await create(current_dir, second_arg);
				break;
			case 'cat':
				await read(second_arg, current_dir);
				break;
			case 'ls':
				await ls(current_dir);
				break;
			case 'cd':
				current_dir = await cd(current_dir, second_arg);
				break;
			case 'up':
				current_dir = await cd(current_dir, '..');
				break;
			case 'hash':
				await calculateHash(second_arg, current_dir);
				break;
			case '.exit':
				console.log(`Thank you for using File Manager, ${username}!`);
				process.exit(0);
			default:
				console.log('Invalid input');
				console.log(`You are now in ${current_dir}`)
		}
		console.log(`You are now in ${current_dir}`)
		console.log('Please enter your command');
	});

	rl.on('close', () => {
		console.log(`Thank you for using File Manager, ${username}!`);
		process.exit(0);
	});

}

await main();

