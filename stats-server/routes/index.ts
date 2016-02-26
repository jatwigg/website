/// <reference path="IJsonDataFormat.ts" />
/*
 * GET home page.
 */
import express = require('express');
const exec = require('child_process').exec;
import fs = require('fs');

// todo: if os.platform() is windows use 'windows-cpu' instead
import os = require('os');

export function index(req: express.Request, res: express.Response) {
    res.type('application/json');
    // if windows ...
    if (os.platform() == 'win32') {
        fs.exists('winfo.exe', function (exists) {
        // if winfo.exe is here, use that
            if (exists) {
                exec('winfo.exe', (err, stdout, stderr) => {
                    if (err) {
                        console.error(err);
                        var formatted: IJsonDataFormat = getWindowsNoWinfo();
                        res.json(formatted);
                    }
                    else {
                        var formatted: IJsonDataFormat = fromWinfoToCorrectFormat(JSON.parse(stdout));
                        res.json(formatted);
                    }
                });
            }
            else {
                // winfo doesnt exist
                var formatted: IJsonDataFormat = getWindowsNoWinfo();
                res.json(formatted);
            }
        });
    }
    // else not windows
    else {
        // todo: get this data from the system
        var data: IJsonDataFormat = {
            mem: {
                totalgig: 16,
                usedgig: 3.5
            },
            cpus: [
                {
                    name: 'Pentium 2 (core 1)',
                    load: 35
                },
                {
                    name: 'Pentium 2 (core 2)',
                    load: 55
                }
            ]
        };
        res.json(data);
    }
}

function fromWinfoToCorrectFormat(winfo: IwinfoFormat): IJsonDataFormat {

    var cpus: IJsonDataCpuSection[] = [];

    for (var i = 0; i < winfo.processors.length; ++i) {
        var processor: IwinfoCpuFormat = winfo.processors[i];

        if (processor.CoreCount > 1) {
            cpus.push({
                name: processor.Name,
                load: processor.AverageLoad
            });
        }
        else {
            processor.Cores.forEach((core, i, a) => {
                cpus.push({
                    name: processor.Name + ' (Core ' + i + ')',
                    load: core.Load
                });
            });
        }
    }

    return {
        mem: {
            totalgig: winfo.memory.totalgig,
            usedgig: winfo.memory.usedgig
        },
        cpus: cpus
    }
};

function getWindowsNoWinfo(): IJsonDataFormat {
    // todo: get this data from the system

    // wmic cpu get name,loadpercentage
    /*
    LoadPercentage  Name
    21              AMD Athlon(tm) II X4 620 Processor
    */
    exec('wmic cpu get name,loadpercentage', (err, stdout, stderr) => {
        if (err) {
            console.error(err);
        }
        else {
            
        }
    });
    return {
        mem: {
            totalgig: 16,
            usedgig: 3.5
        },
        cpus: [
            {
                name: 'Pentium 2 (core 1)',
                load: 35
            },
            {
                name: 'Pentium 2 (core 2)',
                load: 55
            }
        ]
    };
};