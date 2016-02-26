/// <reference path="IJsonDataFormat.ts" />
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
                load: 35
            },
            {
                name: 'Pentium 2 (core 2)',
                load: 55
            }
        ]
    };

    res.type('application/json');
    res.json(data);
};