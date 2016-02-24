/*
 * GET home page.
 */
import express = require('express');

// todo: if os.platform() is windows use 'windows-cpu' instead
import os = require('os');

export function index(req: express.Request, res: express.Response) {

    // todo: get this data from the system

    var data: IJsonDataFormat = {
        mem: {
            totalgig: 16,
            usedgig: 3.5
        },
        cpus: [
            {
                name: 'Pentium 2 (core 1)',
                totalghz: 3.3,
                usedghz: 1.2
            },
            {
                name: 'Pentium 2 (core 2)',
                totalghz: 3.3,
                usedghz: 1.2
            }
        ]
    };

    res.type('application/json');
    res.json(data);
};

interface IJsonDataFormat {
    mem: IJsonDataMemSection;
    cpus: IJsonDataCpuSection[];
}

interface IJsonDataCpuSection {
    name: string;
    totalghz: number;
    usedghz: number;
}

interface IJsonDataMemSection {
    totalgig: number;
    usedgig: number;
}