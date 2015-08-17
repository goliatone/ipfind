#!/usr/bin/env node

'use strict';

var scanner = require('arpscan');

var program = require('commander');

var pck = require('./package.json');



program
    .version(pck.version)
    .option('-m, --mac-address [macAddress]', 'MAC address to resolve')
    // .option('-C, --check-arpscan', 'Test to see if arp-scan is installed', checkArpScan)
    .parse(process.argv);

var MAC = program.macAddress;

if(!MAC) {
    process.exit(0);
}

MAC = MAC.toUpperCase();

scanner(function result(err, data){
    if(err){
        process.stderr.write(err + '\n');
    }

    data = data || [];

    data.map(function(item){
        if(item.mac.toUpperCase() === MAC) process.stdout.write(item.ip);
    })
    // process.stdout.write(JSON.stringify(data) + '\n');
});
