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