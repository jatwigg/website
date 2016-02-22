/*
 * GET home page.
 */
import express = require('express');

// todo: if os.platform() is windows use 'windows-cpu' instead
import os = require('os');

export function index(req: express.Request, res: express.Response) {

    //var cpus = os.cpus();

    //for (var i = 0, len = cpus.length; i < len; i++) {
    //    console.log("CPU %s:", i);
    //    var cpu = cpus[i], total = 0;
    //    for (var type in cpu.times)
    //        total += cpu.times[type];

    //    for (type in cpu.times)
    //        console.log("\t", type, Math.round(100 * cpu.times[type] / total));
    //}
    cpu_used();

    var data = {
        mem: os.loadavg(),
        cpu: os.cpus()
    };

    res.type('application/json');
    res.json(data);
};

var cpu_used = function () {
    var cpu = os.cpus();

    var counter = 0;
    var total = 0;

    var free = 0;
    var sys = 0;
    var user = 0;

    for (var i = 0; i < cpu.length; i++) {

        counter++;
        total = cpu[i].times.idle + cpu[i].times.sys + cpu[i].times.user + cpu[i].times.irq + cpu[i].times.nice;

        free += 100 * (cpu[i].times.idle / total);
        sys += 100 * (cpu[i].times.sys / total);
        user += 100 * (cpu[i].times.user / total);
    };

    console.log('CPU %s : %s + %s + %s', i, (free / counter), (user / counter), (sys / counter));

}