// CONFIGURATION

const IP = '127.0.0.1' // API ip address
const PORT = 3333 // API port
const METRICS = [ // Comment metrics you don't need to save bandwidth and storage space.
	"hashrate",
	"dcr_hashrate",
	"gpus_hashrates",
	"gpus_dcr_hashrates",
	"gpus_fanspeeds",
	"gpus_temperatures",
	"gpus_accepted_shares",
	"gpus_rejected_shares",
	"gpus_invalid_shares",
	"gpus_dcr_accepted_shares",
	"gpus_dcr_rejected_shares",
	"gpus_dcr_invalid_shares",
	"gpus_pci_bus",
	"pool_share_min_time",
	"pool_share_max_time",
	"pool_share_average_time",
	"shares",
	"dcr_shares",
	"invalid_shares",
	"dcr_invalid_shares",
	"rejected_shares",
	"dcr_rejected_shares",
	"running_time",
	"pool_switches",
	"dcr_pool_switches",
	"pools",
	"power"
]

// END CONFIGURATION





const net = require('net')
let socket = new net.Socket()
const req = '{"id":0,"jsonrpc":"2.0","method":"miner_getstat2"}'
const process = require('process');
socket.setTimeout(5000)

socket.on('connect', () => { 
    socket.write(`${req}\n`)
})

socket.on('data', data => {
	const obj  = JSON.parse(data.toString('utf8'));
	const { result } = obj;
	const arg2 = result[2].split(';')
	const arg8 = result[8].split(';')
	const arg5 = result[5].split(';')
	const arg16 = result[16].split(';');
	const arg6 = result[6].split(';').map(parseInt);
	const gpus_temperatures = arg6.filter( (_, i) => i % 2 === 0 );
	const gpus_fanspeeds = arg6.filter( (_, i) => i % 2 === 1 );
	// full API 18/02/2021 Claymore v15.0
	const s = {
		hashrate: parseInt(arg2[0]),
		dcr_hashrate: parseInt(arg5[0]),
		gpus_hashrates: result[3].split(';').map(parseInt),
		gpus_dcr_hashrates: result[5].split(';').map(parseInt),
		gpus_fanspeeds,
		gpus_temperatures,
		gpus_accepted_shares: result[9].split(';').map(parseInt),
		gpus_rejected_shares: result[10].split(';').map(parseInt),
		gpus_invalid_shares: result[11].split(';').map(parseInt),
		gpus_dcr_accepted_shares: result[12].split(';').map(parseInt),
		gpus_dcr_rejected_shares: result[13].split(';').map(parseInt),
		gpus_dcr_invalid_shares: result[14].split(';').map(parseInt),
		gpus_pci_bus: result[15].split(';').map(parseInt),
		pool_share_min_time: parseInt(arg16[0]),
		pool_share_max_time: parseInt(arg16[1]),
		pool_share_average_time: parseInt(arg16[2]),
		shares: parseInt(arg2[1]),
		dcr_shares: parseInt(arg5[1]),
		invalid_shares: parseInt(arg8[0]),
		dcr_invalid_shares: parseInt(arg8[2]),
		rejected_shares: parseInt(arg2[2]),
		dcr_rejected_shares: parseInt(arg5[2]),
		running_time: parseInt(result[1]),
		pool_switches: parseInt(arg8[1]),
		dcr_pool_switches: parseInt(arg8[3]),
		pools: result[7].split(';'),
		power: parseInt(result[17])
	};
	for (const index in s)
		if (!METRICS.includes(index))
			delete s[index];
	process.stdout.write(JSON.stringify(s))
    socket.end()
})

socket.on('error', error => {
  console.error('API Socket error');
	console.log(JSON.stringify({api_error: true}))
})

socket.connect(PORT, IP);
