import { Socket } from 'phoenix';
import Vue, { PluginObject, VueConstructor } from 'vue';
import './vue'

export * from './obey';

export default class VuePhoenix implements PluginObject<string> {
    socket: Socket;
    constructor(socket: string | Socket, params?: object);
    install(localVue: VueConstructor<Vue>): void;
}
