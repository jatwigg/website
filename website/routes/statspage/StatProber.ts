var request = require("request");

export class StatProber {
    private _die: boolean = false;                  // flag to end the probing
    private _probeIntervalMills: number = 2000;     // number of milliseconds between probes
    private _servers: IRemoteServerConnection[];    // servers that we will query

    constructor(servers: IRemoteServerConnection[]) {
        // begin quering servers
        this._servers = servers;
        this._servers.forEach((server, i, a) => this.query(this, server));
    }

    /**
     * Query passes in the instance because we need to call this function recursively when using setTimeout. If we use 'this' it will lose context after first iteration, hence using instance.
     * @param instance
     * @param server
     */
    private query(instance: StatProber, server: IRemoteServerConnection) {
        // silently return if this instance is dead
        if (instance._die) {
            return;
        }
        
        // query server for info
        console.log('probing \'' + server.info.name + '\' (' + server.ip + ':' + server.port + ') started.');
        // -- todo...
        var url = 'http://' + server.ip + ':' + server.port;
        
        request({
            url: url,
            json: true
        }, function (error, response, data: IJsonDataFormat) {

            if (!error && response.statusCode === 200) {
                var cpuInfo: ISingleDataPart[] = [];
                var memInfo: ISingleDataPart[] = [];

                // cpu
                for (var i: number = 0; i < data.cpus.length; ++i) {
                    var cpu = data.cpus[i];

                    cpuInfo.push({
                        value: cpu.load > 100 ? 100 : (cpu.load < 0 ? 0 : cpu.load),
                        color: '#FF0000',
                        highlight: '#FFFFFF',
                        label: cpu.name + ' Load'
                    });
                    cpuInfo.push({
                        value: cpu.load > 100 ? 0 : (cpu.load < 0 ? 100 : cpu.load),
                        color: '#00FF00',
                        highlight: '#FFFFFF',
                        label: cpu.name + 'Free'
                    });
                }

                // mem
                memInfo.push({
                    value: data.mem.usedgig,
                    color: '#FF0000',
                    highlight: '#FFFFFF',
                    label: 'Used'
                });
                memInfo.push({
                    value: data.mem.totalgig - data.mem.usedgig,
                    color: '#00FF00',
                    highlight: '#FFFFFF',
                    label: 'Free'
                });

                // assign
                server.info.cpu = cpuInfo;
                server.info.mem = memInfo;
                server.info.isDown = false;
            }
            else {
                console.log('error reading server' + error);
                server.info.isDown = true;
            }

            console.log('probing \'' + server.info.name + '\' (' + server.ip + ':' + server.port + ') finished, scheduling next probe.');        
            // schedule next probe
            setTimeout(() => instance.query(instance, server), instance._probeIntervalMills);
        });        
    }

    public snapshot() {
        return this._servers.map((remote, i, a) => remote.info);
    }

    public die() {
        this._die = true;
    }
}

/*
Represents a remote server.
*/
export interface IRemoteServerConnection {
    ip: string;
    port: number;
    info: IRemoteServerInfo;
}

/*
Information about a remote server.
*/
export interface IRemoteServerInfo {
    name: string;
    isDown: boolean;
    cpu: ISingleDataPart[];
    mem: ISingleDataPart[];
}

/*
Represents a single slice of the pie chart.
*/
export interface ISingleDataPart {
    value: number;
    color: string;
    highlight: string;
    label: string;
}