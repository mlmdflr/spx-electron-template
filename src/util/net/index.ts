export type treatedBytes = { bytes: number, unit: unit }

export type unit = 'B' | 'KB' | 'MB' | 'GB' | 'TB' | 'PB' | 'EB' | 'ZB' | 'YB' | 'BB' | 'NB' | 'DB'

export const units: unit[] = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB', 'BB', 'NB', 'DB']

export default class {

    constructor() { }
    /**
     * @description 判斷ipv4地址是否為內網 ipv4/包含localhost
     * @author 没礼貌的芬兰人
     * @date 2021-10-06 17:10:36
     * @param ipv4
     * @returns 
     */
    public static isInnerIP = (ipv4: string): boolean => {
        if (ipv4.toLowerCase() === 'localhost') return true
        if ((ipv4.split('.')).length != 4) return false
        let ips: string[] = ipv4.split('.')
        let _ip: number = 0
        _ip += parseInt(ips[0]) << 24
        _ip += parseInt(ips[1]) << 16
        _ip += parseInt(ips[2]) << 8
        _ip += parseInt(ips[3]) << 0
        _ip = _ip >> 16 & 0xFFFF
        return (_ip >> 8 == 0x7F || _ip >> 8 == 0xA || _ip == 0xC0A8 || (_ip >= 0xAC10 && _ip <= 0xAC1F));
    }
    /**
     * @description b 自动向上转换函数
     * @author 没礼貌的芬兰人
     * @date 2021-10-06 17:10:44
     * @param bytes bytes 单位b
     * @returns treatedBytes {bytes, unit}
     */
    public static bytesToSize(bytes: number): treatedBytes {
        if (bytes === 0) return { bytes: 0, unit: units[0] };
        let
            k: number = 1024,
            i = Math.floor(Math.log(bytes) / Math.log(k));
        return { bytes: Math.round((bytes / Math.pow(k, i)) * Math.pow(10, 1)) / Math.pow(10, 1), unit: units[i] }
    }
}

