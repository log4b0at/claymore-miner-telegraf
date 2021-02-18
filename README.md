# Claymore Miner API Telegraf script bridge

## Introduction

This project is just a simple node script to use with telegraf to retrieve metrics from Claymore Miner API

Example in my influxdb cloud :
![screen](/screen.png)


## Usage

1. Make sure `-mport 3333` option is present on your **claymore command**. (Set API port to 3333, if 0, API disabled)

2. Make sure the `node` command is available from path.

3. Download claymore.js from this repo

4. Add this at the end of your **telegraf configuration**: (Change claymore.js path to whatever you want in the command)
```
 [[inputs.exec]]
  command = "node claymore.js"
  name_suffix = "_claymore"
  data_format = "json"
  json_string_fields = ["pools"]
 ```
5. Done, all metrics should be available in `exec_claymore` in your database
## Debug

To check if the API work with the script, run yourself the command `node claymore.js`, you should see lots of metrics in JSON format (if your miner is running).

This script was only tested with Claymore v15.0

## Details
List of all metrics available: (18/02/2021) (Claymore v15.0)
- `hashrate` - total ETH hashrate in kH/s
- `dcr_hashrate` - total DCR hashrate in kH/s
- `gpus_hashrates` - detailed ETH hashrate for all GPUs
- `gpus_dcr_hashrates` - detailed DCR hashrate for all GPUs
- `gpus_temperatures` - detailed temperatures (Celsius) for all GPUs
- `gpus_fanspeeds` - detailed fan speeds (%) for all GPUs
- `gpus_accepted_shares` - detailed ETH accepted shares for all GPUs.
- `gpus_rejected_shares` - detailed ETH rejected shares for all GPUs.
- `gpus_invalid_shares` - detailed ETH invalid shares for all GPUs.
- `gpus_dcr_accepted_shares` - detailed DCR accepted shares for all GPUs.
- `gpus_dcr_rejected_shares` - detailed DCR rejected shares for all GPUs.
- `gpus_dcr_invalid_shares` - detailed DCR invalid shares for all GPUs.
- `gpus_pci_bus` - PCI bus index for every GPU.
- `pool_share_min_time` - min time (in ms) of accepting shares for current pool (1 hour).
- `pool_share_max_time` - max time (in ms) of accepting shares for current pool (1 hour).
- `pool_share_average_time` - average time (in ms) of accepting shares for current pool (1 hour).
- `shares` - number of ETH shares
- `dcr_shares` - number of DCR shares
- `invalid_shares` - number of ETH invalid shares
- `dcr_invalid_shares` - number of DCR invalid shares
- `rejected_shares` - number of ETH rejected shares
- `dcr_rejected_shares` - number of DCR rejected shares
- `running_time` - running time, in minutes.
- `pool_switches` - number of ETH pool switches
- `dcr_pool_switches` - number of DCR pool switches
- `pools` - current mining pools
- `power` - total power consumption of GPUs.
