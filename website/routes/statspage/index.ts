/// <reference path="IJsonDataFormat.ts" />
// <reference path="StatProber.ts" />
import express = require('express');
import StatProber = require('./StatProber');
var stats = new StatProber.StatProber(loadServers('someplace.txt'));

function loadServers(path: string): StatProber.IRemoteServerConnection[] {
    // todo: retrieve this from a file in .gitignore
    return [{
        ip: '127.0.0.1',
        port: 8080,
        info: {
            name: 'Local (test1)',
            isDown: false,
            cpu: getDummyData(10, 10),
            mem: getDummyData(78392373, 3131000000)
        }
    },
        {
            ip: '127.0.0.1',
            port: 8080,
            info: {
                name: 'Local (test2)',
                isDown: false,
                cpu: getDummyData(10, 20),
                mem: getDummyData(20, 1000)
            }
        },
        {
            ip: '127.0.0.1',
            port: 8080,
            info: {
                name: 'Local (test3)',
                isDown: false,
                cpu: getDummyData(1, 21),
                mem: getDummyData(1, 1000)
            }
        },
        {
            ip: '127.0.0.1',
            port: 8080,
            info: {
                name: 'Local (test4)',
                isDown: true,
                cpu: getDummyData(33, 20),
                mem: getDummyData(20, 33)
            }
        }];
}

/**
 * Helper for development. Delete this.
 */
function getDummyData(num1: number, num2: number): StatProber.ISingleDataPart[] {
    return [{
        value: num1,
        color: '#COFFEE',
        highlight: '#0FF1CE',
        label: 'Load'
    },
        {
            value: num2,
            color: '#1CEBA9',
            highlight: '#7ADD1E',
            label: 'Free'
        }];
}

export function index(req: express.Request, res: express.Response) {
    var data: StatProber.IRemoteServerInfo[] = stats.snapshot();
    res.render('stats', { title: 'Stats', year: new Date().getFullYear(), message: 'Server stats page', statdata: { length: data.length, servers: data } });
};