export class StatProber {
    private _die: boolean = false;                  // flag to end the probing
    private _probeIntervalMills: number = 2000;     // number of milliseconds between probes
    private _servers: IRemoteServerConnection[];    // servers that we will query

    constructor(servers: IRemoteServerConnection[]) {
        // begin quering servers
        this._servers = servers;
        this._servers.forEach((server, i, a) => this.query(server));
    }

    private query(server: IRemoteServerConnection) {
        // silently return if this instance is dead
        if (this._die) {
            return;
        }
        
        // query server for info
        console.log('probing \'' + server.info.name + '\' (' + server.ip + ':' + server.port + ') started.');
        // -- todo...
        console.log('probing \'' + server.info.name + '\' (' + server.ip + ':' + server.port + ') finished, scheduling next probe.');
        
        // schedule next probe
        setTimeout(() => this.query(server), this._probeIntervalMills);
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